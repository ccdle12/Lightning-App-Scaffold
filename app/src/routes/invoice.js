const express = require("express");
const app = express();
const router = express.Router();
const lnClient = require("../lightning-client/client").Client;
const utils = require("../utils");
const QRCode = require("qrcode")

// TEMP - Should be a cached for generated but unpaid.
// In this demo, to stop generating new addresses, if the invoice is already in
// the cache, don't generate a new one.
cache = {};

/**
 * POST /getinvoice will generate an invoice on the LND Node.
 */
router.post("/", async (_, res) => {
    // Member Variables.
    let invoice;
    let qrcode;

    try {
      // Request an invoice to be generated by the lnd node. 
      let invoiceAmt = {value: 100}
      let invoiceRes = await addInvoice(invoiceAmt);  

      // Parse the invoice as JSON and retrieve the payment_request.
      let invoiceObj = utils.objToJSON(invoiceRes);
      let boltInvoice = invoiceObj["payment_request"];

      // Generate a QR Code for the payment request.
      let code = await QRCode.toDataURL(boltInvoice);

      // Assign the generated values.
      invoice = boltInvoice;
      qrcode = code;

    } catch (err) {
       // Assign the errors.
       invoice = `There was an error: ${err}`;
       qrcode = "";
    }
    
    // TEMP
    cache[invoice] = invoice;

    // Update the view with the generated invoice and qrcode.
    res.render("invoice", {invoice: invoice, qrcode: qrcode});

    // Create a request to subscribe to any invoices.
    var request = { 
      add_index: 0,
      settle_index: 0,
    }

    var call = lnClient.subscribeInvoices(request)
    call.on("data", function(response) {
      // A response was received from the server.
      console.log(response["payment_request"]);
      console.log(invoice);
      
      // Parse the response from subscribing to Invoices.
      recvPaymentReq = response["payment_request"];
      isInvoiceSettled = response["settled"];

      // Check if the receiving invoice is a generated one and if it has been
      // paid.
      if ( recvPaymentReq == cache[recvPaymentReq] && isInvoiceSettled ) {
        console.log("THEY HAVE MATCHED!!!");

        // IDEA: I can redirect the user to a new page.
        res.redirect("/payinvoice");
      }

    });
    call.on("status", function(status) {
      // The current status of the stream.
    });
    call.on("end", function() {
      // The server has closed the stream.
    });
});

// NOTE: (ccdle12) It seems like generated gRPC functions that are created with
// callbacks, don"t like being used in async/await out of the box. Thats why
// I"ve wrapped it in a promise.
function addInvoice(invoiceAmt) {
  return new Promise((resolve, reject) => {
    lnClient.AddInvoice(invoiceAmt, (err, res) => {
      if (err) { reject(err); }
      resolve(res);
    });
  });
}

module.exports = router;

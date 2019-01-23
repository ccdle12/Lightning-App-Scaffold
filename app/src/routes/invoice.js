const express = require('express');
const app = express();
const router = express.Router();
const lnClient = require("../lightning-client/client").Client;
const utils = require("../utils");
const QRCode = require("qrcode")

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
     
   return res.render("invoice", {invoice: invoice, qrcode: qrcode});
});

// NOTE: (ccdle12) It seems like generated gRPC functions that are created with
// callbacks, don't like being used in async/await out of the box. Thats why
// I've wrapped it in a promise.
function addInvoice(invoiceAmt) {
  return new Promise((resolve, reject) => {
    lnClient.AddInvoice(invoiceAmt, (err, res) => {
      if (err) { reject(err); }
      resolve(res);
    });
  });
}

module.exports = router;

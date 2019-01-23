const express = require("express");
const app = express();
const router = express.Router();
const lnClient = require("../lightning-client/client").Client;
const utils = require("../utils");

/**
* POST /payinvoice will call the node to 
* pay a provided invoice.
*/
app.post("/payinvoice", async (req, res) => {
  // Request an invoice to be generated by the lnd node.
  let request = {
    payment_request: req.body.invoice,
  };

  // let call = lnClient.client.sendPayment({})
  let call = lnClient.sendPayment({})
  call.on("data", function(response) {
    // A response was received from the server.
    console.log(response);
  });
      
  call.on("status", function(status) {
    // The current status of the stream.
    console.log(status)
  });

  call.on("end", function() {
    // The server has closed the stream.
  });

  call.write(request)
});

module.exports = router;

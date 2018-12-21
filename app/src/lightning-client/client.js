const fs = require('fs');
const grpc = require('grpc');
process.env.GRPC_SSL_CIPHER_SUITES = 'HIGH+ECDSA';

// Import dotenv to set environment variables.
require('dotenv').load();

// Read the macaroon as hex..
m = fs.readFileSync(process.env.MACAROON_PATH);
macaroon = m.toString('hex');

// Create the grpc Metadata using the macaroon.
metadata = new grpc.Metadata();
metadata.add('macaroon', macaroon);

// Create grpc credential from macaroo.n
macaroonCreds = grpc.credentials.createFromMetadataGenerator((_args, callback) => {
  callback(null, metadata);
});

// Build ssl credentials using the cert file for grpc 
// communication.
lndCert = fs.readFileSync(process.env.TLS_PATH);
sslCreds = grpc.credentials.createSsl(lndCert);

// Combine the cert credentials and the macaroon auth credentials
// such that every call is properly encrypted and authenticated.
credentials = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);

// Create a gRPC client (address, credentials).
// lnrpcDescriptor = grpc.load("/app/src/grpc/rpc.proto");
lnrpcDescriptor = grpc.load("/app/src/grpc/rpc.proto");
lnrpc = lnrpcDescriptor.lnrpc;
client = new lnrpc.Lightning(process.env.LND_NODE_IP + ":" + process.env.LND_NODE_PORT, credentials);


/**
 * generateInvoice will allow the end user to make a RPC to generate an invoice.
 */
function generateInvoice() {
    // Create the invoice details.
    invoice = {value: 1000}

    // Return a promise for the invoice retrieved.
    return new Promise((resolve, _) => {
      client.AddInvoice(invoice, (err, res) => {  
        // Check for returned err.
        if (err) {
          console.log(err);
          resolve({result: null, err: err})
          return
        }

        // Resolve invoice response.
        resolve({result: res, err: null})
      })
    })
};

module.exports = { client, generateInvoice };

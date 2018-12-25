const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const lnClient = require('./lightning-client/client').client;
const path = require('path');

module.exports = function() {
  // Setup the app, views folder, view engine, 
  // public files and body parser.
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
  app.use(express.static(path.join(__dirname, "public")));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // Serve the app.
  app.get("/", (req, res) => res.render("index"));
  app.use("/getinvoice", require("./routes/invoice"));
  app.use("/payinvoice", require("./routes/payInvoice"));

  return app;
};

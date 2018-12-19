const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const lnClient = require('./lightning-client/client')
const path = require('path')
const utils = require('./utils.js')

// Setup the app, views folder, view engine, 
//public files and body parser.
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// Serve home page.
app.get('/', function (req, res) {
  res.render('index')
})

// POST to get invoice.
app.post('/getinvoice', function (_, res) {
  
  // Generate invoice in async anonymous self executing function.
  (async () => {

    // Request an invoice to be generated by the lnd node. 
    invoice = await lnClient.generateInvoice()

    // Check that there was an error returned from retrieving the invoice.
    if (invoice.err) {
      res.render('invoice', {invoice: "There as an error"})
      return
    }

    // Parse the invoice as JSON and retrieve the payment_request.
    resultJSON = utils.objToJSON(invoice.result)
    payReq = resultJSON["payment_request"]

    // Render invoice.html passing the payment request.
    res.render('invoice', {invoice: payReq})
  })()

})

// Serve the app.
app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
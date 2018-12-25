const server = require('./server');

// Instantiate the app.
app = server();

// Server the api.
app.listen(3000, () => console.log("Serving on port 3000..."));

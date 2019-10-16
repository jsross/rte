var express = require('express');
var app = express();
var port = 8770;

app.use('/', express.static('dist'));
app.listen(port);

console.log(`Listening on port: ${port}`);
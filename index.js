var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Para leer archivo del Post
var multipart = require('connect-multiparty');
var md_upload = multipart();

// Controlador que lee el archivo
var controller = require('./controller');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 5000;

app.listen(HTTP_PORT, () => {
  console.log("El servidor está inicializado en el puerto", HTTP_PORT);
});

app.post('/read', md_upload, controller.readFile);
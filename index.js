const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Para leer archivo del Post
const multipart = require('connect-multiparty');
const md_upload = multipart();

// Controlador que lee el archivo
const controller = require('./controller');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const HTTP_PORT = 5000;

app.listen(HTTP_PORT, () => {
  console.log("El servidor está inicializado en el puerto", HTTP_PORT);
});

app.post('/read', md_upload, controller.readFile);
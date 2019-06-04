var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var readline = require('readline');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 5000;

app.listen(HTTP_PORT, () => {
  console.log("El servidor está inicializado en el puerto", HTTP_PORT);
});

app.get('/read', function(req, res) {
  fs.readFile('prueba.txt', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error en la petición');
    } else {
      const stream = fs.createReadStream('prueba.txt');
      const reader = readline.createInterface({
        input: stream
      });

      const array = [];

      reader.on('line', line => {
        var readLine = line.replace(/['"']+/g, '');
        var readIndex = readLine.split('/');
        readIndex.map(j => {
          array.push(j.trim());
        });
      });

      reader.on('close', () => {
        return res.status(200).send(array);
      });
    }

  });
});
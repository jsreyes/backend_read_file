'use strict'

var fs = require('fs');
var readline = require('readline');


function readFile(req, res) {

  if (req.files) {
    // Se obtiene path del archivo
    var file_path = req.files.file.path;

    // Para cortar el string para saber el nombre
    var file_name = req.files.file.name;

    // Se obtiene la extensión del archivo
    var ext_split = file_name.split('\.');
    var file_ext = ext_split[1];

    if (file_ext === 'txt') {

      fs.readFile(file_path, 'utf-8', (err, data) => {
        if (err) {
          res.status(500).send({ message: 'Error en la petición' });
        } else {
          const stream = fs.createReadStream(req.files.file.path);
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
    } else {
      res.status(200).send({ message: ' Extensión del archivo no valida' });
    }
  } else {
    res.status(200).send({ message: 'No has subido ningún archivo plano' });
  }
}

// Exportando Module
module.exports = {
  readFile
}
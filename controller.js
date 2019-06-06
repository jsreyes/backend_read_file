'use strict'

const fs = require('fs');
const readline = require('readline');


function readFile(req, res) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.files) {
    // Se obtiene path del archivo
    const file_path = req.files.file.path;

    // Para cortar el string para saber el nombre
    const file_name = req.files.file.name;

    // Se obtiene la extensión del archivo
    const ext_split = file_name.split('\.');
    const file_ext = ext_split[1];

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
            const readLine = line.replace(/['"']+/g, '');
            const readIndex = readLine.split('/');
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
      res.status(404).send({ message: ' Extensión del archivo no valida' });
    }
  } else {
    res.status(404).send({ message: 'No has subido ningún archivo plano' });
  }
}

// Exportando Module
module.exports = {
  readFile
}
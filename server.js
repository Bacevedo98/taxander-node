const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();

app.use(bodyParser.json());

app.post('/guardar-datos', async (req, res) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { nombre, correo, telefono, estado, fechaHora, descuento } = req.body;

    // Formatear los datos para guardar en un archivo
    const datos = `Nombre: ${nombre}, Correo: ${correo}, Teléfono: ${telefono}, Estado: ${estado}, Fecha: ${fechaHora}, Código: ${descuento}\n`;

    // Agregar los datos al archivo `datos.txt`
    fs.appendFileSync('./datos.txt', datos, 'utf8');

    // Realizar commit y push al repositorio
    exec('git add datos.txt && git commit -m "Actualización de datos" && git push', (err, stdout, stderr) => {
      if (err) {
        console.error('Error al ejecutar los comandos de Git:', stderr);
        return res.status(500).send('Error al guardar datos en GitHub');
      }
      console.log('Salida de Git:', stdout);
      res.status(201).send('Datos guardados y sincronizados con GitHub');
    });
  } catch (error) {
    console.error('Error al guardar datos:', error);
    res.status(500).send('Error al guardar datos');
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en https://taxander-node.onrender.com');
});

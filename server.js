const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/guardar', (req, res) => {
  const { nombre, correo, telefono, fecha } = req.body;

  console.log('--- Datos recibidos ---');
  console.log('Nombre:', nombre);
  console.log('Correo:', correo);
  console.log('Teléfono:', telefono);
  console.log('Fecha:', fecha);

  const linea = `Nombre: ${nombre}, Correo: ${correo}, Teléfono: ${telefono}, Fecha: ${fecha}\n`;
  fs.appendFile('datos.txt', linea, (err) => {
    if (err) {
      console.error('Error al guardar datos:', err);
      return res.send('Hubo un error guardando tus datos.');
    }
    res.send('¡Datos guardados correctamente!');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

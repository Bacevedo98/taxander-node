const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Para leer los datos del formulario (method="POST")
app.use(express.urlencoded({ extended: true }));

// Servir los archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta POST /guardar
app.post('/guardar', (req, res) => {
  const { nombre, correo, telefono, fecha } = req.body;

  console.log('--- Datos recibidos ---');
  console.log('Nombre:', nombre);
  console.log('Correo:', correo);
  console.log('Teléfono:', telefono);
  console.log('Fecha:', fecha);

  // Guardar en un archivo de texto (opcional)
  const linea = `Nombre: ${nombre}, Correo: ${correo}, Teléfono: ${telefono}, Fecha: ${fecha}\n`;
  fs.appendFile('datos.txt', linea, (err) => {
    if (err) {
      console.error('Error al guardar datos:', err);
      return res.send('Hubo un error guardando tus datos.');
    }
    res.send('¡Datos guardados correctamente!');
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

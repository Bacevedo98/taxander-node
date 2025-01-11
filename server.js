const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Importar CORS

const app = express();

// Configuración de CORS
app.use(cors({
  origin: 'https://tupaginaweb.com', // Reemplaza con la URL de tu página web
  methods: ['GET', 'POST'], // Métodos permitidos
}));

// Middleware para analizar datos en formato URL y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar la solicitud POST y guardar datos
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
      return res.status(500).send('Hubo un error guardando tus datos.');
    }
    res.status(200).send('¡Datos guardados correctamente!');
  });
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

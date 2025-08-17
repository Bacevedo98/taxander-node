const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Usar el puerto asignado por Render o 3000 por defecto

// Middleware para analizar JSON y datos de formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Agregado para manejar formularios
app.use(express.static(path.join(__dirname, 'docs')));

// Log para mostrar el directorio actual
console.log('Directorio actual:', __dirname);

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index-en.html'));
});

// Ruta para manejar los datos del formulario
app.post('/submit', (req, res) => {
    try {
        // Verificar que los datos se recibieron correctamente
        console.log('Datos recibidos en el servidor:', req.body);

        // Extraer los datos del cuerpo de la solicitud
        const { nombre, correo, telefono, estado, fechaHora, descuento } = req.body;

        // Formatear los datos para guardarlos en un archivo
        const datos = `Nombre: ${nombre}, Correo: ${correo}, Teléfono: ${telefono}, Estado: ${estado}, Fecha y Hora: ${fechaHora}, Descuento: ${descuento}\n`;

        // Guardar los datos en un archivo llamado datos.txt en el directorio actual
        const filePath = path.join(__dirname, 'datos.txt');
        fs.appendFileSync(filePath, datos, 'utf8');

        console.log('Datos guardados en:', filePath);

        // Enviar respuesta de éxito
        res.status(201).send('Datos guardados correctamente.');
    } catch (error) {
        // Manejar errores y enviar respuesta de error
        console.error('Error al guardar los datos:', error);
        res.status(500).send('Hubo un error al guardar los datos.');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


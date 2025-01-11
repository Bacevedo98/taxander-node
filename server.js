
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/miBaseDeDatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.log('Error al conectar a MongoDB:', error);
  });

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: { type: Number, required: true },
  fechaCreacion: { type: Date, default: Date.now },
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

app.post('/usuarios', async (req, res) => {
  try {
    const nuevoUsuario = new Usuario(req.body); // Crear usuario con los datos recibidos
    await nuevoUsuario.save(); // Guardar usuario en la base de datos
    res.status(201).send('Usuario creado exitosamente');
  } catch (error) {
    res.status(400).send(`Error al crear usuario: ${error.message}`);
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en https://taxander-node.onrender.com');
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Importa las rutas de autenticación

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Conectar a la base de datos MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a MongoDB Atlas establecida'))
  .catch(error => console.error('Error de conexión a MongoDB Atlas:', error));

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes); // Utiliza las rutas de autenticación en el endpoint /api/auth

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

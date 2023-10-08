
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://admin:HPWlLrGH8a0iyUtY@cluster0.hhn9kde.mongodb.net/catalogo?retryWrites=true&w=majority';

function connect() {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Conexión exitosa a MongoDB');
    })
    .catch((error) => {
      console.error('Error al conectar a MongoDB', error);
    });
}

module.exports = { connect };


const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://admin:bXOST10bVcRzALzc@cluster0.hhn9kde.mongodb.net/edist?retryWrites=true&w=majority';

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

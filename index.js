const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const helmet = require('helmet');
const database = require('./db/db');
const authRoutes = require('./routes/user/user');



const app = express();



app.use(helmet());

app.use(cors());


app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));



app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));



// Conexión a la base de datos
database.connect();

// Rutas de autenticación
app.use('/user', authRoutes);

app.get('/', (req, res)=>{
  res.status(200).send({hello: "Wellcome to the login:)"})
})

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

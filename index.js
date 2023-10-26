const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
// const { conexion, mysql } = require('./db/db.js');

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.static('public'));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


// Rutas de autenticación
app.use('/', authRoutes);
// 
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
 
})
 app.get('/register', (req, res)=>{
   res.sendFile(__dirname + '/register.html');
 
 });

app.get('/registroCursos', (req, res)=>{
  res.sendFile(__dirname + '/registerCursos.html');
 
});


const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
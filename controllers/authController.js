const { conexion, mysql } = require('../db/db.js');

const jwt = require('jsonwebtoken');

function generateToken(user){
  const token = jwt.sign({ userId: user.registration_number }, '09fa46fbb772c300fb7f4480a86e708e6b3e63f06f99211f08126dc4ae85b44a', { expiresIn: '2h' });
  return `Bearer ${token}`
}

exports.login = (req, res) => {
    const { registration_number, password } = req.body;
    const comprobacion = `SELECT iduser, registration_number, password FROM user WHERE registration_number = '${registration_number}' AND password = '${password}'`;
    conexion.query(comprobacion, (error, results) => {
      if (error) {
        console.error('Error al ejecutar la consulta:', error);
      } else {
        if (results.length > 0) {
          console.log(results);
          bToken = generateToken(results);
          res.setHeader('Authorization', bToken);
          res.setHeader('Id', results[0].iduser);
          res.status(200).send({ hello: "Acceso Concedido:)", token: bToken });
        } else {
          res.redirect('/index.html');
          // res.sendFile(__dirname + '../public/index.html');
          // res.status(401).send({ hello: "Acceso Denegado:(" });
        }
      }
    });
  };

  exports.register = (req, res) => {

    const { registration_number, name, last_names, email, password } = req.body;
    const query = `INSERT INTO user (registration_number, name, last_names, email, password) VALUES ('${registration_number}', '${name}', '${last_names}', '${email}', '${password}')`;
    conexion.query(query, (error, results) => {
      if (error) {

        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error en el registro' });
      } else {
        console.log('Usuario registrado con éxito');
        bToken = generateToken(req.body);
        res.setHeader('Authorization', bToken);
        res.status(200).send({ hello: "Acceso Concedido:)", token: bToken });
      }
    });
  };

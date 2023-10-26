exports.registerCursos = (req, res) => {

  // res.status(200).json({ message: 'Registro exitoso'})
  const {name, description, file} = req.body;
  const query = `INSERT INTO course (name, description, file, teacher) VALUES ('${name}','${description}','${file}','${req.headers.id}')`;
  conexion.query(query,[name, description, file, teacher], (error, results) => {
    if (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ message: 'Error en el registro' });
    } else {
      console.log('Usuario registrado con éxito');
      res.status(200).json({ message: 'Registro exitoso' });
    }
  });
};

const { conexion, mysql } = require('../../db/db.js');


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


exports.getCursos = (req, res) => {

  // res.status(200).json({ message: 'Registro exitoso'})
  const {iduser} = req.body;

  const query =
  `SELECT c.idcourse, c.name as course, c.description, c.file,c.teacher, p.idperiod, p.name as period, m.idmodule, m.name as module FROM course AS c
  INNER JOIN period as p on c.period_idperiod = p.idperiod
  INNER JOIN module as m on c.idcourse = m.course_idcourse
  INNER JOIN participants as par on par.course_idcourse = c.idcourse
  WHERE par.user_iduser = ${iduser};`;
  conexion.query(query, (error, results) => {
    if (error) {
      console.error('Error al registrar el usuario:', error);
      // res.status(500).json({ message: 'Error en el registro' });
    } else {
      // console.log(results);
      res.status(200).json({ message: 'Consulta exitosa', results : results });
    }
  });
};

// SELECT hw.idhomework, hw.name, hw.description FROM homework AS hw INNER JOIN module_has_homework as mhw on mhw.homework_idhomework = hw.idhomework INNER JOIN module as m on m.idmodule = mhw.homework_module_idmodule WHERE m.idmodule = 8;

exports.getPosts = (req, res) => {

  // res.status(200).json({ message: 'Registro exitoso'})
  const {iduser} = req.body;
  const idusr = req.params.iduser
  const idcurse = req.params.idcurse
  const idmodule = req.params.idmodule
  let homeworks;
  let posts

  const query =
  `SELECT hw.idhomework, hw.name, hw.description, hw.file
  FROM homework AS hw
  INNER JOIN module_has_homework as mhw on mhw.homework_idhomework = hw.idhomework
  INNER JOIN module as m on m.idmodule = mhw.homework_module_idmodule
  WHERE m.idmodule = ${idmodule};`;
  conexion.query(query, (error, results) => {
    if (error) {
      console.error('Error al registrar el usuario:', error);
      // res.status(500).json({ message: 'Error en el registro' });
    } else {
      homeworks = results;
      console.log(homeworks);

    }
  });



console.log("module" + idmodule);
  const query1 =
  `SELECT pst.idpost, pst.header, pst.content, pst.file, pstm.done
  from post as pst
  INNER join post_has_module as pstm on pst.idpost = pstm.post_idpost
  INNER JOIN module as md on md.idmodule = pstm.module_idmodule
  WHERE md.idmodule = ${idmodule};`;
  conexion.query(query1, (error, results) => {
    if (error) {
      console.error('Error al registrar el usuario:', error);
      // res.status(500).json({ message: 'Error en el registro' });
    } else {
      posts = results;
      console.log(posts);

      }
  res.status(200).json({ message: 'Consulta exitosa', posts: posts, homeworks: homeworks });
    });
console.log("sasada: " + posts)
};

//SELECT pst.idpost, pst.header, pst.content, pst.file, pstm.done from post as pst INNER join post_has_module as pstm on pst.idpost = pstm.post_idpost INNER JOIN module as md on md.idmodule = pstm.module_idmodule WHERE md.idmodule = 8;

const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const courseController = require('../controllers/courses/courseController');

// Rutas de autenticación
router.post('/index', authController.login);
router.post('/register', authController.register);
router.post('/registroCursos', courseController.registerCursos);
module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controller/authConroller');
const { userSchema, loginSchema } = require('../validations/userValidation');
const validate = require('../middleware/validateRequest');

router.post('/register', validate(userSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;

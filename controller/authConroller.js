const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../middleware/auth');
const userService = require('../services/userServices');
const getZodiacSign = require('../utils/getZodiacSign');



exports.register = async (req, res) => {
  try {
    const { name, email, password, birthdate } = req.body;

    // Check if user already exists in DB
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const zodiacSign = getZodiacSign(birthdate);

    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
      birthdate,
      zodiacSign,
    });
    
    console.log("New", newUser)
    const accessToken = generateAccessToken({
      id: newUser._id,
      email: newUser.email,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      accessToken,
    });
  } catch (err) {
    console.error('Register error:', err);
    return res
      .status(500)
      .json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'User does not exist!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken({
      id: user._id,
      email: user.email,
    });

    return res.status(200).json({
      message: 'Login successful',
      accessToken,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res
      .status(500)
      .json({ message: 'Server error', error: err.message });
  }
};

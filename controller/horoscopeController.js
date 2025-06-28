const userService = require('../services/userServices');
const generateWeeklyHoroscope = require('../utils/generateHoroscope');
const dailyHoroscopes = require('../todayHoroscope');

exports.today = async (req, res) => {
  try {
    const { id, email } = req.user;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const horoscope = dailyHoroscopes[user.zodiacSign];
    horoscope.date = new Date();
    return res.status(200).json({
      id,
      email,
      name: user.name,
      zodiacSign: user.zodiacSign,
      horoscope,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  }
};

exports.history = async (req, res) => {
  try {
    const { id, email } = req.user;
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const horoscope = generateWeeklyHoroscope(user.zodiacSign);

    return res.status(200).json({
      id,
      email,
      name: user.name,
      zodiacSign: user.zodiacSign,
      horoscope,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: 'Something went wrong', error: err.message });
  }
};

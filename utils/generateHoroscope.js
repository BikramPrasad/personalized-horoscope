function generateWeeklyHoroscope(sign) {
  const signs = [
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
    'Capricorn',
    'Aquarius',
    'Pisces',
  ];

  if (!signs.includes(sign)) {
    throw new Error('Invalid zodiac sign');
  }

  const sampleMessages = [
    'A good day to reflect on your goals.',
    'You may encounter a pleasant surprise.',
    'Take some time for self-care today.',
    'An opportunity might come from an unexpected place.',
    'Focus on strengthening relationships.',
    'A financial decision needs careful thought.',
    'Creativity flows naturally — embrace it.',
    'Take a bold step toward your dream.',
    'Let your intuition guide you.',
    'Someone close may need your support.',
  ];

  const moods = [
    'Happy',
    'Balanced',
    'Focused',
    'Energetic',
    'Moody',
    'Calm',
    'Driven',
  ];
  const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'White', 'Black'];
  const compatibilities = signs;

  const today = new Date();
  const horoscopeHistory = {};

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];

    horoscopeHistory[formattedDate] = {
      sign,
      message:
        sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
      mood: moods[Math.floor(Math.random() * moods.length)],
      lucky_color: colors[Math.floor(Math.random() * colors.length)],
      lucky_number: Math.floor(Math.random() * 12) + 1,
      compatibility:
        compatibilities[Math.floor(Math.random() * compatibilities.length)],
    };
  }

  return horoscopeHistory;
}

module.exports = generateWeeklyHoroscope;

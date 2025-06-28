const mongoose = require('mongoose');
const IdentifierGenerator = require('mongoose-plugin-autoinc');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    zodiacSign: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(IdentifierGenerator.plugin, {
  model: 'user',
  startAt: 100001,
});

module.exports = mongoose.model('user', userSchema);

const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const {userId, username, email, password, favoriteTeamId } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      userId,
      username,
      email,
      password: hashedPassword,
      favoriteTeamId
    });

    await newUser.save();

    console.log('✅ User saved to MongoDB:', newUser);
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ error: error.message });
  }
};

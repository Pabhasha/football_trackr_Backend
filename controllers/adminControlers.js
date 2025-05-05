exports.register = async (req, res) => {
    try {
      // Your registration logic here
      console.log(req.body); // Check received data
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
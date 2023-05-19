const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../../users.json");

const authController = {
  signup: (req, res) => {
    const { username, password } = req.body;
    // Read the existing user data from the file
    const users = JSON.parse(fs.readFileSync(usersFilePath));

    // Check if the username already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user object
    const newUser = {
      username,
      password,
    };

    // Add the new user to the existing user data
    users.push(newUser);

    // Write the updated user data back to the file
    fs.writeFileSync(usersFilePath, JSON.stringify(users));

    req.session.user = {
      username: req.body.username,
    };

    res.status(200).json({ message: "Signup successful" });
  },

  login: (req, res) => {
    const { username, password } = req.body;

    // Read the user data from the file
    const users = JSON.parse(fs.readFileSync(usersFilePath));

    // Find the user with matching username and password
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    req.session.user = {
      username: req.body.username,
    };

    res.status(200).json({ message: "Login successful", sessionId: req.sessionID });
  }
};

module.exports = authController;

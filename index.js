const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto-js');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/hash', (req, res) => {
  const { userid, password } = req.body;

  if (!userid || !password) {
    return res.status(400).send('User ID and password are required.');
  }

  const hashedPassword = crypto.SHA256(password).toString(crypto.enc.Hex);

  res.json({
    userid: userid, // Return the plain userid
    hashedPassword: hashedPassword,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
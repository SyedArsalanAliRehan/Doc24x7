const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const SECRET_KEY = "supersecretkey";
const users = [];

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const existing = users.find(u => u.username === username);
    if (existing) return res.status(409).json({ message: 'User already exists' });
    users.push({ username, password });
    res.status(201).json({ message: 'Signup successful' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Debug route to see current users (DEV ONLY)
app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/verify', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token required' });
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ valid: true, user: decoded });
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
});

app.listen(3000, () => console.log('Auth Service on port 3000'));

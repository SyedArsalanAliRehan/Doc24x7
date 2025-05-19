const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const notifications = [];

app.post('/notify', (req, res) => {
    const { type, recipient, message } = req.body;
    const notif = { id: uuidv4(), type, recipient, message, status: 'sent', timestamp: new Date() };
    notifications.push(notif);
    console.log(`📢 Sent ${type.toUpperCase()} to ${recipient}: ${message}`);
    res.status(200).json({ message: 'Notification sent', data: notif });
});

app.get('/notifications', (req, res) => res.json(notifications));

app.listen(3005, () => console.log('Notification Service on port 3005'));

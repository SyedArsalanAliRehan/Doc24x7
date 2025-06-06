const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const payments = [];

app.post('/payments', async (req, res) => {
    const { patientId, amount, method, appointmentId } = req.body;
    const payment = { id: uuidv4(), patientId, appointmentId, amount, method, status: 'paid', timestamp: new Date() };
    payments.push(payment);

    try {
        await axios.post('http://localhost:3005/notify', {
            type: 'sms',
            recipient: '9999999999',
            message: `Your payment of ₹${amount} for appointment ${appointmentId} was successful.`
        });
        console.log(`✅ Notification sent for payment ${payment.id}`);
    } catch (err) {
        console.error(`❌ Notification failed: ${err.message}`);
    }

    res.status(201).json({ message: 'Payment successful', payment });
});

app.get('/payments', (req, res) => res.json(payments));

app.get('/payments/:id', (req, res) => {
    const payment = payments.find(p => p.id === req.params.id);
    if (!payment) return res.status(404).json({ message: 'Not found' });
    res.json(payment);
});

app.listen(3004, () => console.log('Billing Service on port 3004'));

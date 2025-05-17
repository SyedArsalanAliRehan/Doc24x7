const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const appointments = [];

app.post('/appointments', async (req, res) => {
    const { patientId, doctorId, date, time } = req.body;
    const appointment = { id: uuidv4(), patientId, doctorId, date, time, status: 'booked' };
    appointments.push(appointment);

    try {
        await axios.post('http://localhost:3005/notify', {
            type: 'sms',
            recipient: '9999999999',
            message: `Your appointment with Doctor ${doctorId} is confirmed for ${date} at ${time}.`
        });
        console.log(`✅ Notification sent for appointment ${appointment.id}`);
    } catch (err) {
        console.error(`❌ Notification failed: ${err.message}`);
    }

    res.status(201).json({ message: 'Appointment booked', data: appointment });
});

app.get('/appointments', (req, res) => res.json(appointments));

app.delete('/appointments/:id', (req, res) => {
    const index = appointments.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });
    appointments.splice(index, 1);
    res.json({ message: 'Appointment cancelled' });
});

app.listen(3003, () => console.log('Appointment Service on port 3003'));

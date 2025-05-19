const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const doctors = [];

app.post('/doctors', (req, res) => {
    const { name, specialty, availableDates } = req.body;
    const doctor = { id: uuidv4(), name, specialty, availableDates };
    doctors.push(doctor);
    res.status(201).json({ message: 'Doctor added', doctor });
});

app.get('/doctors', (req, res) => res.json(doctors));

app.get('/doctors/:id', (req, res) => {
    const doctor = doctors.find(d => d.id === req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
});

app.listen(3001, () => console.log('Doctor Service on port 3001'));

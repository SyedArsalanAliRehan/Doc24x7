const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const patients = [];

app.post('/patients', (req, res) => {
    const { name, age, gender, contact } = req.body;
    const patient = { id: uuidv4(), name, age, gender, contact };
    patients.push(patient);
    res.status(201).json({ message: 'Patient added', patient });
});

app.get('/patients', (req, res) => res.json(patients));

app.get('/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id === req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
});

app.listen(3002, () => console.log('Patient Service on port 3002'));

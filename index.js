const express = require('express');
const app = express();
const bodyParser = require('body-parser');  // Importér bodyParser kun én gang

require('express-async-errors');

const db = require('./db');
const employeeRoutes = require('./Controllers/employee.controller');

// Brug bodyParser til at parse JSON i request body
app.use(bodyParser.json());

// Brug de definerede routes for ansatte under '/api/employees'
app.use('/api/employees', employeeRoutes);

// Middleware til håndtering af fejl og undtagelser
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send('Noget fejlede!');
});

// Forsøg at lave en databaseforbindelse
db.query("SELECT 1")
    .then(() => {
        console.log('db forbindelse lykkedes');
        app.listen(3000, () => console.log('server started at port 3000'));
    })
    .catch(err => console.log('db forbindelse fejlet. \n' + err));

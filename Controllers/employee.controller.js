const express = require('express');
const router = express.Router();

// Importér servicen, der håndterer logikken for medarbejdere
const service = require('../Services/employee.service');

// Route: Hent alle medarbejdere
router.get('/', async (req, res) => {
    const employees = await service.getAllEmployees();
    res.send(employees);
});

// Route: Hent en specifik medarbejder baseret på ID
router.get('/:id', async (req, res) => {
    const employee = await service.getEmployeesById(req.params.id);
    
    if (employee.length === 0)
        res.status(400).json('Ingen post med givet id: ' + req.params.id);
    else
        res.send(employee);
});

// Route: Slet en medarbejder baseret på ID
router.delete('/:id', async (req, res) => {
    const affectedRows = await service.deleteEmployee(req.params.id);

    if (affectedRows === 0)
        res.status(400).json('Ingen post med givet id: ' + req.params.id);
    else
        res.send('Medarbejder slettet med succes.');
});

// Route: Tilføj en ny medarbejder
router.post('/', async (req, res) => {
    try {
        await service.addOrEditEmployee(req.body);
        res.status(201).send('Oprettet med succes!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Intern Serverfejl');
    }
});

// Route: Opdater en medarbejder baseret på ID
router.put('/:id', async (req, res) => {
    const affectedRows = await service.addOrEditEmployee(req.body, req.params.id);
    
    if (affectedRows === 0)
        res.status(404).json('Ingen post med givet id: ' + req.params.id);
    else
        res.send('Opdateret med succes.');
});

module.exports = router;

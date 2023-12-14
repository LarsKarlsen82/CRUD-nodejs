const db = require('../db');

// Funktion: Hent alle medarbejdere
module.exports.getAllEmployees = async () => {
    // Udfør en SELECT-forespørgsel for at hente alle medarbejdere fra databasen
    const [records] = await db.query("SELECT * FROM employees")
        .catch(err => console.log(err));
    
    // Returnér resultatet af SELECT-forespørgslen
    return records;
}

// Funktion: Hent medarbejder baseret på ID
module.exports.getEmployeesById = async (id) => {
    // Udfør en SELECT-forespørgsel for at hente en medarbejder baseret på ID fra databasen
    const [record] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);

    // Returnér resultatet af SELECT-forespørgslen
    return record;
}

// Funktion: Slet medarbejder baseret på ID
module.exports.deleteEmployee = async (id) => {
    // Udfør en DELETE-forespørgsel for at slette en medarbejder baseret på ID fra databasen
    const [{ affectedRows }] = await db.query("DELETE FROM employees WHERE id = ?", [id]);

    // Returnér antallet af påvirkede rækker (antal slettede medarbejdere)
    return affectedRows;
}

// Funktion: Tilføj eller redigér medarbejder
module.exports.addOrEditEmployee = async (obj, id = 0) => {
    // Udfør en CALL-forespørgsel til en gemt procedure for at tilføje eller redigere en medarbejder i databasen
    const [[[{ affectedRows }]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)", 
        [id, obj.name, obj.employee_code, obj.salary]);

    // Returnér antallet af påvirkede rækker (1 hvis en medarbejder blev tilføjet/redigeret, 0 ellers)
    return affectedRows;
}

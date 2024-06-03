const sql = require('mssql');

const dbConfig = {
    user: 'saif',
    password: 'Phishprobe@123',
    server: 'phishserver.database.windows.net',
    database: 'phishprobe',
    options: {
        encrypt: true, // Use encryption
        enableArithAbort: true
    }
};

async function connectToDatabase() {
    try {
        let pool = await sql.connect(dbConfig);
        console.log('Connected to the database');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
}

async function createTableAndInsertData() {
    const createTableQuery = `
        CREATE TABLE emailinfo (
            Email NVARCHAR(50) PRIMARY KEY,
            Name NVARCHAR(50),
            Password NVARCHAR(50),
            Phone NVARCHAR(50)
        )
    `;

    const insertDataQuery = `
        INSERT INTO emailinfo (Email, Name, Password, Phone)
        VALUES ('syedsaifali214@gmail.com', 'syed saif ali', 'Saif@123', '8957204383')
    `;

    try {
        let pool = await connectToDatabase();

        // Create table
        await pool.request().query(createTableQuery);
        console.log('Table created successfully');

        // Insert data
        await pool.request().query(insertDataQuery);
        console.log('Data inserted successfully');

    } catch (err) {
        console.error('Error occurred:', err);
    } finally {
        sql.close();
    }
}

async function retrieveData() {
    const selectQuery = `
        SELECT * FROM emailinfo
    `;

    try {
        let pool = await connectToDatabase();

        // Retrieve data
        let result = await pool.request().query(selectQuery);
        console.log('Data retrieved successfully');
        console.log(result.recordset); // Display the retrieved data

        return result.recordset;

    } catch (err) {
        console.error('Error occurred:', err);
    } finally {
        sql.close();
    }
}
async function retrieveData2() {
    const selectQuery = `
        SELECT * FROM instadata
    `;

    try {
        let pool = await connectToDatabase();

        // Retrieve data
        let result = await pool.request().query(selectQuery);
        console.log('Data retrieved successfully');
        console.log(result.recordset); // Display the retrieved data

        return result.recordset;

    } catch (err) {
        console.error('Error occurred:', err);
    } finally {
        sql.close();
    }
}
async function retrieveData3() {
    const selectQuery = `
        SELECT * FROM location
    `;

    try {
        let pool = await connectToDatabase();

        // Retrieve data
        let result = await pool.request().query(selectQuery);
        console.log('Data retrieved successfully');
        console.log(result.recordset); // Display the retrieved data

        return result.recordset;

    } catch (err) {
        console.error('Error occurred:', err);
    } finally {
        sql.close();
    }
}
async function main() {
    const data = await retrieveData();
    const data2 = await retrieveData2();
    const data3 = await retrieveData3();
    console.log(data);
    console.log(data2);
    console.log(data3);
}


main();

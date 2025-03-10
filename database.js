const sql = require('mssql');

config = {
    user: 'User',
    password: 'password', //'Entadm!n'
    database: 'Database',
    server: 'DESKTOP-000000',
    driver: 'msnodesqlv8',
    pool: {
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true,
        trustServerCertificate: true,
        enableArithAbort: true,
   },
   port: 1433,
};

async function connectDB() {
    try {
        const pool = await sql.connect(config);
        console.log("✅ Connected to SQL Server");
        return pool;
    } catch (error) {
        console.error("❌ Database Connection Failed:", error.message);
        process.exit(1); // Stop the app if the database connection fails
    }
}

module.exports = connectDB();

/*
let pool =  sql.connect(config);

module.exports = pool;
*/
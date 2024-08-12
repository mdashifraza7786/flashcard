import mysql from 'mysql2/promise';


export async function dbConnect() {
    try {
        const connection = await mysql.createConnection({
            host: 'database-3.c3w6uyiiyfss.us-east-1.rds.amazonaws.com',  // AWS RDS endpoint
            port: 3306,
            user: 'admin',    // Database username
            password: 't6ATvka8JF7DPyRMt9uE', // Database password
            database: 'db_eazylearning',
        });
        return connection;
    } catch (error) {
        console.error('Error connecting to the MySQL database:', error);
        throw error;
    }
}

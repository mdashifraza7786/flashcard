import mysql, { RowDataPacket } from 'mysql2/promise';


export async function dbConnect() {
    try {
        const connection = await mysql.createConnection({
            host: 'database-3.c3w6uyiiyfss.us-east-1.rds.amazonaws.com',  // AWS RDS endpoint
            port: 3306,
            user: 'admin', 
            password: 't6ATvka8JF7DPyRMt9uE',
            database: 'db_eazylearning',
        });
        return connection;
    } catch (error) {
        console.error('Error connecting to the MySQL database:', error);
        throw error;
    }
}

// Function to execute SQL commands
export async function executeSqlCommand(sqlCommand: string, params: any[] = []) {
    const connection = await dbConnect();
    try {
        const [rows] = await connection.query<RowDataPacket[]>(sqlCommand, params);
        return rows;
    } catch (error: any) {
        console.error('Error executing SQL command:', error);
        throw error;
    } finally {
        await connection.end();
    }
}


export async function checkTableExists(tableName: string) {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        const [rows] = await connection.query(
            `SELECT COUNT(*) AS count
             FROM information_schema.tables 
             WHERE table_schema = ? 
             AND table_name = ? 
             LIMIT 1;`,
            [process.env.DB_NAME, tableName]
        );


        await connection.end();

        return rows;
    } catch (error) {
        console.error('Error checking table existence:', error);
        throw error;
    }
}

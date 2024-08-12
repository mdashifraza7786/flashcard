import mysql, { RowDataPacket } from 'mysql2/promise';
import { config } from 'dotenv';
config({ path: '.env.local' });
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



// Function to get user by email
export async function getUserByUserid(email: string) {
    const connection = await dbConnect();
    try {
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM user WHERE email = ?', [email]);

        if (rows.length > 0) {
            return rows[0];
        } else {
            return false;
        }
    } catch (error: any) {
        throw error;
    } finally {
        await connection.end();
    }
}

// Function to get all members
export async function getMembers() {
    const connection = await dbConnect();
    try {
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM user');

        if (rows.length > 0) {
            return rows;
        } else {
            return false;
        }
    } catch (error: any) {
        throw error;
    } finally {
        await connection.end();
    }
}

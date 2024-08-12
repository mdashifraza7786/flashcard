import mysql, { RowDataPacket } from 'mysql2/promise';
import { NextResponse } from 'next/server';

// const dbConfig = {
//     host: 'database-3.c3w6uyiiyfss.us-east-1.rds.amazonaws.com', 
//     port: 3306,
//     user: 'admin',  
//     password: 't6ATvka8JF7DPyRMt9uE',
//     database: 'db_eazylearning',
// };
const dbConfig = {
    host: 'localhost', 
    user: 'root',  
    password: '',
    database: 'eazylearning',
};

export async function dbConnect() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        return connection;
    } catch (error) {
        console.error('Error connecting to the MySQL database:', error);
        throw error;
    }
}

export async function getUserByUserid(email: string) {
    const connection = await dbConnect();
    try {
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM user WHERE email = ?', [email]);

        if (rows.length > 0) {
            return  rows[0];
        }else{
            return false;
        }

        
    } catch (error: any) {
        throw error;
    } finally {
        await connection.end();
    }
}

export async function getMembers() {
    const connection = await dbConnect();
    try {
        const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM user');

        if (rows.length > 0) {
            return  rows;
        }else{
            return false;
        }

        
    } catch (error: any) {
        throw error;
    } finally {
        await connection.end();
    }
}
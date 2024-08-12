import mysql, { RowDataPacket } from 'mysql2/promise';
export async function dbConnect() {
    try {
        const connection = await mysql.createConnection({
            host: '',
            port: 3306,
            user: '', 
            password: '',
            database: '',
        });
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

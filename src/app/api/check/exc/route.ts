import { checkTableExists, dbConnect, executeSqlCommand } from "@/util/testdb";
import { NextResponse } from "next/server";

export async function GET() {
    const command = `CREATE TABLE  topics (
                id INT AUTO_INCREMENT PRIMARY KEY,
                topicTitle VARCHAR(255) NOT NULL
            );`;

   
    const connection2 = await checkTableExists("topics");
    // const connection2 = await dbConnect();

    return NextResponse.json(connection2);
}
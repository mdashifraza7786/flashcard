import { executeSqlCommand } from "@/util/database";
import { NextResponse } from "next/server";

export async function GET() {
    const command = `CREATE TABLE IF NOT EXISTS topics (
                id INT AUTO_INCREMENT PRIMARY KEY,
                topicTitle VARCHAR(255) NOT NULL
            );`;
    const connection = await executeSqlCommand(command);

    const command2 = `CREATE TABLE questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        topicId INT NOT NULL,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        FOREIGN KEY (topicId) REFERENCES topics(id) ON DELETE CASCADE
    );`;
    const connection2 = await executeSqlCommand(command);

    return NextResponse.json(connection2);
}
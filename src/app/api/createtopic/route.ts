import { dbConnect } from '@/util/database';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { topicTitle, questions } = await req.json();
        const connection = await dbConnect();

        // Insert new topic
        const [result] = await connection.query(
            'INSERT INTO topics (topicTitle) VALUES (?)',
            [topicTitle]
        );
        const topicId = (result as any).insertId;

        // Insert associated questions
        const questionPromises = questions.map((q: { question: string; answer: string }) =>
            connection.execute(
                'INSERT INTO questions (topicId, question, answer) VALUES (?, ?, ?)',
                [topicId, q.question, q.answer]
            )
        );
        await Promise.all(questionPromises);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error creating topic:', error);
        return NextResponse.json({ message: 'Error creating topic', error }, { status: 500 });
    }
}

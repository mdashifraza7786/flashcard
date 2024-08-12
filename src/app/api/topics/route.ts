// src/app/api/topics/route.ts
import { dbConnect } from '@/util/database';
import { NextResponse } from 'next/server';


export async function GET() {
    let connection;
    try {
        connection = await dbConnect();

        // Fetch topics
        const [topics] = await connection.execute('SELECT * FROM topics');

        const [questions] = await connection.execute('SELECT * FROM questions');

        const topicsWithQuestions = (topics as any[]).map(topic => ({
            ...topic,
            questions: (questions as any[]).filter(question => question.topicId === topic.id),
        }));

        return NextResponse.json(topicsWithQuestions);
    } catch (error) {
        console.error('Error fetching topics and questions:', error);
        return NextResponse.json({ error: 'Failed to fetch topics and questions' }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

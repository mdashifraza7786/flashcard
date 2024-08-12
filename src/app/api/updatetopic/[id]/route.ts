import { dbConnect } from '@/util/database';
import { NextResponse } from 'next/server';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    
    try {
        const { topicTitle, questions } = await req.json();
        const connection = await dbConnect();

        // Update topic title
        await connection.execute(
            'UPDATE topics SET topicTitle = ? WHERE id = ?',
            [topicTitle, id]
        );

        // Delete existing questions
        await connection.execute(
            'DELETE FROM questions WHERE topicId = ?',
            [id]
        );

        // Insert new questions
        const questionPromises = questions.map((q: { question: string; answer: string }) =>
            connection.execute(
                'INSERT INTO questions (topicId, question, answer) VALUES (?, ?, ?)',
                [id, q.question, q.answer]
            )
        );
        await Promise.all(questionPromises);

        return NextResponse.json({ id, topicTitle, questions });
    } catch (error) {
        console.error('Error updating topic:', error);
        return NextResponse.json({ message: 'Error updating topic', error }, { status: 500 });
    }
}

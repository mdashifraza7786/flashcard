import { dbConnect } from '@/util/database';
import { NextResponse } from 'next/server';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const connection = await dbConnect();

        // Delete associated questions
        await connection.execute(
            'DELETE FROM questions WHERE topicId = ?',
            [id]
        );

        // Delete the topic
        await connection.execute(
            'DELETE FROM topics WHERE id = ?',
            [id]
        );

        return NextResponse.json({ message: 'Topic deleted successfully' });
    } catch (error) {
        console.error('Error deleting topic:', error);
        return NextResponse.json({ message: 'Error deleting topic', error }, { status: 500 });
    }
}

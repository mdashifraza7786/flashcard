"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopicCard from "@/components/TopicCard";
import Loading from '../loading';

const Dashboard: React.FC = () => {
    const [topics, setTopics] = useState<Array<{
        id: number;
        topicTitle: string;
        questions: { question: string; answer: string }[];
    }>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const response = await axios.get('/api/topics');
                setTopics(response.data);
            } catch (error) {
                setError('Failed to fetch topics');
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, []);

    if (loading) {
        return <Loading/>
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <section className="flex flex-col gap-14">
            <h1 className="text-3xl font-semibold tracking-wider">User Side</h1>
            <div className="flex flex-col gap-5">
                {topics.length === 0 ? (
                    <p>No topics available</p>
                ) : (
                    topics.map((item) => (
                        <TopicCard
                            key={item.id}
                            id={item.id}
                            title={item.topicTitle}
                            questions={item.questions}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default Dashboard;

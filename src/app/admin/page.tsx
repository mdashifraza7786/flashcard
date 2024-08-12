"use client";
import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';  // Import Axios
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { Bars } from 'react-loader-spinner'; // Import a loader component or use any other loader

const Admin: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'add' | 'view'>('add');
    const [topicTitle, setTopicTitle] = useState('');
    const [questions, setQuestions] = useState<{ question: string; answer: string }[]>([
        { question: '', answer: '' },
    ]);
    const [topicsList, setTopicsList] = useState<Array<{
        id: number;
        topicTitle: string;
        questions: { question: string; answer: string }[];
    }>>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedTopicTitle, setEditedTopicTitle] = useState<string>('');
    const [editedQuestions, setEditedQuestions] = useState<{ question: string; answer: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Loading state

    // Fetch topics on component mount
    useEffect(() => {
        const fetchTopics = async () => {
            setLoading(true); // Set loading to true before the request
            try {
                const response = await axios.get('/api/topics');
                setTopicsList(response.data);
            } catch (error) {
                console.error("Error fetching topics:", error);
            } finally {
                setLoading(false); // Set loading to false after the request is done
            }
        };

        fetchTopics();
    }, []);

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: '', answer: '' }]);
    };

    const handleQuestionChange = (index: number, field: 'question' | 'answer', value: string) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const handleDeleteQuestion = (index: number) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (editIndex !== null) {
            // Update existing topic (PUT request)
            try {
                const topicId = topicsList[editIndex].id;
                const response = await axios.put(`/api/updatetopic/${topicId}`, {
                    topicTitle: editedTopicTitle,
                    questions: editedQuestions,
                });
                const updatedTopicsList = topicsList.map((topic, index) =>
                    index === editIndex ? response.data : topic
                );
                setTopicsList(updatedTopicsList);
                setEditIndex(null);
            } catch (error) {
                console.error("Error updating topic:", error);
            }
        } else {
            // Add new topic (POST request)
            try {
                const response = await axios.post('/api/createtopic', {
                    topicTitle,
                    questions,
                });
                setTopicsList([...topicsList, response.data]);
            } catch (error) {
                console.error("Error creating topic:", error);
            }
        }

        // Reset state
        setTopicTitle('');
        setQuestions([{ question: '', answer: '' }]);
    };

    const handleEdit = (index: number) => {
        const topicToEdit = topicsList[index];
        setEditIndex(index);
        setEditedTopicTitle(topicToEdit.topicTitle);
        setEditedQuestions(topicToEdit.questions);
        setQuestions(topicToEdit.questions);
        setActiveTab('add');
    };

    const handleDelete = async (index: number) => {
        const topicId = topicsList[index].id;
        try {
            await axios.delete(`/api/deletetopic/${topicId}`);
            const updatedTopicsList = topicsList.filter((_, i) => i !== index);
            setTopicsList(updatedTopicsList);
        } catch (error) {
            console.error("Error deleting topic:", error);
        }
    };

    return (
        <section className="flex flex-col gap-14 p-4">
            <div className="flex gap-4 mb-4">
                <button
                    onClick={() => setActiveTab('add')}
                    className={`p-2 rounded ${activeTab === 'add' ? 'bg-supporting2 text-white' : 'bg-supporting'}`}
                >
                    Add Flashcard
                </button>
                <button
                    onClick={() => setActiveTab('view')}
                    className={`p-2 rounded ${activeTab === 'view' ? 'bg-supporting2 text-white' : 'bg-supporting'}`}
                >
                    View Flashcards
                </button>
            </div>

            {activeTab === 'add' && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Topic Title"
                        value={editIndex !== null ? editedTopicTitle : topicTitle}
                        onChange={(e) => {
                            if (editIndex !== null) {
                                setEditedTopicTitle(e.target.value);
                            } else {
                                setTopicTitle(e.target.value);
                            }
                        }}
                        className="px-3 py-2 outline-none rounded bg-supporting"
                        required
                    />

                    {questions.map((qa, index) => (
                        <div key={index} className="flex gap-4 items-center border-b-2 border-supporting py-5">
                            <div className="flex flex-col w-1/2">
                                <input
                                    type="text"
                                    placeholder={`Question ${index + 1}`}
                                    value={qa.question}
                                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                    className="px-3 py-2 outline-none rounded bg-supporting"
                                    required
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <input
                                    type="text"
                                    placeholder={`Answer ${index + 1}`}
                                    value={qa.answer}
                                    onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                    className="px-3 py-2 outline-none rounded bg-supporting"
                                    required
                                />
                            </div>
                            <MdDeleteForever onClick={() => handleDeleteQuestion(index)} className='text-3xl cursor-pointer' />
                        </div>
                    ))}

                    <div className='flex justify-between items-center'>
                        <button
                            type="button"
                            onClick={handleAddQuestion}
                            className="bg-cyan-400 text-white p-2 rounded"
                        >
                            Add More Questions
                        </button>
                        <button
                            type="submit"
                            className="bg-supporting2 text-white p-2 rounded"
                        >
                            {editIndex !== null ? 'Update Topic' : 'Submit'}
                        </button>
                    </div>
                </form>
            )}

            {activeTab === 'view' && (
                <div className="flex flex-col gap-4">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Bars
                                height="80"
                                width="80"
                                color="#ffffff"
                                ariaLabel="bars-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : topicsList.length === 0 ? (
                        <p>No topics available</p>
                    ) : (
                        topicsList.map((topic, index) => (
                            <div key={topic.id} className="flex flex-col gap-4 border p-4 rounded">
                                <h2 className="text-xl font-bold">{topic.topicTitle}</h2>
                                {topic.questions.map((qa, i) => (
                                    <div key={i} className="flex gap-4 border-b py-2">
                                        <div className="w-1/2">
                                            <p className="font-semibold">Question {i + 1}:</p>
                                            <p>{qa.question}</p>
                                        </div>
                                        <div className="w-1/2">
                                            <p className="font-semibold">Answer {i + 1}:</p>
                                            <p>{qa.answer}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex gap-4 mt-2">
                                    <MdEdit onClick={() => handleEdit(index)} className='text-2xl cursor-pointer' />
                                    <MdDeleteForever onClick={() => handleDelete(index)} className='text-2xl cursor-pointer' />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </section>
    );
};

export default Admin;

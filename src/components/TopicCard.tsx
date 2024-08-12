"use client"
import { useState } from "react";
import FlashcardModal from "@/components/FlashcardModal";

interface Datas {
    key: number;
    id: number;
    title: string;
    questions: { question: string; answer: string }[];
}

const TopicCard = ({ id, title, questions }: Datas) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLearnClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-supporting flex justify-between items-center py-5 px-5 rounded-lg topicCard relative">
            <div
                className="progess absolute left-0 top-0 h-[2px] bg-[#E90074] w-full"
            ></div>
            <div>
                <h1>{title}</h1>
            </div>
            <div className="flex gap-5">
                <button
                    className="shadow-[0px_0_2px_1px_#111111] px-3 py-2 w-[100px] rounded-lg border-cyan-300 border hover:bg-cyan-300 transition-all"
                    onClick={handleLearnClick}
                >
                    Learn
                </button>
            </div>

            {isModalOpen && (
                <FlashcardModal
                    title={title}
                    questions={questions}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default TopicCard;

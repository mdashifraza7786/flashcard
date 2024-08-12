'use client'
import { useState } from "react";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { FaTimes } from "react-icons/fa";

interface FlashcardModalProps {
    title: string;
    questions: { question: string; answer: string }[];
    onClose: () => void;
}

const FlashcardModal = ({ title, questions, onClose }: FlashcardModalProps) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    console.log(questions)
    const handleFlashcardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNextClick = () => {
        setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
        setIsFlipped(false);
    };

    const handlePreviousClick = () => {
        setCurrentQuestion((prev) => Math.max(prev - 1, 0));
        setIsFlipped(false);
    };

    return (
        <div className="flashcard-modal h-screen w-screen fixed top-0 left-0 inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="absolute bg-black w-full flex justify-between items-center top-0 h-24 px-24">
                <h1 className="text-2xl font-semibold text-supporting2">{title}</h1>
                <FaTimes className="text-3xl cursor-pointer" onClick={onClose} />
            </div>
            <div className="w-full p-5 rounded-lg shadow-lg relative flex gap-2 items-center justify-center">
                <IoIosArrowDropleftCircle
                    className="text-6xl cursor-pointer"
                    onClick={handlePreviousClick}
                />
                <div
                    className={`flashcard-container relative w-[25rem] h-[35rem] cursor-pointer ${
                        isFlipped ? "flipped" : ""
                    }`}
                    onClick={handleFlashcardClick}
                >
                    <div className="flashcard">
                        <div className="front px-10 relative">
                            <h2 className="absolute top-10 font-semibold text-cyan-300">Question no. {currentQuestion+1}</h2>
                            {questions[currentQuestion].question}
                            <p className="text-gray-400 absolute bottom-5 left-1/2 text-sm -translate-x-1/2 -translate-y-1/2">Click me to see answer</p>
                        </div>
                        <div className="back px-10 relative">
                        <h2 className="absolute top-10 font-semibold text-cyan-300">Answer</h2>

                            {questions[currentQuestion].answer}
                        </div>
                    </div>
                </div>
                <IoIosArrowDroprightCircle
                    className="text-6xl cursor-pointer"
                    onClick={handleNextClick}
                />
            </div>
        </div>
    );
};

export default FlashcardModal;

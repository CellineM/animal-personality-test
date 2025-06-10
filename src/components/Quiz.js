// // The logic of the quiz + navigation

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import quizQuestions from "../data/questions";

import { MdArrowBack } from "react-icons/md";



import "../css/Quiz.css";

export default function Quiz() {
    // tracking the current qn
    const [qNo, setQNo] = useState(0);
    // storing the score for each animal chosen
    const [score, setScore] = useState({});
    // answer selected tracked
    const [selectedAnswers, setSelectedAnswers] = useState({});

    // to navigate to the end page = result page 
    const navigate = useNavigate();

    // when the user select the answer, this function is called
    const handleAnswer = (typeAnimal, index) => {

        // Record selected answer
        setSelectedAnswers((prev) => ({
            ...prev,
            [qNo]: index,
        }));

        // update the score
        setScore((prev) => ({
            ...prev,
            [typeAnimal]: (prev[typeAnimal] || 0) + 1
        }));

        // when it reached the final question, it will calculate the final score 
        if (qNo + 1 === quizQuestions.length) {
            // lastQn = last question
            const lastQn = { ...score };
            lastQn[typeAnimal] = (lastQn[typeAnimal] || 0) + 1;

            // find the animal with the highest score 
            const highestScore = Object.entries(lastQn).sort((a, b) => b[1] - a[1])[0][0];

            // go to the final page where it show the result 
            navigate("/result", { state: { animal: highestScore } });
        }
        else {
            // when its still not the final question it will go to the next question
            setQNo(qNo + 1);
        }
    };

    // retrieve the current question
    const q = quizQuestions[qNo];


    return (
        <div className="quiz-page">
            {qNo > 0 && (
                <button className="top-back-button" onClick={() => setQNo(qNo - 1)}>
                    <MdArrowBack size={24} />
                </button>
            )}

            <div className="quiz-box">
                <h1>{q.sectionTitle || `Question ${qNo + 1}`}</h1>
                <p className="question-text">{q.q}</p>

                <div className="option-row">
                    {q.a.map((opt, i) => (
                        <label className="option-box" htmlFor={`option-${qNo}-${i}`} key={i}>
                            <input
                                type="radio"
                                name={`question-${qNo}`}
                                id={`option-${qNo}-${i}`}
                                checked={selectedAnswers[qNo] === i}
                                onChange={() => handleAnswer(opt.typeAnimal, i)}
                            />
                            <span>{opt.text}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

}



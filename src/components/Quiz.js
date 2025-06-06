// // The logic of the quiz + navigation

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import quizQuestions from "../data/questions";

import "../css/Quiz.css";

export default function Quiz() {
    // tracking the current qn
    const [qNo, setQNo] =  useState(0);
    // storing the score for each animal chosen
    const [score, setScore] = useState({});
    // to navigate to the end page = result page 
    const navigate = useNavigate();

    // when the user select the answer, this function is called
    const handleAnswer = (typeAnimal) => {
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
            navigate("/result", {state: {animal: highestScore}});
        }
        else {
            // when its still not the final question it will go to the next question
            setQNo(qNo + 1);
        }
    };

    // retrieve the current question
    const q = quizQuestions[qNo];
    

    return (
        <div className="quiz-box">
            <h2> Question {qNo + 1} / {quizQuestions.length}</h2>
            <p className="question-text"> {q.q} </p>
            {q.a.map((opt, i) => (
                <button key = {i} 
                onClick={() => handleAnswer (opt.typeAnimal)}
                className="answer-button">
                    {opt.text}
                </button>
            ))}
        </div>
    );
}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import quizQuestions from "../data/questions";
// import "../css/Quiz.css";

// export default function Quiz() {
//     const [qNo, setQNo] = useState(0);                  // Current question index
//     const [score, setScore] = useState({});             // Scores by animal
//     const [selectedAnswer, setSelectedAnswer] = useState(null); // Currently selected answer
//     const navigate = useNavigate();

//     const q = quizQuestions[qNo]; // Get current question (assume it always exists)

//     const handleSelect = (typeAnimal) => {
//         setSelectedAnswer(typeAnimal); // Mark selection
//     };

//     const handleNext = () => {
//         // Update score
//         const updatedScore = {
//             ...score,
//             [selectedAnswer]: (score[selectedAnswer] || 0) + 1,
//         };
//         setScore(updatedScore);

//         // Final question: calculate result
//         if (qNo + 1 === quizQuestions.length) {
//             const highestScore = Object.entries(updatedScore)
//                 .sort((a, b) => b[1] - a[1])[0][0];
//             navigate("/result", { state: { animal: highestScore } });
//         } else {
//             // Go to next question
//             setQNo(qNo + 1);
//             setSelectedAnswer(null); // Reset for next question
//         }
//     };

//     return (
//         <div className="quiz-box">
//             <h2>Question {qNo + 1} / {quizQuestions.length}</h2>
//             <p className="question-text">{q.q}</p>
//             <div className="options">
//                 {q.a.map((opt, i) => (
//                     <button
//                         key={i}
//                         onClick={() => handleSelect(opt.typeAnimal)}
//                         className={`answer-button ${selectedAnswer === opt.typeAnimal ? "selected" : ""}`}
//                     >
//                         {opt.text}
//                     </button>
//                 ))}
//             </div>

//             {selectedAnswer && (
//                 <button className="next-button" onClick={handleNext}>
//                     {qNo + 1 === quizQuestions.length ? "See Result" : "Next"}
//                 </button>
//             )}
//         </div>
//     );
// }

// Result page
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import resultDescriptions from "../data/resultDescription";
import "../css/Result.css";

export default function Result() {
    
    // Get the data/result from the quiz page
    const location = useLocation();
    // to go to other page 
    const navigate = useNavigate();
    // get the animal from the quiz score
    const animal = location.state?.animal;

    // if the user go to result page directly there shouldnt be any data shown
    if (!animal) return <p> No Animal Found. Please do the quiz to find out your result!</p>

    // Get the result from the result description
    const animalResult = resultDescriptions[animal];

    return(
        <div className="result-box">
        {/* Show the animal based on the result  */}
        <h1>{animalResult.emoji} {animalResult.name}</h1>

        {/* Show the traits of the animal */}
        <h2>{animalResult.traits}</h2>

        {/* the description of the animal - characteristic */}
        <p>{animalResult.description}</p>

        {/* Show the animal that match with the user animal result */}
        <h4>
             🧩 You match well with:{" "}
             {animalResult.matchWith.map ((typeAnimal) => 
                resultDescriptions[typeAnimal].emoji + " " + 
                resultDescriptions[typeAnimal].name.split(" ")[3]
                )
                .join(", ")}
        </h4>

        {/* Button for the user to go to the homepage */}
        <button onClick={() => navigate("/")}>
            Home
        </button>
        </div>
    );
}
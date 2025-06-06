// Homepage - 1st page
import React from "react";
import { useNavigate } from "react-router-dom";

// importing the styling
import "../css/Home.css";

export default function Home() {
    // initialize the navigation 
    const Navigate = useNavigate()

    return (
        // the main page box / container 
        <div className="home-box">
            <h1>Animal Personality Quiz</h1>
            <h2>🐶🐱🐢🐍🦁🐰🐬🦉</h2>

            <p> Ready to find out which one are you? 😜</p>

            {/* when the button is clicked it will go to the quiz page  */}
            <button className="startButton" onClick={() => Navigate("/quiz") }>
                Let's GO!!
            </button>
        </div>
    );
}
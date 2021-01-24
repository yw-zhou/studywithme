import React, { useState } from 'react';

function IntroBox() {
    const [main, setMain] = useState(
        <div>
            <h1 id="main-title">Let's Study Together!</h1>
            <p>During Covid blah blah blah (some explanation of helping each other)</p>
            <div>
            <button type="button" className="btn btn-dark theme-light">Sign Up</button>
            <button type="button" className="btn btn-light" onClick={clicked}>Log In</button>
            </div>
        </div>
    )
    function clicked(e) {
        // if (e.target.innerHTML == "Log In") {
        // }
        setMain(<div>changed?</div>)
    }
    return main;
}

export default IntroBox;
import Particles from 'react-particles-js';
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const size = useWindowSize()

  return (
    <div className="App">
      <Particles
        params={{
          "particles": {
              "number": {
                  "value": size.width*size.height/10000
              },
              "size": {
                  "value": 3
              }
          },
          "interactivity": {
              "events": {
                  onClick: {
                    enable: true,
                    mode: "push",
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse",
                  },
              }
          },
      }} />
      <div class="title-page-centre">
        <h1 id="main-title">Let's Study Together!</h1>
        <p>During Covid blah blah blah (some explanation of helping each other)</p>
        <div>
          <button type="button" class="btn btn-dark theme-light">Sign Up</button>
          <button type="button" class="btn btn-light">Log In</button>
        </div>
      </div>
    </div>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return windowSize;
}

export default App;

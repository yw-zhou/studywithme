import Particles from 'react-particles-js';
import { useState, useEffect } from 'react';
import './App.css';
import IntroBox from './IntroBox.js'
import { Route, BrowserRouter } from "react-router-dom";
import Main from './Main/Main'
// import LogIn from './LogIn'

function App() {
  const size = useWindowSize()
  
  return (
    <BrowserRouter>
      <div className="App">
        <Particles
          className = "position-absolute"
          width='100%'
          height='100%'
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
        <Route path='/loggin' render={(props) => (<IntroBox alert={sendAlert} />)} />
        <Route path='/' component={Main} />
      </div>
    </BrowserRouter>
  );
  
}

function sendAlert(alert) {
  console.log("ALEERTT")
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

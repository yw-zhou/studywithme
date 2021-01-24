import Particles from 'react-particles-js';
import { useState, useEffect } from 'react';
import './App.css';
import IntroBox from './IntroBox.js'

function App() {
  const size = useWindowSize()
  const [main, setMain] = useState(
        <div>
            <h1 id="main-title">Let's Study Together!</h1>
            <p>During Covid blah blah blah (some explanation of helping each other)</p>
            <div>
            <button type="button" className="btn btn-dark theme-light mx-2">Sign Up</button>
            <button type="button" className="btn btn-light mx-2" onClick={clicked}>Log In</button>
            </div>
        </div>
  )
  function clicked(e) {
    setMain(
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-2 text-muted">LOG IN</h5>
          <label for="email" className="input-label">Email</label>
          <div className="input-group mb-1">
            <input type="text" className="form-control" id="email" aria-label="Email" aria-describedby="basic-addon2"/>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <label for="password" className="input-label">Password</label>
            <button type="button" className="btn btn-link">Forgot Password?</button>
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control" id="inputPassword"/>
          </div>
          <button type="button" class="btn btn-dark theme-light w-100 mx-0 mb-3">Sign In</button>
          <div className="card">
            <div className="card-body input-label p-1 d-flex justify-content-center align-items-center">
              <p className="m-0">New to Study With Me?</p>
              <button type="button" className="btn btn-link">Create an Account</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
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
      <div className="title-page-centre">
        {main}
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

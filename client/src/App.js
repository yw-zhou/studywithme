import Particles from 'react-particles-js';
import { useState, useEffect } from 'react';
import './App.css';
import IntroBox from './IntroBox.js'
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Main from './Main/Main'
// import LogIn from './LogIn'

function App() {
  const size = useWindowSize()
  // let userInfo = null

  // const [userInfo, setUserInfo] = useState(null);

  
  function handleSubmit(data, passwordInput) {
    if (!data.length || data[0].password !== passwordInput) {
        console.log("allerrertt")
        return
    }
    // setUserInfo(data[0])
    window.location.href = "/"
  }
  
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
        {/* <div class="alert alert-danger" role="alert">
          Username or Password Incorrect
        </div> */}
        <Switch>
          <Route path='/loggin' render={(props) => (<IntroBox submit={handleSubmit} />)} />
          <Route exact path='/' component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
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

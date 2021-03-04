import React, { Component } from "react";
import UserInfo from "./UserInfo"
import "./main.css"

// Think about how to pass user credentials securely to this site

class Main extends Component {
  state = {
    //mock info for now
    username: 'yiweizhou123.com'
  }

  componentDidMount() {

  }
  render() {
    return (<div className="vh-100">
      <div className="side-info">
        <UserInfo/>
      </div>
    </div>);
  }

}

export default Main
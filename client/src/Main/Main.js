import React, { Component } from "react";
import UserInfo from "./UserInfo"
import "./main.css"

// Think about how to pass user credentials securely to this site

class Main extends Component {
  state = {
    //mock info for now
    username: 'yiweizhou123@gmail.com'
  }

  componentDidMount() {
    // console.log(this.props.user)
  }
  render() {
    return (<div className="vh-100 w-100">
      <div className="side-info bg-dark">
        <UserInfo email={this.state.username}/>
      </div>
    </div>);
  }

}

export default Main
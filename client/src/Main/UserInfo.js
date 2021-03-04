import React, { Component } from "react";
import ProfilePic from "./MockPic.jpg"

//Todos:
// Hashing for security for users to contact db
// Think about how to pass user credentials securely to this site
// Think about how to create a table using blobs!
// think about how users can upload photos to db

class UserInfo extends Component {

  componentDidMount() {
    
  }

  render() {
    return (<div>
      <img className="w-50 m-5" id="profilePic" src={ProfilePic} alt="profile pic" />
      
    </div>);
  }

}

export default UserInfo
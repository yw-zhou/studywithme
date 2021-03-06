import React, { Component } from "react";
import ProfilePic from "./MockPic.jpg"
import axios from 'axios'

//Todos:
// Hashing for security for users to contact db
// Think about how to pass user credentials securely to this site
// Think about how to create a table using blobs!
// think about how users can upload photos to db

class UserInfo extends Component {
  state = {
    groups:[]
  }

  componentDidMount() {
    axios.get("http://localhost:9000/createUser?email=" + this.props.email).then(res => {
      console.log(res)
      // if (!res.data.length) {
      //   //maybe return something telling them they did not log in? or something went wrong...
      //   window.location.href = "/loggin"
      // }
      this.setState({userData:res.data[0]})
    })
    axios.get("http://localhost:9000/group/getGroups?user=" + this.props.email).then(res => {
      this.setState({groups:res.data})
    })
  }

  render() {
    if (!this.state.userData) return null
    return (<div>
      <img className="w-50 mx-5 mt-5 mb-4" id="profilePic" src={ProfilePic} alt="profile pic" />
      <div className="mx-2 userinfo">
        <h5>{this.state.userData.name}</h5>
        <p>{this.state.userData.intro}</p>
      </div>
      <div>
        <h3 className="light-purple">Groups</h3>
        <div className='light-purple-background rounded mx-3'>
          {this.state.groups.map((group) => (
            <li>{group.groupName}</li>
          ))}
        </div>
      </div>
      
    </div>);
  }

}

export default UserInfo
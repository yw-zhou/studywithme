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
    return (<div className='px-3'>
      <img className="w-50 mt-5 mb-4" id="profilePic" src={ProfilePic} alt="profile pic" />
      <div className="userinfo">
        <h5>{this.state.userData.name}</h5>
        <p>{this.state.userData.intro}</p>
      </div>
      <div className='groups'>
        <h3 className="light-purple">Groups</h3>
        <div className='light-purple-background rounded py-2'>
          {this.state.groups.map((group) => (
            <button type="button" class="btn"><li>{group.groupName}</li></button>
          ))}
        </div>
      </div>
      
    </div>);
  }

}

export default UserInfo
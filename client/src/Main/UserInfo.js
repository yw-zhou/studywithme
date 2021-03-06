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
      // this.setState({groups:res.data})
    })
  }

  render() {
    if (!this.state.userData) return null

    let searchBar = null
    if (this.state.showSearch || !this.state.groups.length) {
      searchBar = (
        <div class="input-group mb-3">
          <input type="text" className="form-control light-purple" placeholder="Group Code" aria-label="Group Code" aria-describedby="button-addon2"/>
          <button className="btn btn-outline-secondary light-purple" type="button" id="button-addon2"><i class="bi bi-search"></i></button>
        </div>
      )
    }

    return (<div className='px-3'>
      <img className="w-50 mt-5 mb-4" id="profilePic" src={ProfilePic} alt="profile pic" />
      <div className="userinfo">
        <h5>{this.state.userData.name}</h5>
        <p>{this.state.userData.intro}</p>
      </div>
      <div className='groups'>
        <div className="d-flex align-items-center">
          <h3 className="light-purple">Groups</h3>
          <span className="d-inline-block ms-auto" tabindex="0" data-bs-toggle="tooltip" title="Add Group" data-bs-animation='true'>
            <button type="button" class="btn pt-0 pb-1 px-1"><i className="bi bi-plus-circle light-purple"></i></button>
          </span>
          <span className="d-inline-block" tabindex="0" data-bs-toggle="tooltip" title="Explore Public Groups" data-bs-animation='true'>
            <button type="button" class="btn pt-0 pb-1 px-1"><i class="bi bi-compass light-purple"></i></button>
          </span>
        </div>
        {searchBar}
        <div className='light-purple-background rounded py-2'>
          {this.state.groups.map((group) => (
            <button type="button" class="btn"><li>{group.groupName}</li></button>
          ))}
          <p className="m-3">{(this.state.groups.length? "": 'No Groups at the moment, Join above!')}</p>
        </div>
      </div>
      
    </div>);
  }

}

export default UserInfo
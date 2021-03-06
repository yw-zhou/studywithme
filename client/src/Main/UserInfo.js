import React, { Component } from "react";
import ProfilePic from "./MockPic.jpg";
import axios from "axios";

//Todos:
// Hashing for security for users to contact db
// Think about how to pass user credentials securely to this site
// Think about how to create a table using blobs!
// think about how users can upload photos to db

class UserInfo extends Component {
  state = {
    groups: [],
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/createUser?email=" + this.props.email)
      .then((res) => {
        console.log(res);
        // if (!res.data.length) {
        //   //maybe return something telling them they did not log in? or something went wrong...
        //   window.location.href = "/loggin"
        // }
        this.setState({ userData: res.data[0] });
      });
    axios
      .get(`http://localhost:9000/group/getGroups?user=${this.props.email}`)
      .then((res) => {
        this.setState({
          groups: res.data,
          selectedGroup: res.data[0].groupId,
        });
        this.props.selectGroup(res.data[0].groupId);
        console.log("groups!", res.data);
      });
  }

  handleGroupSelect(e) {
    this.setState({ selectedGroup: e.target.id });
    this.props.selectGroup(e.target.id);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  updateAccountInfo() {
    const updatedUser = {
      id: this.state.userData.email,
      intro: this.state.intro,
      name: this.state.name,
    };
    axios
      .post(
        `http://localhost:9000/http://localhost:9000/createUser/update`,
        updatedUser
      )
      .then(this.setState({ editUser: false }));
  }

  render() {
    if (!this.state.userData) return null;
    // console.log(this.state.selectedGroup);

    return (
      <div className="px-3">
        <img
          className="w-50 mt-5 mb-4"
          id="profilePic"
          src={ProfilePic}
          alt="profile pic"
        />
        {this.state.editUser && (
          <div>
            <label className="input-label text-secondary">Name/Alias</label>
            <input
              type="text"
              className="form-control border-secondary text-info bg-light"
              aria-label="Meeting Name"
              aria-describedby="button-addon2"
              value={this.state.userData.name}
              id="userName"
              onChange={this.handleChange.bind(this)}
            />
            <textarea
              className="form-control border-secondary text-info bg-light mt-3"
              placeholder="Introduction (Optionional)"
              id="intro"
              onChange={this.handleChange.bind(this)}
            ></textarea>

            <button
              type="button"
              className="float-left px-0 font-size-14 btn btn-link text-secondary"
            >
              Reset Password
            </button>
            <button
              onClick={this.updateAccountInfo}
              type="submit"
              className="btn btn-outline-secondary w-25 float-right mt-2"
            >
              Save
            </button>
          </div>
        )}

        {!this.state.editUser && (
          <div>
            <div className="userinfo">
              <div className="d-flex align-items-center">
                <i
                  onClick={() => this.setState({ editUser: true })}
                  className="bi bi-gear-fill mx-1"
                ></i>
                <h5 className="m-0 username">{this.state.userData.name}</h5>
              </div>
              <p>{this.state.userData.intro}</p>
            </div>
            <div className="groups">
              <div className="d-flex align-items-center">
                <h3 className="text-secondary">Groups</h3>
                <span
                  className="d-inline-block ms-auto"
                  data-bs-toggle="tooltip"
                  title="Add Group"
                  data-bs-animation="true"
                >
                  <button
                    type="button"
                    className="btn pt-0 pb-1 px-1"
                    onClick={this.props.createNewGroup}
                  >
                    <i className="bi bi-plus-circle text-secondary"></i>
                  </button>
                </span>
                <span
                  className="d-inline-block"
                  data-bs-toggle="tooltip"
                  title="Explore Public Groups"
                  data-bs-animation="true"
                >
                  <button type="button" className="btn pt-0 pb-1 px-1">
                    <i className="bi bi-compass text-secondary"></i>
                  </button>
                </span>
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-secondary text-info bg-light"
                  placeholder="Group Code"
                  aria-label="Group Code"
                  aria-describedby="button-addon2"
                  id="SearchCode"
                  onChange={this.handleChange.bind(this)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  onClick={() =>
                    this.props.handleSearchCode(this.state.searchCode)
                  }
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
              <div className="rounded d-flex flex-column">
                {this.state.groups.map((group) => (
                  <button
                    type="button"
                    className={`noFocus btn text-info ${
                      this.state.selectedGroup === group.groupId
                        ? "btn-secondary"
                        : ""
                    }`}
                    onClick={this.handleGroupSelect.bind(this)}
                    id={group.groupId}
                    key={group.groupId}
                  >
                    <li id={group.groupId}>{group.groupName}</li>
                  </button>
                ))}
                {this.state.groups.length ? null : (
                  <p className="m-3">'No Groups at the moment, Join above!'</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserInfo;

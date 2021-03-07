import React, { Component } from "react";
import UserInfo from "./UserInfo";
import "./main.css";
import CreateGroup from "./CreateGroup";

// Think about how to pass user credentials securely to this site

class Main extends Component {
  state = {
    //mock info for now
    username: "yiweizhou123@gmail.com",
  };

  componentDidMount() {
    // console.log(this.props.user)
  }
  toggleRenderGroup() {
    this.setState({ renderGroup: !this.state.renderGroup });
  }
  render() {
    return (
      <div className="vh-100 w-100 d-flex align-items-center">
        <div className="side-info bg-dark">
          <UserInfo
            email={this.state.username}
            createNewGroup={this.toggleRenderGroup.bind(this)}
          />
        </div>
        <div className="w-100">
          {this.state.renderGroup ? (
            <CreateGroup
              user={this.state.username}
              toggleRender={this.toggleRenderGroup.bind(this)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Main;

import React, { Component } from "react";
import UserInfo from "./UserInfo";
import "./main.css";
import CreateGroupModal from "./CreateGroupModal";
import GroupInfoModal from "./ViewGroupInfo";
import Calendar from "./Calendar";
import axios from "axios";

// Think about how to pass user credentials securely to this site

class Main extends Component {
  state = {
    //mock info for now
    username: "yiweizhou123@gmail.com",
  };

  componentDidMount() {
    // console.log(this.props.user)
  }
  toggleRenderCreateGroupModal() {
    this.setState({
      renderGroupModal: !this.state.renderGroupModal,
      groupSettingsData: null,
    });
  }
  handleSearchCode(searchCode) {
    axios
      .get(`http://localhost:9000/group/getGroupInfo?groupId=${searchCode}`)
      .then((res) =>
        this.setState({
          groupSettingsData: res.data[0],
          renderGroupModal: false,
        })
      );
  }
  addAssignment() {
    var assignment = {
      user: this.state.username,
      ...this.state.groupSettingsData,
    };
    axios
      .post("http://localhost:9000/group/createAssignment", { assignment })
      .then((res) => {
        console.log("assignment results", res);
        // this.props.toggleRender();
      });
  }
  loadCalendar(groupId) {
    // console.log(groupId);
    this.setState({ selectedGroupId: groupId, renderCalendar: true });
  }
  render() {
    return (
      <div className="vh-100 w-100 d-flex align-items-center">
        <div className="side-info bg-dark">
          <UserInfo
            email={this.state.username}
            createNewGroup={this.toggleRenderCreateGroupModal.bind(this)}
            handleSearchCode={this.handleSearchCode.bind(this)}
            selectGroup={this.loadCalendar.bind(this)}
          />
        </div>
        <div className="w-100 h-100">
          <div
            className={`m-auto bg-dark card border-0 ${
              this.state.renderCalendar ? "calendar-modal" : "create-group-form"
            }`}
          >
            {this.state.renderGroupModal && (
              <CreateGroupModal
                user={this.state.username}
                toggleRender={this.toggleRenderCreateGroupModal.bind(this)}
              />
            )}
            {this.state.groupSettingsData && (
              <GroupInfoModal
                data={this.state.groupSettingsData}
                addAssignment={this.addAssignment.bind(this)}
              />
            )}
            {this.state.renderCalendar && (
              <Calendar
                groupId={this.state.selectedGroupId}
                key={this.state.selectedGroupId}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;

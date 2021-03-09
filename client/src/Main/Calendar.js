import React, { Component } from "react";
import "./main.css";
import axios from "axios";

// Think about how to pass user credentials securely to this site

class Calendar extends Component {
  state = {};

  componentDidMount() {
    axios
      .get(
        `http://localhost:9000/group/getSchedules?groupId=${this.props.groupId}`
      )
      .then((res) => console.log(res));
  }

  render() {
    return <div>Calendar</div>;
  }
}

export default Calendar;

import React, { Component } from "react";
import "./main.css";
import axios from "axios";
import { ScrollSync, ScrollSyncPane } from "react-scroll-sync";

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

  createTable() {
    let week = [];
    for (let i = 0; i < 7; i++) {
      let day = [];
      for (let j = 0; j < 48; j++) {
        day.push(<div className="border border-secondary schedule-cell"></div>);
      }
      week.push(
        <ScrollSyncPane>
          <div className="flex-fill overflow-auto">{day}</div>
        </ScrollSyncPane>
      );
    }
    return week;
  }

  render() {
    return (
      <ScrollSync>
        <div className="h-100 d-flex">{this.createTable()}</div>
      </ScrollSync>
    );
  }
}

export default Calendar;

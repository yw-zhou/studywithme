import React, { Component } from "react";
import "./main.css";
import axios from "axios";
var moment = require("moment");

// Think about how to pass user credentials securely to this site

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.tableContainer = React.createRef();
  }
  state = {};

  componentDidMount() {
    axios
      .get(
        `http://localhost:9000/group/getSchedules?groupId=${this.props.groupId}`
      )
      .then((res) => console.log(res));
    const start_date = moment().startOf("week");
    console.log(start_date);
    this.setState({ start_date: start_date });
  }

  createTable() {
    let week = [];
    const computed_width = this.tableContainer.current.offsetWidth / 7;
    let currday = this.state.start_date.add(10, "hours");
    for (let i = 0; i < 7; i++) {
      let day = [
        <div
          className="border border-secondary schedule-cell fixed-top-date pt-3"
          style={{ width: computed_width }}
        >
          <h4 className="m-0">{currday.format("ddd")}</h4>
          <p>{currday.format("MMM DD")}</p>
        </div>,
      ];
      for (let j = 0; j < 48; j++) {
        day.push(
          <div className="border border-secondary schedule-cell">
            {i === 0 && <p className="time-label">{currday.format("HH:mm")}</p>}
          </div>
        );
        currday.add(30, "minutes");
        if (currday.format("HH:mm") === "00:00") currday.subtract(1, "days");
      }
      currday.add(1, "days");
      week.push(<div style={{ width: computed_width }}>{day}</div>);
    }
    return week;
  }

  render() {
    return (
      <div className="h-100">
        <div
          className="d-flex overflow-auto table-container"
          ref={this.tableContainer}
        >
          {this.state.start_date !== undefined && this.createTable()}
        </div>
      </div>
    );
  }
}

export default Calendar;

import React, { Component } from "react";
import "./main.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import ScheduleModal from "./ScheduleModal";
var moment = require("moment");

// Think about how to pass user credentials securely to this site

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.tableContainer = React.createRef();
  }
  state = {
    //mock members
    members: {
      "yiweizhou123@gmail.com": {
        pic: null,
        initial: "YZ",
        name: "Yi Wei Zhou",
      },
    },
  };

  componentDidMount() {
    this.getSchedules();
    const start_date = moment().startOf("week");
    this.setState({ start_date: start_date });
  }

  getSchedules() {
    axios
      .get(
        `http://localhost:9000/group/getSchedules?groupId=${this.props.groupId}`
      )
      .then((res) => {
        this.setState({ schedules: res.data });
      });
  }

  assignSchedule(e, pnum) {
    //what about when schedule Id already exists???
    // const schedule = {
    //   groupId: this.props.groupId,
    //   user: this.props.userId,
    //   date: e.target.id,
    //   scheduleId: scheduleId,
    // };
    if (!pnum) {
      this.setState({
        ScheduleModal: ScheduleModal(),
      });
    }
    // axios
    //   .post(`http://localhost:9000/group/createSchedule`, { schedule })
    //   .then((res) => {
    //     console.log("setting schedules", res);
    //     this.getSchedules();
    //   });
  }

  viewScheduleSettings(e) {
    axios
      .get(
        `http://localhost:9000/group/getScheduleSettings?scheduleId=${e.target.id}`
      )
      .then((res) => {
        this.setState({ scheduleSettings: res.data });
      });
  }

  createTable() {
    let week = [];
    const computed_width = this.tableContainer.current.offsetWidth / 7;
    let currday = moment(this.state.start_date).add(10, "hours");
    let scheduleIndex = 0;
    for (let i = 0; i < 7; i++) {
      let day = [
        <div
          key={`day-header-${i}`}
          className="border border-secondary schedule-cell fixed-top-date pt-3"
          style={{ width: computed_width }}
        >
          <h4 className="m-0">{currday.format("ddd")}</h4>
          <p>{currday.format("MMM DD")}</p>
        </div>,
      ];
      let scheduleId;
      for (let j = 0; j < 48; j++) {
        let participants = [];
        if (this.state.schedules[scheduleIndex] === null)
          console.log(this.state.schedules[0]);
        while (
          this.state.schedules[scheduleIndex] &&
          currday.isSame(this.state.schedules[scheduleIndex].datetime)
        ) {
          participants.push(this.state.schedules[scheduleIndex].user);
          scheduleId = this.state.schedules[scheduleIndex].scheduleId;
          scheduleIndex++;
        }
        let renderParticipants = [];
        for (let p = 0; p < participants.length; p++) {
          if (!this.state.members[participants[p]].pic) {
            renderParticipants.push(
              <div
                className="rounded-circle member"
                key={`${scheduleId}-${
                  this.state.members[participants[p]].userId
                }`}
                style={{ backgroundColor: "#FFA142" }}
              >
                {this.state.members[participants[p]].initial}
                {/* figure out how to have the name show for only the modal section... */}
              </div>
            );
          }
        }
        day.push(
          <div
            className={`border border-secondary schedule-cell ${
              this.state.hover_cell === String(i * 48 + j) ? "hovering" : ""
            }`}
            id={i * 48 + j}
            key={`cell-${i * 48 + j}`}
            onMouseEnter={(e) => this.setState({ hover_cell: e.target.id })}
            onMouseLeave={() => this.setState({ hover_cell: null })}
          >
            {i === 0 && <p className="time-label">{currday.format("HH:mm")}</p>}
            {this.state.hover_cell === String(i * 48 + j) && (
              <div className="pt-4 z-10 alpha-dark-bg">
                <i
                  onClick={this.viewScheduleSettings.bind(this)}
                  className="bi bi-gear-fill mx-1"
                  id={scheduleId}
                ></i>
                <i
                  onClick={(e) =>
                    this.assignSchedule(e, renderParticipants.length)
                  }
                  id={currday.format("YYYY-MM-DD HH:mm:SS")}
                  className="bi bi-person-plus-fill mx-1"
                ></i>
              </div>
            )}
            <div className="participants d-flex justify-content-center">
              {renderParticipants}
            </div>
          </div>
        );
        currday.add(30, "minutes");
        if (currday.format("HH:mm") === "00:00") currday.subtract(1, "days");
      }
      currday.add(1, "days");
      week.push(
        <div key={`day-${i}`} style={{ width: computed_width }}>
          {day}
        </div>
      );
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
          {this.state.start_date !== undefined &&
            this.state.schedules &&
            this.createTable()}
        </div>
        {this.state.ScheduleModal}
      </div>
    );
  }
}

export default Calendar;

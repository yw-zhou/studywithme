import { useState } from "react";

function ScheduleModal(props) {
  var title = "";
  // var passwordInvalid = false;
  // const [passwordInvalid, setpasswordInvalid] = useState(false);
  function handleChange(e) {
    title = e.target.value;
  }
  // function join() {
  //   if (password !== props.data.password) {
  //     setpasswordInvalid(true);
  //     console.log(passwordInvalid);
  //     return;
  //   }
  //   props.addAssignment();
  // }
  return (
    <div className="card-body bg-secondary rounded m-auto schedule-modal">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control border-secondary text-light bg-info"
          placeholder="Meeting Name (Optional)"
          aria-label="Meeting Name"
          aria-describedby="button-addon2"
          onChange={handleChange.bind(this)}
        />
      </div>
      {/* https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate */}
      <p>http://samplemockzoomurl.com</p>
      <ul className="member-list overflow-auto"></ul>
      <button
        className={`btn btn-info mx-2 float-right`}
        type="button"
        id="button-addon2"
        // onClick={join}
      >
        {/* dynamic with create, join, leave options */}
        Create
      </button>
      <button
        className={`btn btn-light mx-2 float-right`}
        type="button"
        id="button-addon2"
        // onClick={join}
      >
        Cancel
      </button>
    </div>
  );
}

export default ScheduleModal;

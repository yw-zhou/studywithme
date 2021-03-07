import { useState } from "react";

function GroupInfoModal(props) {
  var password = "";
  // var passwordInvalid = false;
  const [passwordInvalid, setpasswordInvalid] = useState(false);
  function handleChange(e) {
    password = e.target.value;
  }
  function join() {
    if (password !== props.data.password) {
      setpasswordInvalid(true);
      console.log(passwordInvalid);
      return;
    }
    props.addAssignment();
  }
  return (
    <div className="card-body">
      <h5 className="card-title mb-2 text-info">{props.data.groupName}</h5>
      <p>{props.data.description}</p>
      <div className="input-group mb-3 group-password-input float-right d-flex justify-content-end">
        {!props.data.isPublic && (
          <input
            type="text"
            className="form-control border-secondary text-info bg-light"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="button-addon2"
            onChange={handleChange.bind(this)}
            required
          />
        )}
        {/* currently not displaying for some reason (even though in HTML) */}
        {passwordInvalid && (
          <div className="invalid-feedback">Please choose a username.</div>
        )}
        <button
          className={`btn btn-secondary ${props.data.isPublic && "w-50"}`}
          type="button"
          id="button-addon2"
          onClick={join}
        >
          Join
        </button>
      </div>
    </div>
  );
}

export default GroupInfoModal;

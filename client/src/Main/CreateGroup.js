import React, { Component } from "react";
import "./main.css"
const cryptoRandomString = require('crypto-random-string');

// Think about how to pass user credentials securely to this site

class CreateGroup extends Component {
  state = {
    isPublic: false
  }
  componentDidMount() {
    this.setState({groupCode: cryptoRandomString({length: 6, type: 'distinguishable'})})
  }
  handlePublic(event) {
    this.setState({ isPublic: !this.state.isPublic })
  }
  render() {
    return (
      <div className="mx-auto bg-dark create-group-form card">
        <div className="card-body">
          <h5 className="card-title mb-2 text-info">Create New Group</h5>
          <label className="input-label text-info">Group Name</label>
          <div className="input-group mb-1">
            <input type="text" className="form-control bg-light border-secondary" id="name" aria-label="name" aria-describedby="basic-addon2" />
             <div className='custom-control custom-switch ml-4 mr-1'>
              <input
                type='checkbox'
                className='custom-control-input text-secondary'
                id='customSwitches'
                onChange={this.handlePublic.bind(this)}
                readOnly
              />
              <label className='custom-control-label mt-1 small-size-label' htmlFor='customSwitches'>
                Public
              </label>   
            </div>
          </div>
          <div className="form-floating my-3">
            <textarea className="form-control bg-light border-secondary" placeholder="Description (Optionional)" id="floatingTextarea"></textarea>
          </div>
          {this.state.isPublic &&
            <div>
              <label className="input-label text-info">Password (Optional)</label>
              <div className="input-group mb-1">
                <input type="text" className="form-control bg-light border-secondary" id="name" aria-label="name" aria-describedby="basic-addon2" />
              </div>
              <label className="input-label w-100 text-start mt-2 text-info">Group Code:
                <span className="text-secondary mx-2">{this.state.groupCode}</span>
                <span className="small-size-label">(Send this code to invite others to join your group!)</span>
              </label>
            </div>
          }
          <button className="btn btn-light w-25 mx-2" >Cancel</button>
          <button type="submit" className="btn btn-secondary w-25 mx-2" >Create</button>
        </div>
      </div>);
  }

}

export default CreateGroup
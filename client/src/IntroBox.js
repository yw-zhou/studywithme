import React, { Component } from "react";

class IntroBox extends Component {
    state = {
        mode: 'title'
    }
    submit(e) {
        if (this.state.mode === 'SIGN UP') {
            if (this.state.password !== this.state.verify) {
                return
            }
            fetch("http://localhost:9000/testAPI").then(res => console.log(res.text()))
        }
        
    }
    handlechange(e) {
        this.setState({[e.target.id]: e.target.value})
    }
    render() {
        let main = (
            <div>
                <h1 id="main-title">Let's Study Together!</h1>
                <p>During Covid blah blah blah (some explanation of helping each other)</p>
                <div>
                    <button type="button" className="btn btn-dark theme-light mx-2" onClick={() => this.setState({ mode: 'SIGN UP' })} >Sign Up</button>
                    <button type="button" className="btn btn-light mx-2" onClick={() => this.setState({ mode: 'LOG IN' })}>Log In</button>
                </div>
            </div>
        )
        if (this.state.mode !== 'title') {
            main = (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-2 text-muted">{this.state.mode}</h5>
                        <label for="email" className="input-label">Email</label>
                        <div className="input-group mb-1">
                            <input onChange={this.handlechange.bind(this)} type="text" className="form-control" id="email" aria-label="Email" aria-describedby="basic-addon2" />
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <label for="password" className="input-label">Password</label>
                            {this.state.mode === 'LOG IN' ? <button type="button" className="btn btn-link">Forgot Password?</button> : null}
                        </div>
                        <div className="input-group mb-1">
                            <input onChange={this.handlechange.bind(this)} type="password" className="form-control" id="password" />
                        </div>
                        {this.state.mode === 'SIGN UP' ?
                            (<div>
                                <label for="verify" className="input-label m-0">Verify Password</label>
                                <div className="input-group mb-1">
                                    <input onChange={this.handlechange.bind(this)} type="verify" className="form-control" id="verify" />
                                </div>
                            </div>) : null
                        }
                        <button type="submit" class="btn btn-dark theme-light w-100 mx-0 my-3" onClick={this.submit.bind(this)}>{this.state.mode === 'LOG IN' ? 'Sign In' : 'Create Account'}</button>
                        {this.state.mode === 'LOG IN' ?
                            (<div className="card">
                                <div className="card-body input-label p-1 d-flex justify-content-center align-items-center">
                                    <p className="m-0">New to Study With Me?</p>
                                    <button type="button" className="btn btn-link" onClick={() => this.setState({ mode: 'SIGN UP' })}>Create an Account</button>
                                </div>
                            </div>) : null
                        }
                    </div>
                </div>
            )
        }
        return (<div className="title-page-centre">{main}</div>)        
    }
}

export default IntroBox;
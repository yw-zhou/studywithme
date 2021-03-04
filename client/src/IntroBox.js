import React, { Component } from "react";
import axios from 'axios';

class IntroBox extends Component {
    state = {
        mode: 'title'
    }
    submit(e) {
        if (this.state.mode === 'Sign Up') {
            if (this.state.password !== this.state.verify) {
                return
            }
            const user = { email: this.state.email, password: this.state.password }
            axios.post("http://localhost:9000/createUser", {user}).then(res => console.log(res))
            // axios.get("http://localhost:9000/testAPI").then(res => console.log(res))
        } else if (this.state.mode === 'Log In') {
            axios.get("http://localhost:9000/createUser?email=" + this.state.email).then(res => {
                this.props.submit(res.data, this.state.password)
            })
        }
        
    }
    handlechange(e) {
        this.setState({[e.target.id]: e.target.value})
    }
    toggle() {
        let mode = (this.state.mode === 'Sign Up') ? 'Log In' : 'Sign Up';
        this.setState({mode: mode})
    }
    submit_messages = {
        'Sign Up': 'Create Account',
        'Log In': 'Sign In',
        'Password Reset': 'Send Email'
    }
    render() {
        let main = (
            <div>
                <h1 id="main-title">Let's Study Together!</h1>
                <p>During Covid blah blah blah (some explanation of helping each other)</p>
                <div>
                    <button type="button" className="btn btn-dark theme-light mx-2" onClick={() => this.setState({ mode: 'Sign Up' })} >Sign Up</button>
                    <button type="button" className="btn btn-light mx-2" onClick={() => this.setState({ mode: 'Log In' })}>Log In</button>
                </div>
            </div>
        )
        if (this.state.mode !== 'title') {
            main = (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-2 text-muted">{this.state.mode}</h5>
                        <label className="input-label">Email</label>
                        <div className="input-group mb-1">
                            <input onChange={this.handlechange.bind(this)} type="text" className="form-control" id="email" aria-label="Email" aria-describedby="basic-addon2" />
                        </div>
                        {this.state.mode !== 'Password Reset' ?
                            (<div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label className="input-label">Password</label>
                                    {this.state.mode === 'Log In' ? <button type="button" className="btn btn-link" onClick={()=>{this.setState({mode:'Password Reset'})}}>Forgot Password?</button> : null}
                                </div>
                                <div className="input-group mb-1">
                                    <input onChange={this.handlechange.bind(this)} type="password" className="form-control" id="password" />
                                </div>
                            </div>) :
                            (<p class="font-weight-light text-left text-muted" style={{fontSize:14}}>You will receive an email with a password reset link.</p>)
                        }
                        {this.state.mode === 'Sign Up' ?
                            (<div>
                                <label className="input-label m-0">Verify Password</label>
                                <div className="input-group mb-1">
                                    <input onChange={this.handlechange.bind(this)} type="password" className="form-control" id="verify" />
                                </div>
                            </div>) : null
                        }
                        <button type="submit" className="btn btn-dark theme-light w-100 mx-0 my-3" onClick={this.submit.bind(this)}>{this.submit_messages[this.state.mode]}</button>
                        
                        {this.state.mode !== 'Password Reset' ?
                            (<div className="card">
                                <div className="card-body input-label p-1 d-flex justify-content-center align-items-center">
                                    <p className="m-0">{this.state.mode === 'Log In' ? 'New to Study With Me?' : 'Already have an account?'}</p>
                                    <button type="button" className="btn btn-link" onClick={this.toggle.bind(this)}>{this.state.mode === 'Log In' ? 'Create an Account' : 'Log in Here'}</button>
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
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            email : "",
            password : "",
            error : "",
            status : ""
        }
    }

    handleSubmit(event){
        event.preventDefault();
        
        axios.post('/api/users/login', {password : this.state.password, email : this.state.email}).then( response => {
            this.setState({status : response.data.message})
            if(!this.state.status){
                localStorage.setItem('id_token', response.data.token)
                this.props.setloggedIn(true)
                this.props.history.push('/')
            }
            }).catch( errors => {
                console.log(errors)
            }
            )
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    render() {
        return (
            <div>
                    <form style={{ marginLeft : "20rem", marginTop : "10rem", maxWidth: "25rem"} } onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="text" className="form-control email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="Enter your email" name="email" required/>
                            <div>{this.state.emailError}</div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input type="password" className="form-control password" value={this.state.password} onChange={this.handleChange} id="password" placeholder="Enter your Password" name="password" required/>
                            <div>{this.state.passwordError}</div>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Login</button><br/>
                        {this.state.status ? (<div className="alert alert-danger" role="alert">{this.state.status}</div>) : null }
                    </form>  
                    <div style={{ marginLeft : "20rem"}}>
                        <b>Don't have an account?</b>
                    <Link to="/register"> Register </Link>
                    <Link to="/forgotpass">Forgot Password</Link>
                    </div>
            </div>
        )
    }
}

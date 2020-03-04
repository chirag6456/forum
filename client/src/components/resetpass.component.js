import React, { Component } from 'react'
import axios from 'axios';

export default class ResetPassComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            status : "",
            newpassword : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        const token = this.props.match.params.id;
        axios.post(`/api/users/reset/${token}`, { password : this.state.newpassword}).then( response => {
            this.setState({status : response.data.message})
        })
        .catch( error => {
            console.log(error)
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }
    render() {
        return (
            <form style={{ marginLeft : "20rem", marginTop : "10rem", maxWidth: "25rem"} } onSubmit={this.handleSubmit}>
            
            <div className="form-group">
                <label htmlFor="newpassword">Password:</label>
                <input type="password" className="form-control password" value={this.state.newpassword} onChange={this.handleChange} id="newpassword" placeholder="Enter your Password" name="newpassword" required/>
                <div>{this.state.passwordError}</div>
            </div>
            
            <button type="submit" className="btn btn-primary">Reset Password</button><br/>
            {this.state.status ? (<div className="alert alert-primary" role="alert">{this.state.status}</div>) : null }
        </form>  
        )
    }
}

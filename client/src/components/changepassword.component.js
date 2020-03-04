import React, { Component } from 'react'
import axios from 'axios';
import decode from 'jwt-decode'
export default class ChangePasswordComponent extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            email : "",
            password : "",
            newpassword : "",
            passwordError : "",
            status : ""
        }
    }
    componentDidMount(){
        const data = decode(localStorage.getItem('id_token'))
        this.setState({
                        email : data.email
        }) 
    }
    handleSubmit(event){
        event.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password,
            newpassword : this.state.newpassword
        }
        axios.put('/api/users/changepass', data).then( response => {
            
            this.setState({ status : response.data.message})
           // this.props.history.push('/');
        }).catch( errors => {
            console.log(errors);
        });

        this.setState({
            password : "",
            newpassword : "",
            passwordError : "",
            error : "",
            status : ""
        })
        
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        return (
            <div>
                    <form style={{ marginLeft : "20rem", marginTop : "10rem", maxWidth: "25rem"} } onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">Old Password :</label>
                            <input type="password" className="form-control password" value={this.state.password} onChange={this.handleChange} id="password" placeholder="Enter your password" name="password" required/>
                            <div>{this.state.emailError}</div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input type="password" className="form-control password" value={this.state.newpassword} onChange={this.handleChange} id="password2" placeholder="Enter new Password" name="newpassword" required/>
                            <div>{this.state.passwordError}</div>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Login</button><br/>
                        {this.state.status ? (<div className="alert alert-primary" role="alert">{this.state.status}</div>) : null }
                    </form> 
            </div>
        )}
}

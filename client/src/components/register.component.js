import React, { Component } from 'react'
import axios from 'axios';

export default class RegisterComponent extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            username : "",
            email : "",
            password : "",
            password2 : "",
            nameError : "",
            emailError : "",
            passwordError : "",
            error : "",
            status : ""
        }
    }

    
    validate = () => {
        let nameError = "";
        let emailError = "";
        let passwordError = "";
        if( this.state.username.length < 5 ){
            nameError = "Username should be atleast 5 characters"
        }
        
        if( !(this.state.email.includes('@')  && this.state.email.includes('.')) ){
            emailError = "Please enter valid email"
        }
        if( !(this.state.password === this.state.password2)){
            passwordError = "Passwords must match"
        }
        if(nameError || emailError || passwordError){
            this.setState({nameError, emailError, passwordError});
            return false;
        }
        return true;
    }
    handleSubmit(event){
        event.preventDefault();
        const validInput = this.validate();
        const newUser = {
            username : this.state.username,
            email : this.state.email,
            password : this.state.password,
            password2 : this.state.password2
        }
        if(validInput){
        axios.post('/api/users/register', newUser).then( response => {
            this.setState({ status : response.data.message})
            
        }).catch( errors => {
            console.log(errors);
        });

        this.setState({
            username : "",
            email : "",
            password : "",
            password2 : "",
            nameError : "",
            emailError : "",
            passwordError : "",
            error : "",
            status : ""
        })
        }
        
        else{
            this.setState({error : 'Please correct errors'})
        }
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    render() {
        return (
            <div className="container h-100">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <form onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" className="form-control username" value={this.state.username} onChange={this.handleChange} id="username" placeholder="Enter your username" name="username" required/>
                                <div>{this.state.nameError}</div>
                            </div>

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

                            <div className="form-group">
                                <label htmlFor="password">Confirm Password:</label>
                                <input type="password" className="form-control password" value={this.state.password2} onChange={this.handleChange} id="password2" placeholder="Confirm your Password" name="password2" required/>
                            </div>
                            
                            <button type="submit" className="btn btn-primary btn-customized">Register</button><br/>
                            {this.state.error ? (<div className="alert alert-danger" role="alert">{this.state.error}</div>) : null }
                            
                            {this.state.status ? (<div className="alert alert-primary" role="alert">{this.state.status}</div>) : null }

            </form>
        </div>
    </div>
</div>
        )
    }
}

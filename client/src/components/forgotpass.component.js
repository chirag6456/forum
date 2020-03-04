import React, { Component } from 'react'
import axios from 'axios'
export default class ForgotPassComponent extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
           email : "",
           status : ""
        }
    }

    handleSubmit(event){
        event.preventDefault();
        axios.post('/api/users/forget', { email : this.state.email}).then( response => {
    
            this.setState({status : response.data.message})
        }).catch( error => {
            console.log(error);
        })
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
                            <input type="email" className="form-control email" value={this.state.email} onChange={this.handleChange} id="email" placeholder="Enter your Email" name="email" required/>
                            <div>{this.state.emailError}</div>
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>

                        {this.state.status? (<div><div className="alert alert-primary" role="alert">{this.state.status}</div></div>):null}
                    </form>  
                    
            </div>
        )
    }
}

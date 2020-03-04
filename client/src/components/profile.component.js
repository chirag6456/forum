import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import decode from 'jwt-decode'

export default class ProfileComponent extends Component {
    
    state = { 
        id : "",
        name : "",
        email : ""
    }
    
    componentDidMount(){
       const data = decode(localStorage.getItem('id_token'))
        this.setState({id : data.id,
                        name : data.username,
                        email : data.email
        })   

    }
    render() {
        return (
            <div>
               <div className="card" style={{ width: "18rem", marginTop : "5rem", marginLeft : "25rem"}}>
                <img src="https://via.placeholder.com/150" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Profile</h5>
                        <div>
                        ID : {this.state.id} <br/>
                        Name : {this.state.name} <br/>
                        Email : {this.state.email}
                        </div>
                        
                        <Link to="/changepassword">Change Password</Link>
                    </div>
                </div> 
            </div>
        )
    }
}

import React, { Component } from 'react'
import axios from 'axios'

export default class VerifyUserComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            status : ""
        }
    }
    componentDidMount(){
        axios.post(`/api/users/verify/${this.props.match.params.id}`).then( response => {
            this.setState({status : response.data.message})
        }).catch( error => {
            console.log(error)
        });
    }
    
    render() {
        return (
            <div>
                {this.state.status ? (<div className="alert alert-success" role="alert">{this.state.status}</div>) : null }
            </div>
        )
    }
}

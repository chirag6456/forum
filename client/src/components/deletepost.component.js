import React, { Component } from 'react'
import axios from 'axios'
export default class DeletePostComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            status : ""
        }
    }
    componentDidMount(){
        const config = {
            headers : { Authorization : `Bearer ${localStorage.getItem('id_token')}`}
        }
        
        axios.delete(`/api/posts/delete/${this.props.match.params.id}`, config).then( response => {
        
            this.setState({status : response.data.message})
        }).catch( error => {
            console.log(error);
        })
    }
    render() {
        return (
            <div style={{maxWidth: "15rem"}}>
                {this.state.status ? (<div className="alert alert-danger" role="alert">{this.state.status}</div>) : null }
            </div>
        )
    }
}

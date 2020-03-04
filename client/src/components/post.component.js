import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import decode from 'jwt-decode'
export default class PostComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            posttitle : "",
            postcontent : ""
        }
    }
    componentDidMount(){
        axios.get(`/api/posts/${this.props.match.params.id}`).then( response => {
            console.log(decode(localStorage.getItem('id_token')))
            this.setState({posttitle : response.data.posttitle, postcontent : response.data.postcontent})
        })
    }
    render() {
        return (
            <div style={{marginTop: "5rem"}}>
                <h3>{this.state.posttitle}</h3>
                <h4>Author: {decode(localStorage.getItem('id_token')).username}</h4>
                <p>{this.state.postcontent}</p>

                <Link to={"/updatepost/"+ this.props.match.params.id} className="btn btn-info">Update Post</Link>                
                <Link to={"/deletepost/"+ this.props.match.params.id} className="btn btn-danger">Delete Post</Link>
            </div>
        )
    }
}

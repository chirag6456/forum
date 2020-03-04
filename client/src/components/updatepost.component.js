import React, { Component } from 'react'
import axios from 'axios';

export default class UpdatePostComponent extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            posttitle : "",
            postcategory : "",
            postcontent : "",
            status : ""
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const data = {
            posttitle : this.state.posttitle,
            postcontent : this.state.postcontent
        }
        const config = {
            headers : { Authorization : `Bearer ${localStorage.getItem('id_token')}`}
        }
        axios.put(`/api/posts/update/${this.props.match.params.id}`, data, config).then( response => {
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
                            <label htmlFor="posttitle">Title</label>
                            <input type="text" className="form-control" value={this.state.posttitle} onChange={this.handleChange} id="posttitle" placeholder="Enter post title" name="posttitle" required/>
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="postcontent">Content:</label>
                        <textarea className="form-control" placeholder="Post contents" rows="5" value={this.state.postcontent} onChange={this.handleChange} name="postcontent" id="postcontent"></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary">Update Post</button><br/><br/>
                        {this.state.status ? (<div className="alert alert-primary" role="alert">{this.state.status}</div>) : null }
                    </form>  
            </div>
        )
    }
}

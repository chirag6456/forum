import React, { Component } from 'react'
import axios from 'axios';

export default class AddCategoryComponent extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            categorytitle : "",
            categorydescription : "",
            status : ""
        }
    }

    handleSubmit(event){
        event.preventDefault();
        const data = {
            categorytitle : this.state.categorytitle,
            categorydescription: this.state.categorydescription
        }
        const config = {
            headers : { Authorization : `Bearer ${localStorage.getItem('id_token')}`}
        }
        
        axios.post('/api/categories/add/', data, config).then( response => {
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
                            <label htmlFor="categorytitle">Category Title:</label>
                            <input type="text" className="form-control" value={this.state.categorytitle} onChange={this.handleChange} id="categorytitle" placeholder="Enter Category title" name="categorytitle" required/>
                        </div>
                        
                        <div className="form-group">
                        <label htmlFor="categorydescription">Description:</label>
                        <textarea className="form-control" placeholder="Description" rows="5" value={this.state.categorydescription} onChange={this.handleChange} name="categorydescription" id="categorydescription"></textarea>
                        </div>

                        <button type="submit" className="btn btn-success">Add Category</button><br/><br/>
                        {this.state.status ? (<div className="alert alert-primary" role="alert">{this.state.status}</div>) : null }
                    </form>  
            </div>
        )
    }
}

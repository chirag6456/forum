import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

const Category = props => (
    <div className="card text-white bg-primary mb-3" style={{marginLeft : "8rem", marginRight : "8rem", marginTop : "2rem"}}>
    <div className="card-header">{props.cat.posttitle}</div>
        <div className="card-body">
                <p className="card-text">{props.cat.postcontent}</p>
                <Link to={"/post/"+ props.cat.id} className="stretched-link"></Link>
        </div>
    </div>
)
export default class CategoryComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            catname : "",
            catdesc : "",
            categoryposts : [],
            status : ""
        }
        this.showcat = this.showcat.bind(this)
    }
    componentDidMount(){
        axios.get('/api/categories/' + this.props.match.params.id).then( response => {
            console.log(response)
            if(!response.data.message){
                    this.setState({
                        catname : response.data.categorytitle,
                        catdesc : response.data.categorydescription,
                        categoryposts : response.data.posts})
            }
            else{
                this.setState({status : response.data.message})
            }
        }).catch( error => {
            console.log(error)
        })
    }
    showcat(){  

        return this.state.categoryposts.map( (categoryposts, i) => {
            return <Category cat={categoryposts} key={i} />
        })
    }
    render() {
        return (
            <div>
                <div>
                    <h3>{this.state.catname}</h3>
                    <h5>{this.state.catdesc}</h5>
                    {this.state.status?(<div className="alert alert-danger" role="alert">{this.state.status}</div>):
                    (<div>
                    {this.showcat()}
                    <Link to={"/deletecategory/" + this.props.match.params.id} className="btn btn-danger">Delete Category</Link>
                    <Link to={"/addpost/" + this.props.match.params.id} className="btn btn-success">Add Post</Link>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}

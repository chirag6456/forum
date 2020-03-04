import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

const Category = props => (
    <div className="card text-white bg-info mb-3" style={{marginLeft : "8rem", marginRight : "8rem", marginTop : "2rem"}}>
    <div className="card-header">{props.cat.categorytitle}</div>
        <div className="card-body">
                <p className="card-text">{props.cat.categorydescription}</p>
                <Link to={"/category/" + props.cat.id} className="stretched-link"></Link>
        </div>
    </div>
)

export default class HomeComponent extends Component {
    constructor(props){
        super(props);
        this.state = { categories : []}
    }
    
    componentDidMount(){
        axios.get('/api/categories/').then( response => {
            console.log('worked')
            
            this.setState({ categories : response.data}) })
            
            .catch( function(error) {
                console.log(error);
            });
    }
    showcategories(){
        return this.state.categories.map( (categories, i) => {
            return <Category cat={categories} key={i}/>
        })
    }
    render() {
        return (
            <div>
               { this.showcategories() }
               <div style={{marginLeft : "30rem", marginRight : "8rem"}} >
                   
               <Link to={"/addcategory/"} className="btn btn-success">Add Category</Link>
               </div>
            </div>
        )
    }
}

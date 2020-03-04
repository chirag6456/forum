const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');

const db = require('../../models/index');
const Category = db.categories;
const Post = db.posts;

const checkToken = (req, res, next) =>{
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined'){
        
        const bearer = header.split(' ');
        const token = bearer[1];
        if(!token)
            return res.status(403).json({invalidtoken : "Invalid token"})
        jwt.verify(token, config.secretOrKey, (err, token) =>{
            if(err) return err;
            console.log(token)
            req.token = token;
        });
        next();
    }
    else{
        res.status(404).json({tokennotfound : "Token not found"})
    }
}

router.get('/', function(req, res){
    Category.findAll({ include : Post}).then( data => {
        res.json(data);
    }).catch( err => {
        res.status(500).json(err);
    });
});

router.get('/:id', function(req, res){
    Category.findOne({ where : { id : req.params.id}, include : Post}).then( data => {
        if(!data)
            return res.json({message : "Category not found."})
        res.json(data);
    }).catch( err => {
        res.status(500).json(err);
    });
});

router.post('/add', checkToken, function(req, res){
    
    if(!req.token) return res.json({message : "Token error"})
    console.log(req.body)
    req.body.userId = req.token.id;
    Category.create(req.body).then( data => {
        if(!data)
            return res.json({message : "Category already exists."})
        res.json({message : "Category Created"});
    }).catch( err => {
        res.json(err);
    });
});

router.delete('/delete/:id', checkToken, function(req, res){
    
    if(!req.token) return res.json({message : "Invalid token"})
    Category.findOne( { where : { id : req.params.id }}).then( data => {
        if(!data) return res.json({message : 'Category not found'});
        if(data.userId == req.token.id){
           Category.destroy({ where : { id : req.params.id }}).then( num => {
               if(num) return res.json({message : 'Category deleted.'});
               else return res.json({message : 'Error deleting category.'})
           })   
        }
        else 
            return res.json({message : 'Not allowed to delete.'})
    })
});



module.exports = router;
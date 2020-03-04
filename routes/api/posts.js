const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config/keys');
const db = require('../../models/index');

const Post = db.posts;
const Category = db.categories;

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined'){
        
        const bearer = header.split(' ');
        const token = bearer[1];
        if(!token)
            return res.status(403).json({invalidtoken : "Invalid token"})
        jwt.verify(token, config.secretOrKey, (err, token) =>{
            if(err) return err;
        
            req.token = token;
        });
        next();
    }
    else{
        res.json({tokennotfound : "Token not found"})
    }
}

router.get('/', function(req, res){
    
    Post.findAll().then( data => {
        
        res.json(data);
    });
});


router.get('/:id', function(req, res){
    
    Post.findOne( { where : {id : req.params.id}} ).then( data => {
        if(!data)
            res.json({message : "Post not found"})
        res.json(data);
    });
});
router.post('/add', checkToken, function(req, res){

    if(!req.token) res.json({message : "Token error"})
    Category.findOne({ where : { id : req.body.postcategory}}).then( data => {
        if(!data) return res.json({message : 'Category not present'})
        
    else{
        req.body.categoryId = data.id;  
            Post.findOne( { where : { posttitle : req.body.posttitle}}).then( data => {
            if(data)  res.json({ message : 'post already exists'});
            else{
                    const newPost = {
                        posttitle : req.body.posttitle,
                        postcontent : req.body.postcontent,
                        userId : req.token.id,
                        categoryId : req.body.categoryId
                    }
                    Post.create(newPost).then( data => {
                        res.json({message : "Post added"})
                    });
                }
        });
    }
})
});

router.put('/update/:id', checkToken, function(req, res){
    
    if(!req.token) return res.json({message : "Invalid token"})
    Post.findOne( { where : { id : req.params.id }}).then( data => {
        if(!data) return res.json({message : 'Post not found'});
        if(data.userId == req.token.id){
            Post.update(req.body, { where : { id : req.params.id}}).then( num => {
                if(num) return res.json({message : 'Post updated.'});
                else return res.json({message : 'Error updatin post.'})
            })
            
        }
        else 
            return res.json({message : 'Not allowed to update.'})
    })

});

router.delete('/delete/:id', checkToken, function(req, res){

    if(!req.token) return res.json({invalidtoken : "Invalid token"})
    Post.findOne( { where : { id : req.params.id }}).then( data => {
        if(!data) return res.json({message : 'Post not found'});
        if(data.userId == req.token.id){
           Post.destroy({ where : { id : req.params.id }}).then( num => {
               if(num) return res.json({message : 'Post deleted.'});
               else return res.json({message : 'Error deleting post.'})
           })
            
        }
        else 
            return res.json({message : 'Not allowed to delete.'})
    });
});


module.exports = router;
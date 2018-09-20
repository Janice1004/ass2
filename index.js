const Joi = require('joi');
const express=require('express');
const app=express();
app.use(express.json());
const port=process.env.PORT||8080;

const menus=[
    { id:1, name:'Mocha'},
    { id:2, name:'Flat White'},
    { id:3, name:'Latte'},
    { id:4, name:'Hot Chocolate'},
];
app.get('/',function(req,res){
    res.send('Hello World!!!!!');
});

app.get('/api/menus',function(req,res){
    res.send(menus);
});

app.post('/api/menus',function(req,res){
    const { error } = validatemenu(req.body); // result.error
    //400 Bad Request
    if(error) return res.status(400).send(error.details[0].message); 
    const menu={
        id:menus.length+1,
        name:req.body.name
    };
    menus.push(menu);
    res.send(menu);
});

app.get('/api/menus/:id',function(req,res){
    const menu=menus.find(c=>c.id===parseInt(req.params.id));
    if(!menu) return res.status(404).send('The drink with the given ID was not found.');//404 object not found.
    res.send(menu);
});

app.put('/api/menus/:id',function(req,res){
    //look up the menu
    //if not existing, return 404
    const menu=menus.find(c=>c.id===parseInt(req.params.id));
    if(!menu) return res.status(404).send('The drink with the given ID was not found.');//404 object not found.
    const { error } = validatemenu(req.body); // result.error
     //400 Bad Request
    if(error) return res.status(400).send(error.details[0].message);
    //update menu
    //return the updated menu.
    menu.name=req.body.name;
    res.send(menu);
});

function validatemenu(menu){
    const schema={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(menu,schema);
}

app.delete('/api/menus/:id',function(req,res){
    //look up the drink
    //not existing, return 404
    const menu=menus.find(c=>c.id===parseInt(req.params.id));
    if(!menu) return res.status(404).send('The drink with the given ID was not found.');//404 object not found.
    //delete
    const index=menus.indexOf(menu);
    menus.splice(index,1);
    //return the same course
    res.send(menu);
});


app.listen(port,function(){
    console.log('Example app listening on port 8080!');
});



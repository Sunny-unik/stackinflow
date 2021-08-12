var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var Mongoclient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
app.use(cors());

var client = new Mongoclient(process.env.MONGO_URI,{useNewUrlParser:true, useUnifiedTopology:true});
var connection;
client.connect((err,db)=>{
    if(!err){
        connection = db;
        console.log("Database Connected")
    }
    else{
        console.log("Error in Connecting Database")
    }
})

app.get('/list-user',(req,res)=>{ 
    var usercollection = connection.db('stackinflow').collection('user')
    usercollection.find().toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok",data:docs})
        }
        else{
            res.send({status:"failed",data:err})
        }
    })
})

app.get('/delete-user',(req,res)=>{ 
    var usercollection = connection.db('stackinflow').collection('user')
    usercollection.remove({_id:ObjectId(req.query.id)},(err,result)=>{
        if(!err){
            res.send({status:"ok",data:"user deleted successfully"})
        }
        else{
            res.send({status:"failed",data:err})
        }
    })
})

app.post('/create-user', bodyparser.json(),(req,res)=>{
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.insert(req.body,(err,result)=>{
        if(!err){
            res.send({status:"ok",data:"user created successfully"})
        }
        else{
            res.send({status:"failed",data:err})
        }
    })
})

// app.post('/update-user',(req,res)=>{  })

app.listen(3001,()=>{
    console.log("Server is running on port 3001")
})
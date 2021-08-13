var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var Mongoclient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
// var nodemailer = require('nodemailer');

var app = express();
app.use(cors());

var random = Math.floor((Math.random()*1000000)+1);
var otp = random;

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
    var usercollection = connection.db('stackinflow').collection('user');
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
    usercollection.insert(req.body ,(err,result)=>{
        if(!err){
            console.log(otp)
            res.send({status:"ok",data:"user created successfully"})
//             sendMail("process.env.APP_ID", "process.env.APP_PASSWORD", req.body.email, "Welcome to tackinflow", `we hope you find our service cool   <h3>stackinflow</h3><br><h6>Your One Time Password is {otp} </h6>`)
        }
        else{
            res.send({status:"failed",data:err})
        }
    })
})

// app.post('/update-user',(req,res)=>{  })

// function sendMail(from, appPassword, to, subject,  htmlmsg)
// {
//     let transporter=nodemailer.createTransport(
//         {
//             host:"smtp.gmail.com",
//             port:587,
//             secure:false,
//             auth:
//             {
//              //  user:"weforwomen01@gmail.com",
//              //  pass:""
//              user:from,
//               pass:appPassword
              
    
//             }
//         }
//       );
//     let mailOptions=
//     {
//        from:from ,
//        to:to,
//        subject:subject,
//        html:htmlmsg
//     };
//     transporter.sendMail(mailOptions ,function(error,info)
//     {
//       if(error)
//       {
//         console.log(error);
//       }
//       else
//       {
//         console.log('Email sent:'+info.response);
//       }
//     });
// }

app.listen(3001,()=>{
    console.log("Server is running on port 3001")
})

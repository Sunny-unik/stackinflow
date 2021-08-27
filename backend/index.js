var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var Mongoclient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

var app = express();
app.use(cors());

var client = new Mongoclient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
var connection;
client.connect((err, db) => {
    if (!err) {
        connection = db;
        console.log("Database Connected")
    }
    else {
        console.log("Error in Connecting Database")
    }
})

app.get('/list-user', (req, res) => {
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.find().toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs })
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

app.post('/check-login', bodyparser.json(), (req, res) => {
    console.log(req.body);
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.find({ $or: [ { email:req.body.email }, { dname:req.body.email } ], password: req.body.password }).toArray((err, result) => {
        if (!err && result.length > 0) {
            res.send({ status: 'ok', data: result[0] });
        } else {
            res.send({ status: 'error', data: err })
        }
    })
})

app.post('/valid-email', bodyparser.json(), (req, res) => {
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.find({ email: req.body.email }).toArray((err, result) => {
        if (!err && result.length > 0) {
            res.send({ status: 'error', data: "this email is already registered 🤔" });
        } else {
            res.send({ status: 'ok' })
        }
    })
})
app.post('/valid-dname', bodyparser.json(), (req, res) => {
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.find({ dname: req.body.dname }).toArray((err, result) => {
        if (!err && result.length > 0) {
            res.send({ status: 'error', data: "this username is already taken 🤔" });
        } else {
            res.send({ status: 'ok' })
        }
    })
})

app.get('/delete-user', (req, res) => {
    var usercollection = connection.db('stackinflow').collection('user')
    usercollection.remove({ _id: ObjectId(req.query.id) }, (err, result) => {
        if (!err) {
            res.send({ status: "ok", data: "user deleted successfully" })
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

app.post("/send-otp-email", bodyParser.json(), (req, res) => {
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.find({ $or: [ { email:req.body.email }, { dname:req.body.email } ] }).toArray((err, result) => {
        if (!err && result.length > 0) {
            console.log(req.body);
            console.log(result[0].email);
            // res.send({ status: 'ok', data: result.email });
            sendMail("process.env.APP_ID", "process.env.APP_PASSWORD", result[0].email, "Welcome to stackinflow", `Your One Time Password is - <h3>${req.body.otp}</h3><br><h6>We hope you find our service cool.</h6>`)
            res.send({ status: "ok", data: "please enter correct otp" });
        } 
        else {
            res.send({ status: 'error', data: err })
        }
    })
})

app.post("/update-password", bodyParser.json(),(req,res)=>{
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.update({ $or: [ { email:req.body.email }, { dname:req.body.email } ] }, {$set:{password:req.body.newpassword}}, (err,result)=>{
    if(!err){
        res.send({status:"ok", data:"user password updated successfully"})
    }
    else{
        res.send({status:"failed", data:err})
    }
})
})

app.post("/send-user-otp",bodyParser.json(),(req,res)=>{
    console.log(req.body);
    sendMail("process.env.APP_ID", "process.env.APP_PASSWORD", req.body.email, "Welcome to stackinflow", `Your One Time Password is - <h3>${req.body.otp}</h3><br><h6>We hope you find our service cool.</h6>`)
    res.send({status:"ok",data:"please verify your email"});
})

app.post('/create-user', bodyparser.json(), (req, res) => {
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.insert(req.body, (err, result) => {
        if (!err) {
            // console.log(otp)
            res.send({ status: "ok", data: "user created successfully" })
            sendMail("process.env.APP_ID", "process.env.APP_PASSWORD", req.body.email, "Welcome to stackinflow", `<h2>stackinflow</h2><br><h4> Registration SuccessFull </h4><br>We hope you find our service cool.`)
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

// app.post('/update-user',(req,res)=>{  })

function sendMail(from, appPassword, to, subject, htmlmsg) {
    let transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:
            {
                //  user:"weforwomen01@gmail.com",
                //  pass:""
                user: from,
                pass: appPassword
            }
        }
    );
    let mailOptions =
    {
        from: from,
        to: to,
        subject: subject,
        html: htmlmsg
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Email sent:' + info.response);
        }
    });
}

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})

var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var Mongoclient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');
var upload = require('./multerConfig');
var path = require('path')

var app = express();
app.use(cors());

app.use(express.static(path.join(__dirname,"uploads/userprofiles")));

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

app.get('/list-question-length', (req, res) => {
    var questioncollection = connection.db('stackinflow').collection('q&a');
    questioncollection.find().toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs.length })
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

app.get('/list-question', (req, res) => {
    var questioncollection = connection.db('stackinflow').collection('q&a');
    questioncollection.find().toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs })
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

app.get('/list-question-bypage', (req, res) => {
    var questioncollection = connection.db('stackinflow').collection('q&a');
    const limit=parseInt(req.query.limit);
    const page=parseInt(req.query.page);
    console.log(limit,page);
    questioncollection.find().limit(limit *1).skip((page *1)*limit).toArray((err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: docs })
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

app.get("/question-by-id", (req,res)=>{
    var questioncollection = connection.db('stackinflow').collection('q&a');
    questioncollection.find({_id:ObjectId(req.query.id)}).toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok", data:docs})
        }
        else{
            res.send({status:"failed", data:err})
        }
    })
});

app.post("/list-question-byquestion",bodyparser.json(), (req,res)=>{
    var questioncollection = connection.db('stackinflow').collection('q&a');
    console.log(req.body.searchby)
    questioncollection.find({question:req.body.searchby}).toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok", data:docs})
        } 
        else{
            res.send({status:"failed", data:err})
        }
    })
});

app.get("/user-by-userdname", (req,res)=>{
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.find({_id:ObjectId(req.query._id)}).toArray((err,docs)=>{
        if(!err){
            res.send({status:"ok", data:docs})
        }
        else{
            res.send({status:"failed", data:err})
        }
    })
});

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

app.post('/create-question', bodyparser.json(), (req, res) => {
    var questioncollection = connection.db('stackinflow').collection('q&a');
    questioncollection.insert(req.body, (err, result) => {
        if (!err) {
            res.send({ status: "ok", data: "Your Question Listed" })
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

app.post('/create-answer', bodyparser.json(), (req, res) => {
    var questioncollection = connection.db('stackinflow').collection('q&a');
    console.log(req.body);
    questioncollection.updateOne({_id:ObjectId(req.body.qid)},{$push: {answers:req.body}}, (err, docs) => {
        if (!err) {
            res.send({ status: "ok", data: "Your Answer is Submitted" })
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

app.post('/add-qlike',bodyparser.json(),(req,res)=>{
    var questioncollection = connection.db('stackinflow').collection('q&a')
    console.log(req.body)
    questioncollection.updateOne({_id:ObjectId(req.body.qid)},{$push: {qlikes:req.body.uid}},(err,docs)=>{
            if(!err){
                res.send({status:"ok",data:"like added"})
            }
            else{
                res.send({status:"failed",data:err})
            }
    })
})

app.post('/remove-qlike',bodyparser.json(),(req,res)=>{
    var questioncollection = connection.db('stackinflow').collection('q&a')
    console.log(req.body)
    questioncollection.updateOne({_id:ObjectId(req.body.qid)},{$set:{qlikes:req.body.qlikes}},(err,docs)=>{
        if(!err){
            res.send({status:"ok",data:"like removed"})
        }
        else{
            res.send({status:"failed",data:err})
        }
    })
})

app.post('/add-alike',bodyparser.json(),(req,res)=>{
    var questioncollection = connection.db('stackinflow').collection('q&a')
    console.log(req.body)
    questioncollection.updateOne({"_id":ObjectId(req.body.qid), "answers": {"$elemMatch":{date: req.body.ad}}},{"$push": {"answers.$.alikes":req.body.uid}}
        ,(err,docs)=>{
            if(!err){
                res.send({status:"ok",data:"like added"})
            }
            else{
                res.send({status:"failed",data:err})
            }
    })
})

app.post('/remove-alike',bodyparser.json(),(req,res)=>{
    var questioncollection = connection.db('stackinflow').collection('q&a')
    console.log(req.body);
    questioncollection.updateOne({"_id":ObjectId(req.body.qid), "answers": {"$elemMatch":{"date": req.body.ad}}},{$set:{"answers.$.alikes":req.body.al}}
        ,(err,docs)=>{
            if(!err){
                res.send({status:"ok",data:"like removed"})
            }
            else{
                res.send({status:"failed",data:err})
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
            res.send({ status: result[0]._id, data: "this username is already taken 🤔" });
        } else {
            res.send({ status: 'ok' })
        }
    })
})

app.post('/delete-question',bodyparser.json(), (req, res) => {
    var questioncollection = connection.db('stackinflow').collection('q&a')
    questioncollection.deleteOne({ _id:ObjectId(req.body.qid) }, (err, result) => {
        if (!err) {
            res.send({ status: "ok", data: "Question deleted successfully ☺"})
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
})

// app.post('/delete-answer',bodyparser.json(), (req, res) => {
//     var questioncollection = connection.db('stackinflow').collection('q&a')
//     console.log(req.body)
// // questioncollection.updateOne({"_id":ObjectId(req.body.qid), "answers": {"$elemMatch":{date: req.body.ad}}},{"$push": {"answers.$.alikes":req.body.uid}}
//     questioncollection.deleteOne({"_id":ObjectId(req.body.qid), "answers": {"$elemMatch":{date: req.body.ad}}}
//      ,(err, result) => {
//         if (!err) {
//             res.send({ status: "ok", data: "Answer deleted successfully ☺"})
//         }
//         else {
//             res.send({ status: "failed", data: err })
//         }
//     })
// })

app.post("/send-otp-email", bodyparser.json(), (req, res) => {
    var usercollection = connection.db('stackinflow').collection('user');
    usercollection.find({ $or: [ { email:req.body.email }, { dname:req.body.email } ] }).toArray((err, result) => {
        if (!err && result.length > 0) {
            console.log(req.body);
            console.log(result[0].email);
            sendMail("process.env.APP_ID", "process.env.APP_PASSWORD", result[0].email, "Welcome to stackinflow", `Your One Time Password is - <h3>${req.body.otp}</h3><br><h6>We hope you find our service cool.</h6>`)
            res.send({ status: "ok", data: "please enter correct otp" });
        } 
        else {
            res.send({ status: 'error', data: err })
        }
    })
})

app.post("/update-question", bodyparser.json(),(req,res)=>{
    var questioncollection = connection.db('stackinflow').collection('q&a');
    console.log(req.body);
    questioncollection.updateOne({_id:ObjectId(req.body.questionid)}, {$set:{question:req.body.question,
        questiondetail:req.body.questiondetail,tags:req.body.tags}}, (err,result)=>{
    if(!err){
        res.send({status:"ok", data:"Your question updated successfully 😊"})
    }
    else{
        res.send({status:"failed", data:err})
    }
})
})

app.post("/update-user-point", bodyparser.json(),(req,res)=>{
    var usercollection = connection.db('stackinflow').collection('user');
    console.log(req.body.userpoint);
    console.log(req.body.userdname);
    let upoint = req.body.userpoint;
    usercollection.updateOne({_id:ObjectId(req.body.userdname)}, {$set: {userlikes:upoint}}, (err,result)=>{
    if(!err){
        res.send({status:"ok", data:"Your points updated successfully 😊"})
    } else{
        res.send({status:"failed", data:err})
    }
})
})

app.post("/update-user-details", bodyparser.json(),(req,res)=>{
    var usercollection = connection.db('stackinflow').collection('user');
    console.log(req.body)
    usercollection.updateOne({_id:ObjectId(req.body.obid)}, {$set: {name:req.body.name,dname:req.body.dname,title:req.body.title,
    about:req.body.about,weblink:req.body.weblink,gitlink:req.body.gitlink,twitter:req.body.twitter,address:req.body.address}},
     (err,result)=>{
    if(!err){
        res.send({status:"ok", data:"Your details updated successfully 😊"})
    } else{
        res.send({status:"failed", data:err})
    }
})
})

app.post("/update-user", bodyparser.json(),(req,res)=>{
    upload(req,res,(err)=>{
        if (!err) {
            console.log("files",req.files);
            console.log(req.body);
            console.log("158");
            var usercollection = connection.db('stackinflow').collection('user');
            usercollection.update({_id:ObjectId(req.body.obid)},{$set:{profile:req.files.profile[0].filename}},(err,result)=>{
                if(!err){
                    res.send({status:"ok", data:"user profile updated successfully"})
                }
                else{
                    res.send({status:"failed", data:err})
                }
            })
        }
        else {
            console.log("Error Occured during upload ");
            console.log(err);
            res.send({status:"failed", data:err});
        }
    });
})

app.post("/update-password", bodyparser.json(),(req,res)=>{
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

app.post("/send-user-otp",bodyparser.json(),(req,res)=>{
    console.log(req.body);
    sendMail("process.env.APP_ID", "process.env.APP_PASSWORD", req.body.email, "Welcome to stackinflow",
     `Your One Time Password is - <h3>${req.body.otp}</h3><br><h6>We hope you find our service cool.</h6>`)
    res.send({status:"ok",data:"please verify your email"});
})

app.post('/send-feedback', bodyparser.json(), (req, res) => {
    var feedbackcollection = connection.db('stackinflow').collection('feedbacks');
    console.log(req.body);
    feedbackcollection.insert(req.body, (err, result) => {
        if (!err) {
            res.send({ status: "ok", data: "Feedback Submitted Successfully" })
            sendMail("process.env.APP_ID", "process.env.APP_PASSWORD", req.body.useremail, "Thanks for submit your feedback",
             `<h2>stackinflow</h2><br><h4> Feedback Sent SuccessFull </h4><br><h6>We hope you find our service cool.</h6>`)
        }
        else {
            res.send({ status: "failed", data: err })
        }
    })
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

function sendMail(from, appPassword, to, subject, htmlmsg) {
    let transporter = nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth:
            {
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

app.listen( process.env.PORT || 3001, () => {
    console.log("Server is running on port 3001")
})

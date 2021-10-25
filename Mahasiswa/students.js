const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require("./Student");
const Student = mongoose.model("Student");

mongoose.connect("mongodb+srv://dbUser:reydri1997@cluster0.qt0rg.mongodb.net/db_student?retryWrites=true&w=majority", () =>{
    console.log("Database is connected!");
});

app.get('/', (req, res) => {
    res.send('Welcome to the Microservices REST API!');
})

app.post('/student', (req, res) => {
    var newStudent = {
        name: req.body.name,
        nim: req.body.nim,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    };

    var student = new Student(newStudent);

    student.save().then(() => {
        res.send("Created success!");
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get('/students', (req, res) => {
    Student.find().then((students) => {
        res.json(students);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.get('/student', (req, res) => {
    const email = req.query.email;
    var data = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};
    Student.find(data).then((students) => {
        res.json(students);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.get('/student/:id', (req, res) => {
    Student.findById(req.params.id).then((student) => {
        if(student){
            res.json(student);
        }else{
            res.send('Student is not found');;
        }
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.delete('/student/:id', (req, res) => {
    Student.findOneAndRemove(req.params.id).then((student) => {
        res.send("Student deleted is success!")
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.put('/student/:id', (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then((student) => {
        if(student){
            res.send("Student was updated is successfully")
        }else{
            res.sendStatus(404).send('Student is not found');;
        }
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.listen(5000, () => {
    console.log('This application is running at http://locahost:5000');
})
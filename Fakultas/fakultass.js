const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require("./Fakultas");
const Fakultas = mongoose.model("Fakultas");

mongoose.connect("mongodb+srv://dbUser:reydri1997@cluster0.qt0rg.mongodb.net/db_student?retryWrites=true&w=majority", () =>{
    console.log("Database is connected!");
});

app.get('/', (req, res) => {
    res.send('Welcome to the Microservices REST API!');
})

app.post('/fakultas', (req, res) => {
    var newFakultas = {
        StudentID : mongoose.Types.ObjectId(req.body.StudentID),
        name: req.body.name
    };

    var fakultas = new Fakultas(newFakultas);

    fakultas.save().then(() => {
        res.send("Created success!");
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get('/fakultass', (req, res) => {
    Fakultas.find().then((fakultass) => {
        res.json(fakultass);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

// app.get('/fakultas/:id', (req, res) => {
//     Fakultas.findById(req.params.id).then((fakultas) => {
//         if(fakultas){
//             res.json(fakultas);
//         }else{
//             res.send('Not found');;
//         }
//     }).catch((err) =>{
//         if(err){
//             throw err;
//         }
//     })
// })

app.listen(8000, () => {
    console.log('This application is running at http://locahost:8000');
})
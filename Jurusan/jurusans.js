const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require("./Jurusan");
const Jurusan = mongoose.model("Jurusan");

mongoose.connect("mongodb+srv://dbUser:reydri1997@cluster0.qt0rg.mongodb.net/db_student?retryWrites=true&w=majority", () =>{
    console.log("Database is connected!");
});

app.get('/', (req, res) => {
    res.send('Welcome to the Microservices REST API!');
})

app.post('/jurusan', (req, res) => {
    var newJurusan = {
        StudentID : mongoose.Types.ObjectId(req.body.StudentID),
        name: req.body.name
    };

    var jurusan = new Jurusan(newJurusan);

    jurusan.save().then(() => {
        res.send("Created success!");
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get('/jurusans', (req, res) => {
    Jurusan.find().then((jurusans) => {
        res.json(jurusans);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

// app.get('/jurusan/:id', (req, res) => {
//     Jurusan.findById(req.params.id).then((jurusan) => {
//         if(jurusan){
//             res.json(jurusan);
//         }else{
//             res.send('Not found');;
//         }
//     }).catch((err) =>{
//         if(err){
//             throw err;
//         }
//     })
// })

app.listen(7000, () => {
    console.log('This application is running at http://locahost:7000');
})
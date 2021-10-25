const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json());

require("./Matkul");
const Matkul = mongoose.model("Matkul");

mongoose.connect("mongodb+srv://dbUser:reydri1997@cluster0.qt0rg.mongodb.net/db_student?retryWrites=true&w=majority", () =>{
    console.log("Database is connected!");
});

app.get('/', (req, res) => {
    res.send('Welcome to the Microservices REST API!');
})

app.post('/matkul', (req, res) => {
    var newMatkul = {
        StudentID : mongoose.Types.ObjectId(req.body.StudentID),
        name: req.body.name,
        sks: req.body.sks
    };

    var matkul = new Matkul(newMatkul);

    matkul.save().then(() => {
        res.send("Created success!");
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get('/matkuls', (req, res) => {
    Matkul.find().then((matkuls) => {
        res.json(matkuls);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.get('/matkul/:id', (req, res) => {
    Matkul.findById(req.params.id).then((matkul) => {
        if(matkul){
            axios.get("http://localhost:5000/student/" + matkul.StudentID).then((response)=>{

                let matkulData = {nama_mahasiswa: response.data.name}
                res.json(matkulData)
            })
        }else{
            res.send('Invalid')
        }
    })
})

app.delete('/matkul/:id', (req, res) => {
    Matkul.findOneAndRemove(req.params.id).then((matkul) => {
        res.send("Deleted success!")
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.put('/matkul/:id', (req, res) => {
    Matkul.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then((matkul) => {
        if(matkul){
            res.send("Updated success")
        }else{
            res.sendStatus(404).send('Not found');;
        }
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.listen(6000, () => {
    console.log('This application is running at http://locahost:6000');
})
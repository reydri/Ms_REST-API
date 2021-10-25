const mongoose = require('mongoose');

mongoose.model('Matkul', {
    StudentID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    sks: {
        type: Number,
        require: true
    }
})
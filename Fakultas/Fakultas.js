const mongoose = require('mongoose');

mongoose.model('Fakultas', {
    StudentID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true
    }
})
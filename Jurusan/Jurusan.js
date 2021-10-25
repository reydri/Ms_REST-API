const mongoose = require('mongoose');

mongoose.model('Jurusan', {
    StudentID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    name: {
        type: String,
        require: true
    }
})
const mongoose = require('mongoose');

mongoose.model('Student', {
    name: {
        type: String,
        require: true
    },
    nim: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phoneNumber:{
        type: String,
        require: true
    },
})
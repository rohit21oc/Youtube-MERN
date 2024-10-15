const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testapp")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });


const userSchema = new mongoose.Schema({
    name: {
        type: String,  
        required: true,
        minlength: 3 
    },
    email: {
        type: String,  
        required: true,
        minlength: 10  
    },
    image: {
        type: String,  
        required: true,
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;

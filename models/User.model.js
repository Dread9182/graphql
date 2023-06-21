const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    nombre:{
        type:String,
        require:true,
        trim:true
    },
    apellido:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        unique:true
    }, 
    password:{
        type:String,
        require:true
    }
});
module.exports = mongoose.model("usuarios", userSchema);
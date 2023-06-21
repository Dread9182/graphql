const mongoose = require("mongoose");
require("dotenv").config({path:".env"});
const connectdb = async() => {
    try {
        await mongoose.connect(process.env.DB_URI, {});
        console.log("Se conecto a la base de datos");
    } catch (e){
        console.log("Error al conectar a la base de datos");
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectdb;
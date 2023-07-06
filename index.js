'use strict'
const {ApolloServer} = require('apollo-server');

//importa las definiciones de los tipos, queries y mutations
const typeDefs = require("./db/schemas");

//importa los contenidos de las queries y mutations
const resolvers = require("./db/resolvers");

//se conecta a la base de datos
const connectdb = require("./config/db");

connectdb();

//servidor
const server=new ApolloServer({
    typeDefs,
    resolvers,
    //este tipo de request se maneja de manera distinta donde los headers se envian por esta variable de contexto
    context:(req) => {
        const token=req.headers['authorization']||'';
        try{
            return {
                token
            };
        }
        catch(e){
            console.log(e);
        }
    }
});



//Arrancar servidor

server.listen().then(({url})=>{
    console.log(`Servidor corriendo en la URL ${url}`);
})
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
    resolvers
});



//Arrancar servidor

server.listen().then(({url})=>{
    console.log(`Servidor corriendo en la URL ${url}`);
})
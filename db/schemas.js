//este archivo se encarga de la definicion de las clases y 
//querys que van a existir

const {gql} = require('apollo-server');

const typeDefs=gql`
    type Curso{
        titulo:String
        tecnologia:String
    }
    type User{
        nombre:String
        apellido:String
        email:String
        creado:String
    }
    type Token{
        token:String
    }


    input AuthInput{
        nombre:String!
        password:String!
    }
    input UserInput{
        nombre:String!
        apellido:String!
        email:String!
        password:String!
    }


    type Query{
        getCursos:[Curso]
        getCursosT(tecnologia:String):[Curso]
        getCursosN(titulo:String):[Curso]
    }
    type Mutation{
        newUser(user:UserInput):User
        authenticateUser(input:AuthInput):Token
    }
`

module.exports = typeDefs;
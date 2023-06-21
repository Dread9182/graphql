//este archivo se encarga de asignar valores a los 
//tipos y funciones que creamos anteriormente

const jwtHandler = require("jsonwebtoken");

const UserModel = require("../models/User.model");

const bcrypt = require("bcryptjs");

const cursos=[
    {titulo:'El profesor se embalo',
    tecnologia:'En teoria apollo'},
    {titulo:'Buen diplomado',
    tecnologia:'node'},
]

const createToken = (user, expiracion) =>{
    const {nombre, apellido, email, creado} = user;
    return jwtHandler.sign({nombre, apellido, email, creado}, process.env.JWT_SECRET, {expiresIn:expiracion});
}

const resolvers={
    Query:{
        getCursos:()=>{
            return cursos;
        },
        getCursosT:(_, {tecnologia}) => {
            const resultado = cursos.filter(
                curso => curso.tecnologia === tecnologia
            );
            return resultado;
        },
        getCursosN:(_, {titulo}) => {
            const resultado = cursos.filter(
                curso => curso.titulo === titulo
            );
            return resultado;
        }
    },
    Mutation:{
        newUser: async (_, {user}) => {
            const {email, password} = user;

            const userExists = await UserModel.findOne({email});
            if(userExists){
                throw new Error("Este email ya esta registrado");
            }

            user.password = await bcrypt.hash(password, 10);

            try {
                const insertedUser = new UserModel(user);
                const response = await insertedUser.save();
                return response;
            } catch (e){
                console.log(e);
            }
        },
        authenticateUser: async (_, input) => {
            const {email, password} = input;

            const userExists = await UserModel.findOne({email});
            if(!userExists){
                throw new Error("Credenciales Incorrectas");
            }

            const correctPassword = bcrypt.compare(password, userExists.password);
            if(!correctPassword){
                throw new Error("Credenciales Incorrectas");
            }

            const token = createToken(userExists, "24h");
            return {
                token:token
            }

        }
    }
};

module.exports = resolvers;
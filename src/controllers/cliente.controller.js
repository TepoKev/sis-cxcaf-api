import Cliente from "../models/cliente";
import Persona from "../models/persona";
import Profesion from "../models/profesion";

export async function getClientes( req, res ){
    try {
        const clientes = await Cliente.findAll({
            include: [
                {model: Persona, include: [
                  {model: Profesion}
                ]}
              ]
        });
        res.json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Error en el servidor"
        });
    }
}

export async function getOneCliente( req, res ){
    try {
        const { id } = req.params;
        const cliente = await Cliente.findOne({
            where : {
                id
            },
            include: [
                {model: Persona, include: [
                  {model: Profesion}
                ]}
            ]
        });
        if(cliente){
            res.json(cliente);
        }else{
            res.status(400).json({
                message : "Este cliente no existe en nuestra base de datos"
            });    
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Error en el servidor"
        });
    }
}

export async function createCliente( req, res ){
    try {
        const {
            //Datos de persona
            nombres,
            apellidos,
            dui,
            telefono,
            genero,
            salario,
            idProfesion,
            nit,
            fechaN,
            direccion,
            zona,
            estadoCivil,
            //Datos de usuario
            tipo,
            clasificacion
        } = req.body;
        const newPersona = await Persona.create({
            nombres,
            apellidos,
            dui,
            telefono,
            genero,
            salario,
            idProfesion,
            nit,
            fechaN,
            direccion,
            zona,
            estadoCivil
        });
        const newCliente = await Cliente.create({
            tipo,
            idPersona : newPersona.id,
            clasificacion
        });
        const profesion = await Profesion.findOne({
            where : {
                id : newPersona.dataValues.idProfesion
            }
        });
        newPersona.dataValues.profesion = profesion.dataValues;
        newCliente.dataValues.persona = newPersona.dataValues;
        res.json(newCliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Error en el servidor"
        });
    }
}
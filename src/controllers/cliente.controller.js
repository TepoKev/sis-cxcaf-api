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
            //Datos de cliente
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
        res.status(200);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "Error en el servidor"
        });
    }
}

export async function updateCliente( req, res ){
    try {
        var opc = false;
        const { id } = req.params;
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
        const clientes = await Cliente.findAll({
            attributes : [
                "id",
                "tipo",
                "idPersona",
                "clasificacion"
            ],
            where : {
                id
            }
        });
        if(clientes.length > 0 ){
            clientes.forEach(async cliente => {
                await cliente.update({
                    tipo,
                    clasificacion
                });
                const personas = await Persona.findAll({
                    attributes : [
                        "id",
                        "nombres",
                        "apellidos",
                        "dui",
                        "telefono",
                        "genero",
                        "salario",
                        "idProfesion",
                        "nit",
                        "fechaN",
                        "direccion",
                        "zona",
                        "estadoCivil",
                    ],
                    where : {
                        id : cliente.dataValues.idPersona
                    }
                });
                if(personas.length > 0 ){
                    personas.forEach(async persona => {
                        await persona.update({
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
                        });
                    });
                    opc = false;
                }
            });
            if(opc){
                return res.json({
                    message: "Cliente actualizado exitosamente",
                    data: clientes
                });
            }else{
                return res.json({
                    message: "Cliente y Persona actualizados exitosamente",
                    data: clientes
                });
            }
        }else{
            res.status(400).json({
                message: "Alguno de los registros no se ha encontrado"
            });    
        }
    } catch (error) {
        res.status(500).json({
            message: "Somethin goes wrong"
        });
    }
}
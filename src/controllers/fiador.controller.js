import { Fiador, fiadorObj } from "../models/fiador";
import { Persona, personaObj } from "../models/persona";
import { Usuario, usuarioObj } from "../models/usuario";
import { Profesion } from "../models/profesion";
import { capture } from "../utils/captureParams";

export async function getFiadores(req, res) {
    try {
        const fiadores = await Fiador.findAll({
            include: [
                {
                    model: Persona, include: [
                        { model: Usuario },
                        { model: Profesion }
                    ]
                }
            ]
        });
        res.json(fiadores);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getFiador(req, res) {
    try {
        const { id } = req.params;
        const fiador = await Fiador.findOne({
            where : {
                id
            },
            include: [
                {
                    model: Persona, include: [
                        { model: Usuario },
                        { model: Profesion }
                    ]
                }
            ]
        });
        res.json(fiador);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createFiador(req, res) {
    try {
        const dataFiador = {};
        const dataPerson = capture( personaObj, req.body );
        const dataUser = capture( usuarioObj, req.body );
        const newUser = await Usuario.create(dataUser);
        dataPerson.idUsuario = newUser.dataValues.id;
        const newPersona = await Persona.create(dataPerson);
        dataFiador.idPersona = newPersona.dataValues.id;
        const newFiador = await Fiador.create(dataFiador);
        newFiador.dataValues.persona = newPersona.dataValues;
        newFiador.dataValues.persona.usuario = newUser.dataValues;
        const profesion = await Profesion.findOne({
            where : {
                id : newPersona.dataValues.idProfesion
            }
        });
        newFiador.dataValues.persona.profesion = profesion.dataValues;
        res.json(newFiador);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateFiador(req, res) {
    try {
        const { id } = req.params;
        const dataFiador = capture( fiadorObj, req.body );
        const dataPerson = capture( personaObj, req.body );
        const dataUser = capture( usuarioObj, req.body );
        const fiadores = await Fiador.findAll({
            atributes : Object.keys(fiadorObj),
            where : {
                id
            }
        });
        if(fiadores.length > 0){
            var fiadorRet = {};
            fiadorRet.id = id;
            fiadorRet.persona = dataPerson;
            const profesion = await Profesion.findOne({
                where: {
                    id: dataPerson.idProfesion
                }
            });
            fiadorRet.persona.profesion = profesion.dataValues;
            fiadorRet.persona.usuario = dataUser;
            fiadores.forEach(async fiador => {
                await fiador.update(dataFiador);
                const personas = await Persona.findAll({
                    where : {
                        id : fiador.dataValues.idPersona
                    }
                });
                if(personas.length > 0){
                    personas.forEach(async persona => {
                        await persona.update(dataPerson);
                        const usuarios = await Usuario.findAll({
                            where : {
                                id : persona.dataValues.idUsuario
                            }
                        });
                        if(usuarios.length > 0){
                            usuarios.forEach(async usuario => {
                                usuario.update(dataUser);
                            });
                        }
                    });
                }
            });
            res.json(fiadorRet);
        }else{
            res.status(400).json({
                message: "Alguno de los registros no se ha encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}
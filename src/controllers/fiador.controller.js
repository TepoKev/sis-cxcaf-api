import { Fiador, fiadorObj } from "../models/fiador";
import { Persona, personaObj } from "../models/persona";
import { Usuario, usuarioObj } from "../models/usuario";
import { Profesion } from "../models/profesion";
import { Rol } from "../models/rol";
import { capture } from "../utils/captureParams";

export async function getFiadores(req, res) {
    try {
        const fiadores = await Fiador.findAll({
            include: [
                {
                    model: Persona, include: [
                        {
                            model: Usuario, include: [
                                { model: Rol }
                            ]
                        },
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
                        {
                            model: Usuario, include: [
                                { model: Rol }
                            ]
                        },
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
        const rol = await Rol.findOne({
            where : {
                id : newUser.dataValues.idRol
            }
        });
        const profesion = await Profesion.findOne({
            where : {
                id : newPersona.dataValues.idProfesion
            }
        });
        newFiador.dataValues.persona.usuario.rol = rol.dataValues;
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
            const rol = await Rol.findOne({
                where: {
                    id: dataUser.idRol
                }
            });
            console.log(1);
            fiadorRet.persona.usuario.rol = rol.dataValues;
            fiadores.forEach(async fiador => {
                await fiador.update(dataFiador);
                console.log(2, fiador.dataValues.idPersona);
                const personas = await Persona.findAll({
                    where : {
                        id : fiador.dataValues.idPersona
                    }
                });
                console.log(3);
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
        }
        res.json(fiadorRet);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}
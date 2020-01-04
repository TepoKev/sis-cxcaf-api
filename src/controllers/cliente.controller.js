import { Cliente , clienteObj } from "../models/cliente";
import { Persona, personaObj } from "../models/persona";
import { Profesion } from "../models/profesion";
import { Usuario, usuarioObj } from "../models/usuario";
import { Rol } from "../models/rol";
import { capture } from "../utils/captureParams";

export async function getClientes(req, res) {
    try {
        const clientes = await Cliente.findAll({
            include: [
                {
                    model: Persona, include: [
                        { model: Profesion },
                        {
                            model: Usuario, include: [
                                { model: Rol }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json(clientes);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getOneCliente(req, res) {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Persona, include: [
                        { model: Profesion },
                        {
                            model: Usuario, include: [
                                { model: Rol }
                            ]
                        }
                    ]
                }
            ]
        });
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(400).json({
                message: "Este cliente no existe en nuestra base de datos"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createCliente(req, res) {
    try {
        const dataPersona = capture( personaObj, req.body );
        const dataCliente = capture( clienteObj, req.body );
        const dataUsuario = capture( usuarioObj, req.body );
        const newUsuario = await Usuario.create(dataUsuario);
        dataPersona.idUsuario = newUsuario.dataValues.id;
        const newPersona = await Persona.create(dataPersona);
        dataCliente.idPersona = newPersona.dataValues.id;
        const newCliente = await Cliente.create(dataCliente);
        const profesion = await Profesion.findOne({
            where: {
                id: newPersona.dataValues.idProfesion
            }
        });
        const rol = await Rol.findOne({
            where: {
                id: newUsuario.dataValues.idRol
            }
        });
        newUsuario.dataValues.rol = rol.dataValues;
        newPersona.dataValues.profesion = profesion.dataValues;
        newPersona.dataValues.usuario = newUsuario.dataValues;
        newCliente.dataValues.persona = newPersona.dataValues;
        res.json(newCliente);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateCliente(req, res) {
    try {
        const { id } = req.params;
        const dataPersona = capture( personaObj, req.body );
        const dataCliente = capture( clienteObj, req.body );
        const dataUsuario = capture( usuarioObj, req.body );
        const clientes = await Cliente.findAll({
            attributes: Object.keys(clienteObj),
            where: {
                id
            }
        });
        if (clientes.length > 0) {
            var clienteRet = {};
            clienteRet = dataCliente;
            clienteRet.id = id;
            clienteRet.persona = dataPersona;
            const profesion = await Profesion.findOne({
                where: {
                    id: dataPersona.idProfesion
                }
            });
            clienteRet.persona.profesion = profesion.dataValues;
            clienteRet.persona.usuario = dataUsuario;
            const rol = await Rol.findOne({
                where: {
                    id: dataUsuario.idRol
                }
            });
            clienteRet.persona.usuario.rol = rol.dataValues;
            clientes.forEach(async cliente => {
                await cliente.update(dataCliente);
                const personas = await Persona.findAll({
                    attributes: Object.keys(personaObj),
                    where: {
                        id: cliente.dataValues.idPersona
                    }
                });
                if (personas.length > 0) {
                    personas.forEach(async persona => {
                        await persona.update(dataPersona);
                        const usuarios = await Usuario.findAll({
                            attributes: Object.keys(usuarioObj),
                            where: {
                                id: persona.dataValues.idUsuario
                            }
                        });
                        if (usuarios.length > 0) {
                            usuarios.forEach(async usuario => {
                                await usuario.update(dataUsuario);
                            });
                        }
                    });
                }
            });
            res.json(clienteRet);
        } else {
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
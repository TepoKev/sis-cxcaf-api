import { Empleado, empleadoObj } from "../models/empleado";
import { Persona, personaObj } from "../models/persona";
import { Usuario, usuarioObj } from "../models/usuario";
import { Profesion } from "../models/profesion";
import { capture } from "../utils/captureParams";

export async function getEmpleados(req, res) {
    try {
        const empleados = await Empleado.findAll({
            include: [
                {
                    model: Persona, include: [
                        { model: Usuario },
                        { model: Profesion }
                    ]
                }
            ]
        });
        res.json(empleados);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getEmpleado(req, res) {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findOne({
            where: {
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
        res.json(empleado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createEmpleado(req, res) {
    try {
        const dataEmp = capture(empleadoObj, req.body);
        const dataPerson = capture(personaObj, req.body);
        const dataUser = capture(usuarioObj, req.body);
        const newUsuario = await Usuario.create(dataUser);
        dataPerson.idUsuario = newUsuario.dataValues.id;
        const newPersona = await Persona.create(dataPerson);
        dataEmp.idPersona = newPersona.dataValues.id;
        const newEmpleado = await Empleado.create(dataEmp);
        const profesion = await Profesion.findOne({
            where: {
                id: newPersona.dataValues.idProfesion
            }
        });
        newPersona.dataValues.profesion = profesion.dataValues;
        newPersona.dataValues.usuario = newUsuario.dataValues;
        newEmpleado.dataValues.persona = newPersona.dataValues;
        res.json(newEmpleado);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateEmpleado(req, res) {
    try {
        const { id } = req.params;
        const dataEmp = capture(empleadoObj, req.body);
        const dataPerson = capture(personaObj, req.body);
        const dataUser = capture(usuarioObj, req.body);
        const empleados = await Empleado.findAll({
            attributes: Object.keys(empleadoObj),
            where: {
                id
            }
        });
        if (empleados.length > 0) {
            var empleadoRet = {};
            empleadoRet = dataEmp;
            empleadoRet.id = id;
            empleadoRet.persona = dataPerson;
            const profesion = await Profesion.findOne({
                where: {
                    id: dataPerson.idProfesion
                }
            });
            empleadoRet.persona.profesion = profesion.dataValues;
            empleadoRet.persona.usuario = dataUser;
            empleados.forEach(async empleado => {
                await empleado.update(dataEmp);
                const personas = await Persona.findAll({
                    attributes: Object.keys(personaObj),
                    where: {
                        id: empleado.dataValues.idPersona
                    }
                });
                if (personas.length > 0) {
                    personas.forEach(async persona => {
                        await persona.update(dataPerson);
                        const usuarios = await Usuario.findAll({
                            attributes: Object.keys(usuarioObj),
                            where: {
                                id: persona.dataValues.idUsuario
                            }
                        });
                        if (usuarios.length > 0) {
                            usuarios.forEach(async usuario => {
                                await usuario.update(dataUser);
                            });
                        }
                    });
                }
            });
            res.json(empleadoRet);
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

export async function getEnums(req, res) {
    try {
        res.json({
            "zona" : personaObj.zona.values,
            "genero" : personaObj.genero.values,
            "estadocivil": personaObj.estadoCivil.values,
            "cargo" : empleadoObj.cargo.values
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getEnumZona(req, res) {
    try {
        res.json(personaObj.zona.values);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getEnumGenero(req, res) {
    try {
        res.json(personaObj.genero.values);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getEnumEstadoCivil(req, res) {
    try {
        res.json(personaObj.estadoCivil.values);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getEnumCargo(req, res) {
    try {
        res.json(empleadoObj.cargo.values);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}
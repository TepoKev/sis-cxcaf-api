import Cliente from "../models/cliente";
import Persona from "../models/persona";
import Profesion from "../models/profesion";
import Usuario from "../models/usuario";
import Rol from "../models/rol";
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
            clasificacion,
            //Datos de Usuario
            username,
            password,
            idRol
        } = req.body;
        const newUsuario = await Usuario.create({
            username,
            password,
            idRol
        });
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
            estadoCivil,
            idUsuario: newUsuario.dataValues.id
        });
        const newCliente = await Cliente.create({
            tipo,
            idPersona: newPersona.id,
            clasificacion
        });
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
            clasificacion,
            //Datos de Usuario
            username,
            password,
            idRol
        } = req.body;
        const clientes = await Cliente.findAll({
            attributes: [
                "id",
                "tipo",
                "clasificacion",
                "idPersona"
            ],
            where: {
                id
            }
        });
        if (clientes.length > 0) {
            clientes.forEach(async cliente => {
                await cliente.update({
                    tipo,
                    clasificacion
                });
                const personas = await Persona.findAll({
                    attributes: [
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
                        "idUsuario",
                    ],
                    where: {
                        id: cliente.dataValues.idPersona
                    }
                });
                if (personas.length > 0) {
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
                        const usuarios = await Usuario.findAll({
                            attributes: [
                                "id",
                                "username",
                                "password",
                                "idRol"
                            ],
                            where: {
                                id: persona.dataValues.idUsuario
                            }
                        });
                        if (usuarios.length > 0) {
                            usuarios.forEach(async usuario => {
                                await usuario.update({
                                    username,
                                    password,
                                    idRol
                                });
                            });
                        }
                    });
                }
            });
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
            res.json(cliente);
        } else {
            res.status(400).json({
                message: "Alguno de los registros no se ha encontrado"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}
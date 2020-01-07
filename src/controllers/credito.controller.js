import { Credito, creditoObj } from "../models/credito";
import { capture } from "../utils/captureParams";
import { Politica } from "../models/politica";
import { Cliente } from "../models/cliente";
import { Empleado } from "../models/empleado"
import { Persona } from "../models/persona";
import { Usuario } from "../models/usuario";
import { Profesion } from "../models/profesion";

export async function getCreditos(req, res) {
    try {
        const creditos = await Credito.findAll({
            include: [
                { model: Politica },
                {
                    model: Cliente, include: [
                        {
                            model: Persona, include: [
                                { model: Usuario },
                                { model: Profesion }
                            ]
                        }
                    ]
                },
                {
                    model: Empleado, include: [
                        {
                            model: Persona, include: [
                                { model: Usuario },
                                { model: Profesion }
                            ]
                        }
                    ]
                }
            ]
        });
        res.json(creditos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getCredito(req, res) {
    try {
        const { id } = req.params;
        const credito = await Credito.findOne({
            include: [
                { model: Politica },
                {
                    model: Cliente, include: [
                        {
                            model: Persona, include: [
                                { model: Usuario },
                                { model: Profesion }
                            ]
                        }
                    ]
                },
                {
                    model: Empleado, include: [
                        {
                            model: Persona, include: [
                                { model: Usuario },
                                { model: Profesion }
                            ]
                        }
                    ]
                }
            ],
            where: {
                id
            }
        });
        if (credito) {
            res.json(credito);
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

export async function createCredito(req, res) {
    try {
        const dataCredito = capture(creditoObj, req.body);
        const newCredito = await Credito.create(dataCredito);
        res.json(newCredito);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateCredito(req, res) {
    try {
        const { id } = req.params;
        const dataCredito = capture(creditoObj, req.body);
        const creditos = await Credito.findAll({
            where: {
                id
            }
        });
        if (creditos.length > 0) {
            creditos.forEach(async credito => {
                await credito.update(dataCredito);
            });
            res.json(creditos[0]);
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
            "estado": creditoObj.estado.values,
            "tipocredito" : creditoObj.tipoCredito.values
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}
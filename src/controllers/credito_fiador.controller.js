import { CreditoFiador, creditoFiadorObj } from "../models/credito_fiador";
import { capture } from "../utils/captureParams";
import { Credito } from "../models/credito";
import { Politica } from "../models/politica";
import { Cliente } from "../models/cliente";
import { Empleado } from "../models/empleado"
import { Persona } from "../models/persona";
import { Usuario } from "../models/usuario";
import { Profesion } from "../models/profesion";
import { Rol } from "../models/rol";
import { Fiador } from "../models/fiador";

export async function getCreditosFiadores(req, res) {
    try {
        const creditosFiadores = await CreditoFiador.findAll({
            include: [
                {
                    model: Fiador, include: [
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
                },
                {
                    model: Credito, include: [
                        { model: Politica },
                        {
                            model: Cliente, include: [
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
                        },
                        {
                            model: Empleado, include: [
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
                        }
                    ]
                }
            ]
        });
        res.json(creditosFiadores);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getCreditoFiador(req, res) {
    try {
        const { id } = req.params;
        const creditoFiador = await CreditoFiador.findOne({
            include: [
                {
                    model: Fiador, include: [
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
                },
                {
                    model: Credito, include: [
                        { model: Politica },
                        {
                            model: Cliente, include: [
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
                        },
                        {
                            model: Empleado, include: [
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
                        }
                    ]
                }
            ],
            where: {
                id
            }
        });
        if (creditoFiador) {
            res.json(creditoFiador);
        } else {
            res.json({
                message: "creditoFiador no encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createCreditoFiador(req, res) {
    try {
        const dataCreditoFiador = capture(creditoFiadorObj, req.body);
        const newCreditoFiador = await CreditoFiador.create(dataCreditoFiador);
        res.json(newCreditoFiador);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateCreditoFiador(req, res) {
    try {
        const { id } = req.params;
        const dataCreditoFiador = capture(creditoFiadorObj, req.body);
        const creditosFiadores = await CreditoFiador.findAll({
            where: {
                id
            }
        });
        if (creditosFiadores.length > 0) {
            creditosFiadores.forEach(async creditoFiador => {
                await creditoFiador.update(dataCreditoFiador);
            });
            res.json(creditosFiadores[0]);
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
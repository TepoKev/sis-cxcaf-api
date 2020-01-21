import { Garantia, garantiaObj } from "../models/garantia";
import { capture } from "../utils/captureParams";
import { Credito } from "../models/credito";
import { Politica } from "../models/politica";
import { Cliente } from "../models/cliente";
import { Persona } from "../models/persona";
import { Usuario } from "../models/usuario";
import { Profesion } from "../models/profesion";

export async function getGarantias(req, res) {
    try {
        const garantias = await Garantia.findAll({
            include: [
                {
                    model: Credito, include: [
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
                        }
                    ]
                }
            ]
        });
        res.json(garantias);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getGarantia(req, res) {
    try {
        const { id } = req.params;
        const garantia = await Garantia.findOne({
            include: [
                {
                    model: Credito, include: [
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
                        }
                    ]
                }
            ],
            where: {
                id
            }
        });
        if (garantia) {
            res.json(garantia);
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

export async function createGarantia(req, res) {
    try {
        const dataGaran = capture(garantiaObj, req.body);
        const newGarantia = await Garantia.create(dataGaran);
        res.json(newGarantia);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateGarantia(req, res) {
    try {
        const { id } = req.params;
        const dataGaran = capture(garantiaObj, req.body);
        const garantias = await Garantia.findAll({
            where: {
                id
            }
        });
        if (garantias.length > 0) {
            garantias.forEach(async garantia => {
                await garantia.update(dataGaran);
            });
            res.json(garantias[0]);
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
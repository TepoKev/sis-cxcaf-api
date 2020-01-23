import { Credito, creditoObj } from "../models/credito";
import { capture } from "../utils/captureParams";
import { Politica } from "../models/politica";
import { Cliente } from "../models/cliente";
import { Persona } from "../models/persona";
import { Usuario } from "../models/usuario";
import { Profesion } from "../models/profesion";
import { Fiador } from "../models/fiador";
import { Garantia } from "../models/garantia";
import { CreditoFiador } from "../models/credito_fiador";

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
        console.log(req.body);
        const dataCredito = capture(creditoObj, req.body.credito);
        const dataGarantias = req.body.garantias;
        const dataFiadores = req.body.fiadores;
        const newCredito = await Credito.create(dataCredito);
        const newGarantias = [];
        const newFiadores = [];
        if(dataGarantias != null && dataGarantias.length > 0){
            for(var i = 0, len = dataGarantias.length; i < len ; i++){
                let newGarantia = await Garantia.create(
                    {
                        nombre : dataGarantias[i].nombre,
                        valoracionReal : dataGarantias[i].valoracion,
                        idCredito: newCredito.dataValues.id
                    }
                );
                newGarantias.push(newGarantia);
            }
        }
        if(dataFiadores != null && dataFiadores.length > 0){
            for(var i = 0, len = dataFiadores.length; i < len ; i++){
                let newPersona = await Persona.create({
                    nombres : dataFiadores[i].nombres,
                    apellidos : dataFiadores[i].apellidos,
                    dui : dataFiadores[i].dui,
                    telefono : dataFiadores[i].telefono,
                    genero : dataFiadores[i].genero,
                    salario : dataFiadores[i].salario,
                    idProfesion : dataFiadores[i].idProfesion,
                    fechaN : dataFiadores[i].fechaN,
                    direccion : dataFiadores[i].direccion,
                    zona : dataFiadores[i].zona,
                    estadoCivil : dataFiadores[i].estadoCivil,
                    idUsuario : null,
                    nit : dataFiadores[i].nit
                });
                let newFiador = await Fiador.create(
                    {
                        idPersona: newPersona.dataValues.id
                    }
                );
                let newCreditoFiador = await CreditoFiador.create({
                    idFiador : newFiador.dataValues.id,
                    idCredito : newCredito.dataValues.id,
                    estado : true
                });
                newFiadores.push(newFiador);
            }
        }
        res.json({
            newCredito,
            newFiadores,
            newGarantias
        });
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
import { ActivoFijoBaja, activoFijoBajaObj } from "../models/activo_fijo_baja";
import { capture } from "../utils/captureParams";
import { ActivoFijo } from "../models/activo_fijo";
import { Empleado } from "../models/empleado";
import { Departamento } from "../models/departamento";
import { Marca } from "../models/marca";
import { Sucursal } from "../models/sucursal";
import { TipoActivo } from "../models/tipo_activo";
import { Persona } from "../models/persona";
import { Usuario } from "../models/usuario";
import { Profesion } from "../models/profesion";
import { Rol } from "../models/rol";

export async function getActivosFijosBajas(req, res) {
    try {
        const activosFijosBajas = await ActivoFijoBaja.findAll({
            include: [
                {
                    model: ActivoFijo, include: [
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
                        },
                        { model: Departamento },
                        { model: Marca },
                        { model: Sucursal },
                        { model: TipoActivo }
                    ]
                }
            ]
        });
        res.json(activosFijosBajas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getActivoFijoBaja(req, res) {
    try {
        const { id } = req.params;
        const activoFijoBaja = await ActivoFijoBaja.findOne({
            include: [
                {
                    model: ActivoFijo, include: [
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
                        },
                        { model: Departamento },
                        { model: Marca },
                        { model: Sucursal },
                        { model: TipoActivo }
                    ]
                }
            ],
            where: {
                id
            }
        });
        if (activoFijoBaja) {
            res.json(activoFijoBaja);
        } else {
            res.json({
                message: "Activo Fijo Baja no encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createActivoFijoBaja(req, res) {
    try {
        const dataAFB = capture(activoFijoBajaObj, req.body);
        const newActivoFijoBaja = await ActivoFijoBaja.create(dataAFB);
        res.json(newActivoFijoBaja);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateActivoFijoBaja(req, res) {
    try {
        const { id } = req.params;
        const dataAFB = capture(activoFijoBajaObj, req.body);
        const activosFijosBajas = await ActivoFijoBaja.findAll({
            where: {
                id
            }
        });
        if (activosFijosBajas.length > 0) {
            activosFijosBajas.forEach(async activoFijoBaja => {
                await activoFijoBaja.update(dataAFB);
            });
            res.json(activosFijosBajas[0]);
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
import { ActivoFijo, activoFijoObj } from "../models/activo_fijo";
import { capture } from "../utils/captureParams";
import { Departamento } from "../models/departamento";
import { Marca } from "../models/marca";
import { Sucursal } from "../models/sucursal";
import { TipoActivo } from "../models/tipo_activo";
import { sequelize } from "../database/database";

export async function getActivosFijos(req, res) {
    try {
        // const activosFijos = await ActivoFijo.findAll(
        //     {
        //         include: [
        //             { model: Departamento },
        //             { model: Marca },
        //             { model: Sucursal },
        //             { model: TipoActivo }
        //         ],
        //     }
        // );
        const activosFijos = await sequelize.query('SELECT * FROM activo_fijo WHERE id NOT IN (SELECT idActivoFijo FROM activo_fijo_baja)', {
            model: ActivoFijo,
            mapToModel: true // pass true here if you have any mapped fields
        });
        res.json(activosFijos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getActivoFijo(req, res) {
    try {
        const { id } = req.params;
        const activoFijo = await ActivoFijo.findOne({
            include: [
                { model: Departamento },
                { model: Marca },
                { model: Sucursal },
                { model: TipoActivo }
            ],
            where: {
                id
            }
        });
        if (activoFijo) {
            res.json(activoFijo);
        } else {
            res.json({
                message: "Activo Fijo no encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createActivoFijo(req, res) {
    try {
        const dataAF = capture(activoFijoObj, req.body);
        const newActivoFijo = await ActivoFijo.create(dataAF);
        res.json(newActivoFijo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateactivoFijo(req, res) {
    try {
        const { id } = req.params;
        const dataAF = capture(activoFijoObj, req.body);
        const activosFijos = await ActivoFijo.findAll({
            where: {
                id
            }
        });
        if (activosFijos.length > 0) {
            activosFijos.forEach(async activoFijo => {
                await activoFijo.update(dataAF);
            });
            res.json(activosFijos[0]);
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
            "procedencia": activoFijoObj.procedencia.values
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}
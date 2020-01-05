import { TipoActivo, tipoActivoObj } from "../models/tipo_activo";
import { capture } from "../utils/captureParams";

export async function getTiposActivo( req, res ){
    try {
        const tiposactivo = await TipoActivo.findAll();
        res.json(tiposactivo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getTipoActivo( req, res ){
    try {
        const { id } = req.params;
        const tipoactivo = await TipoActivo.findOne({
            where : {
                id
            }
        });
        if( tipoactivo ){
            res.json(tipoactivo);
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

export async function createTipoActivo( req, res ){
    try {
        const dataTA = capture( tipoActivoObj, req.body );
        const newTipoActivo = await TipoActivo.create(dataTA);
        res.json(newTipoActivo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateTipoActivo( req, res ){
    try {
        const { id } = req.params;
        const dataTA = capture( tipoActivoObj, req.body );
        const tiposactivo = await TipoActivo.findAll({
            where : {
                id
            }
        });
        if (tiposactivo.length > 0) {
            tiposactivo.forEach(async tipoactivo => {
                await tipoactivo.update(dataTA);
            });
            res.json(tiposactivo[0]);
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
import { Profesion, profesionObj } from "../models/profesion";
import { capture } from "../utils/captureParams";

export async function getProfesiones( req, res ){
    try {
        const profesiones = await Profesion.findAll();
        res.json(profesiones);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getProfesion( req, res ){
    try {
        const { id } = req.params;
        const profesion = await Profesion.findOne({
            where : {
                id
            }
        });
        if(profesion){
            res.json(profesion);
        }else{
            res.json({
                message : "Profesion no encontrada"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createProfesion( req, res ){
    try {
        const dataProfesion = capture( profesionObj, req.body );
        const newProfesion = await Profesion.create(dataProfesion);
        res.json(newProfesion);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateProfesion( req, res ){
    try {
        const { id } = req.params;
        const dataProfesion = capture( profesionObj, req.body );
        const profesiones = await Profesion.findAll({
            where : {
                id
            }
        });
        if(profesiones.length > 0){
            profesiones.forEach(async profesion => {
                await profesion.update(dataProfesion);
            });
            res.json(profesiones[0]);
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
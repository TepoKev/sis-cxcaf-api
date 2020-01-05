import { Politica, politicaObj } from "../models/politica";
import { capture } from "../utils/captureParams";

export async function getPoliticas( req, res ){
    try {
        const politicas = await Politica.findAll();
        res.json(politicas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getPolitica( req, res ){
    try {
        const { id } = req.params;
        const politica = await Politica.findOne({
            where : {
                id
            }
        });
        if (politica) {
            res.json(politica);
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

export async function createPolitica( req, res ){
    try {
        const dataPol = capture( politicaObj, req.body );
        const newPolitica = await Politica.create(dataPol);
        res.json(newPolitica);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updatePolitica( req, res ){
    try {
        const { id } = req.params;
        const dataPolitica = capture( politicaObj, req.body );
        const politicas = await Politica.findAll({
            where : {
                id
            }
        });
        if(politicas.length > 0){
            politicas.forEach(async politica =>{
                await politica.update(dataPolitica);
            });
            res.json(politicas[0]);
        }else{
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
import { Marca, marcaObj } from "../models/marca";
import { capture } from "../utils/captureParams";

export async function getMarcas( req, res ){
    try {
        const marcas = await Marca.findAll();
        res.json(marcas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getMarca( req, res ){
    try {
        const { id } = req.params;
        const marca = await Marca.findOne({
            where : {
                id
            }
        });
        if(marca){
            res.json(marca);
        } else {
            res.json({
                massage : "Marca no encontrada"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createMarca( req, res ){
    try {
        const dataMarca = capture( marcaObj, req.body );
        const newMarca = await Marca.create(dataMarca);
        res.json(newMarca);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateMarca( req, res ){
    try {
        const { id } = req.params;
        const dataMarca = capture( marcaObj, req.body );
        const marcas = await Marca.findAll({
            where : {
                id
            }
        });
        if(marcas.length > 0){
            marcas.forEach(async marca => {
                await marca.update(dataMarca);
            });
            res.json(marcas[0]);
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
import { Sucursal, sucursalObj } from "../models/sucursal";
import { capture } from "../utils/captureParams";

export async function getSucursales( req, res ){
    try {
        const sucursales = await Sucursal.findAll();
        res.json(sucursales);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getSucursal( req, res ){
    try {
        const { id } = req.params;
        const sucursal = await Sucursal.findOne({
            where : {
                id
            }
        });
        if(sucursal){
            res.json(sucursal);
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

export async function createSucursal( req, res ){
    try {
        const dataSucur = capture( sucursalObj, req.body );
        const newSucursal = await Sucursal.create(dataSucur);
        res.json(newSucursal);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateSucursal( req, res ){
    try {
        const { id } = req.params;
        const dataSucur = capture( sucursalObj, req.body );
        const sucursales = await Sucursal.findAll({
            where : {
                id
            }
        });
        if(sucursales.length > 0){
            sucursales.forEach(async sucursal =>{
                await sucursal.update(dataSucur);
            });
            res.json(sucursales[0]);
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
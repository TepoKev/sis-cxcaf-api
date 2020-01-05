import { Cuota, cuotaObj } from "../models/cuota";
import { capture } from "../utils/captureParams";
import { Credito } from "../models/credito";
import { Empleado } from "../models/empleado";

export async function getCuotas( req, res ){
    try {
        const cuotas = await Cuota.findAll({
            include : [
                { model : Credito },
                { model: Empleado }
            ]
        });
        res.json(cuotas);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getCuota( req, res ){
    try {
        const { id } = req.params;
        const cuota = await Cuota.findOne({
            include : [
                { model : Credito },
                { model: Empleado }
            ],
            where : {
                id
            }
        });
        if(cuota){
            res.json(cuota);
        }else{
            res.json({
                message : "cuota no encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createCuota( req, res ){
    try {
        const dataCuota = capture( cuotaObj, req.body );
        const newCuota = await Cuota.create(dataCuota);
        res.json(newCuota);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateCuota( req, res ){
    try {
        const { id } = req.params;
        const dataCuota = capture( cuotaObj, req.body );
        const cuotas = await Cuota.findAll({
            where : {
                id
            }
        });
        if(cuotas.length > 0){
            cuotas.forEach(async cuota => {
                await cuota.update(dataCuota);
            });
            res.json(cuotas[0]);
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
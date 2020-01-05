import { Departamento, departamentoObj } from "../models/departamento";
import { capture } from "../utils/captureParams";

export async function getDepartamentos( req, res ){
    try {
        const departamentos = await Departamento.findAll();
        res.json(departamentos);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function getDepartamento( req, res ){
    try {
        const { id } = req.params;
        const departamento = await Departamento.findOne({
            where : {
                id
            }
        });
        if(departamento){
            res.json(departamento);
        }else{
            res.json({
                message : "Departamento no encontrado"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function createDepartamento( req, res ){
    try {
        const dataDep = capture( departamentoObj, req.body );
        const newDep = await Departamento.create(dataDep);
        res.json(newDep);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error en el servidor"
        });
    }
}

export async function updateDepartamento( req, res ){
    try {
        const { id } = req.params;
        const dataDep = capture( departamentoObj, req.body );
        const departamentos = await Departamento.findAll({
            where : {
                id
            }
        });
        if(departamentos.length > 0){
            departamentos.forEach(async departamento => {
                await departamento.update(dataDep);
            });
            res.json(departamentos[0]);
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
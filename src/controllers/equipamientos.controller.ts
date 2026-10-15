import { Request, Response } from 'express';

export class EquipmentController {

    public static createEquipment = (req: Request, res: Response): void => {

        res.status(501).json({
            success: false,
            message: 'El registro de equipos todavía no está implementado.'
        });
    };

    public static getEquipment = (req: Request, res: Response): void => {

        res.status(501).json({
            success: false,
            message: 'El listado de equipos todavía no está implementado.'
        });
    };

    public static updateEquipment = (req: Request, res: Response): void => {
        const { id } = req.params;
  
        res.status(501).json({
            success: false,
            message: `La actualización parcial del equipo ${id} todavía no está implementada.`
        });
    };
}
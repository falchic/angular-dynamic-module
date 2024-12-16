import { Request, Response } from 'express';
import { MODULI } from './db-data';

export function getAllModuli(req: Request, res: Response) {
    let moduli = MODULI as Modulo[];
    moduli = moduli.filter(m => m.stato == "APERTO");
    res.status(200).json(moduli);
}

export function getModuloById(req: Request, res: Response) {
    const modId = req.params["id"];
    const moduli = MODULI as Modulo[];
    const modulo = moduli.find(m => m.id == modId);
    res.status(200).json(modulo);
}

interface Modulo {
    id: string;
    nome: string;
    stato: string;
    categoria: string;
    dataInizio: Date;
    dataFine: Date;
}
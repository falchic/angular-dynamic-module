import * as express from 'express';
import * as cors from 'cors';
import { Application } from "express";
import { getAllModuli, getModuloById, } from './get-moduli.route';

const app: Application = express();
app.use(cors());

app.route('/api/moduli').get(getAllModuli);
app.route('/api/moduli/:id').get(getModuloById);

const httpServer: any = app.listen(9000, () => {
    console.log("HTTP REST API Server running at http://localhost:" + httpServer.address().port);
});
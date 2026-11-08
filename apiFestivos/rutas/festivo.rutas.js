const express = require('express');
const festivoControlador = require('../controladores/festivo.controlador');
const festivoValidador = require('../validadores/festivo.validador');

class FestivoRutas {
    constructor() {
        this.router = express.Router();
        this._configurarRutas();
    }

    _configurarRutas() {
        /**
        * @swagger
        * /api/festivos/verificar/{anio}/{mes}/{dia}:
        *   get:
        *     summary: Verifica si una fecha es festiva
        *     description: Retorna "Es Festivo", "No es festivo" o "Fecha No valida"
        *     tags:
        *       - Festivos
        *     parameters:
        *       - in: path
        *         name: anio
        *         required: true
        *         schema:
        *           type: integer
        *           example: 2023
        *       - in: path
        *         name: mes
        *         required: true
        *         schema:
        *           type: integer
        *           example: 6
        *       - in: path
        *         name: dia
        *         required: true
        *         schema:
        *           type: integer
        *           example: 12
        *     responses:
        *       200:
        *         description: Resultado de la verificación
        *         content:
        *           text/plain:
        *             schema:
        *               type: string
        *               example: Es Festivo
        *       500:
        *         description: Error del servidor
        */
        this.router.get('/verificar/:anio/:mes/:dia',
            festivoValidador.validarFechaParams,
            (req, res) => festivoControlador.verificar(req, res)
        );

        /**
        * @swagger
        * /api/festivos/obtener/{anio}:
        *   get:
        *     summary: Retorna la lista de todos los festivos de un año
        *     description: Devuelve una lista con el nombre del festivo y su fecha calculada (YYYY-MM-DD)
        *     tags:
        *       - Festivos
        *     parameters:
        *       - in: path
        *         name: anio
        *         required: true
        *         schema:
        *           type: integer
        *           example: 2023
        *     responses:
        *       200:
        *         description: Lista de festivos del año
        *         content:
        *           application/json:
        *             schema:
        *               type: array
        *               items:
        *                 type: object
        *                 properties:
        *                   festivo:
        *                     type: string
        *                     example: Año nuevo
        *                   fecha:
        *                     type: string
        *                     example: 2023-01-01
        *       400:
        *         description: Año no válido
        *       500:
        *         description: Error del servidor
        */
        this.router.get('/obtener/:anio',
            (req, res) => festivoControlador.obtenerPorAnio(req, res)
        );
    }

    get obtenerRouter() {
        return this.router;
    }
}

module.exports = new FestivoRutas().obtenerRouter;

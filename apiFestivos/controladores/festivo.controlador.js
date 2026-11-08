const festivoServicio = require('../servicios/festivo.servicio');

class FestivoControlador {

    async verificar({ params }, respuesta) {
        try {
            const anio = Number(params.anio);
            const mes = Number(params.mes);
            const dia = Number(params.dia);

            if (!festivoServicio.esFechaValida(anio, mes, dia)) {
                return respuesta.type('text').send("Fecha No valida");
            }

            const esFestivo = await festivoServicio.esFestivo(anio, mes, dia);
            return respuesta.type('text').send(esFestivo ? "Es Festivo" : "No es festivo");
        } catch (error) {
            return respuesta.status(500).json({
                mensaje: "Error verificando la fecha"
            });
        }
    }

    async obtenerPorAnio({ params }, respuesta) {
        try {
            const anio = Number(params.anio);
            if (!anio || isNaN(anio) || anio < 1900 || anio > 2100) {
                return respuesta.status(400).json({
                    mensaje: "Año no válido"
                });
            }

            const festivos = await festivoServicio.listarFestivosDto(anio);
            return respuesta.json(festivos);
        } catch (error) {
            return respuesta.status(500).json({
                mensaje: "Error obteniendo los festivos del año"
            });
        }
    }
}

module.exports = new FestivoControlador();

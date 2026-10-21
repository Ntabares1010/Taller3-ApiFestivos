const festivoRepositorio = require('../repositorios/festivo.repositorio');
const { obtenerDomingoRamos, agregarDias, siguienteLunes } = require('./ServicioFechas');

// Tipos de festivo según la colección 'tipos'
const TIPO_FIJO = 1;
const TIPO_PUENTE = 2;
const TIPO_PASCUA = 3;
const TIPO_PASCUA_PUENTE = 4;

class FestivoServicio {

    /**
     * Valida que año, mes y día formen una fecha real del calendario
     */
    esFechaValida(anio, mes, dia) {
        const fecha = new Date(anio, mes - 1, dia);
        return fecha.getFullYear() === anio
            && fecha.getMonth() === mes - 1
            && fecha.getDate() === dia;
    }

    /**
     * Calcula la fecha real de cada festivo para el año indicado
     */
    async obtenerFestivos(anio) {
        const tipos = await festivoRepositorio.listarTipos();
        // El domingo de pascua es 7 días después del domingo de ramos
        const domingoPascua = agregarDias(obtenerDomingoRamos(anio), 7);

        const festivos = [];
        for (const tipo of tipos) {
            for (const festivo of tipo.festivos || []) {
                const fecha = this._calcularFecha(tipo.id, festivo, anio, domingoPascua);
                if (fecha) festivos.push({ nombre: festivo.nombre, fecha });
            }
        }
        return festivos.sort((a, b) => a.fecha - b.fecha);
    }

    /**
     * Indica si la fecha dada corresponde a un festivo
     */
    async esFestivo(anio, mes, dia) {
        const festivos = await this.obtenerFestivos(anio);
        return festivos.some(({ fecha }) =>
            fecha.getMonth() === mes - 1 && fecha.getDate() === dia
        );
    }

    _calcularFecha(idTipo, festivo, anio, domingoPascua) {
        switch (idTipo) {
            case TIPO_FIJO:
                return new Date(anio, festivo.mes - 1, festivo.dia);
            case TIPO_PUENTE:
                return siguienteLunes(new Date(anio, festivo.mes - 1, festivo.dia));
            case TIPO_PASCUA:
                return agregarDias(domingoPascua, festivo.diasPascua);
            case TIPO_PASCUA_PUENTE:
                return siguienteLunes(agregarDias(domingoPascua, festivo.diasPascua));
            default:
                return null;
        }
    }
}

module.exports = new FestivoServicio();

class FestivoValidador {

    /**
     * Valida que año, mes y día de la URL sean números enteros.
     * Si son números pero no forman una fecha real (ej. 35 de febrero),
     * el controlador responde "Fecha No valida".
     */
    validarFechaParams(solicitud, respuesta, next) {
        const { anio, mes, dia } = solicitud.params;
        const esEntero = (valor) => /^\d+$/.test(valor);

        if (!esEntero(anio) || !esEntero(mes) || !esEntero(dia)) {
            return respuesta.type('text').send("Fecha No valida");
        }
        next();
    }
}

module.exports = new FestivoValidador();

const bd = require('./bd');

class FestivoRepositorio {
    constructor() {
        this.collectionName = 'tipos';
    }

    /**
     * Helper privado para obtener la colección
     */
    get _collection() {
        return bd.obtenerBD().collection(this.collectionName);
    }

    /**
     * Retorna los tipos de festivo con su lista de festivos
     */
    async listarTipos() {
        try {
            return await this._collection
                .find()
                .project({ _id: 0, id: 1, tipo: 1, modoCalculo: 1, festivos: 1 })
                .sort({ id: 1 })
                .toArray();
        } catch (error) {
            this._handleError('listarTipos', error);
        }
    }

    _handleError(metodo, error) {
        console.error(`Error en FestivoRepositorio.${metodo}:`, error);
        throw error; // Re-lanzar para que el controlador lo maneje
    }
}

module.exports = new FestivoRepositorio(); // Exportamos una instancia (Singleton)

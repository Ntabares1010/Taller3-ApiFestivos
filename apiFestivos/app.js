const express = require('express');
const conexionBD = require('./repositorios/bd');
const festivoRutas = require('./rutas/festivo.rutas');
const swaggerConfig = require('./configuracion/swagger');

class App {
    constructor() {
        this.app = express();
        this.puerto = process.env.PORT || 8080;

        this._conectarBaseDatos();
        this._configurarMiddlewares();
        this._configurarDocumentacion();
        this._configurarRutas();
        this._configurarManejoErrores();
    }

    _configurarDocumentacion() {
        swaggerConfig.configurar(this.app);
    }

    async _conectarBaseDatos() {
        try {
            await conexionBD.conectar();
        } catch (error) {
            console.error("Fallo crítico: No se pudo iniciar la base de datos.");
            process.exit(1);
        }
    }

    _configurarMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    _configurarRutas() {
        // Ruta base de prueba
        this.app.get('/', (req, res) => res.json({ estado: "Online" }));

        // Rutas de la API
        this.app.use('/api/festivos', festivoRutas);
    }

    _configurarManejoErrores() {
        // Middleware global para capturar rutas no encontradas
        this.app.use((req, res) => {
            res.status(404).json({ mensaje: "Ruta no encontrada" });
        });
    }

    escuchar() {
        this.app.listen(this.puerto, () => {
            console.log(`API Festivos corriendo en: http://localhost:${this.puerto}`);
        });
    }
}

module.exports = new App();

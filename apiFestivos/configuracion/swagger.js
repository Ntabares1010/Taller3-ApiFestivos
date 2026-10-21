const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

class SwaggerConfig {
    constructor() {
        this.puerto = process.env.PORT || 8080;
        this.options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'API Festivos',
                    version: '1.0.0',
                    description: 'Microservicio para validar si una fecha es festiva en Colombia',
                },
                servers: [
                    {
                        url: `http://localhost:${this.puerto}`,
                        description: 'Servidor Local de Pruebas'
                    },
                ],
            },
            // El glob de swagger-jsdoc requiere '/' (en Windows path.join usa '\')
            apis: [path.join(__dirname, '../rutas/*.js').split(path.sep).join('/')],
        };
        this.spec = swaggerJsDoc(this.options);
    }

    /**
     * Configura Swagger en la aplicación Express recibida
     * @param {express.Application} app
     */
    configurar(app) {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.spec));
        console.log(`📖 Documentación Swagger disponible en: http://localhost:${this.puerto}/api-docs`);
    }
}

module.exports = new SwaggerConfig();

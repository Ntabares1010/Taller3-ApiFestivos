# API Festivos (Express + MongoDB)

Servicio web que valida si una fecha es festiva en Colombia, usando la base de datos `Festivos`, colección `tipos`.

## Ejecución

```bash
npm install
cp .env.example .env
npm start
```

## Endpoint

`GET /api/festivos/verificar/{anio}/{mes}/{dia}`

| Ejemplo | Respuesta |
|---|---|
| `/api/festivos/verificar/2023/6/12` | `Es Festivo` |
| `/api/festivos/verificar/2023/2/28` | `No es festivo` |
| `/api/festivos/verificar/2023/2/35` | `Fecha No valida` |

Documentación Swagger: `http://localhost:8080/api-docs`

## Tipos de festivo (colección `tipos`)

1. **Fijo**: la fecha no varía.
2. **Ley de Puente festivo**: se traslada al siguiente lunes.
3. **Basado en el domingo de pascua**: domingo de pascua + `diasPascua`.
4. **Pascua + Puente festivo**: domingo de pascua + `diasPascua`, trasladado al siguiente lunes.

El domingo de pascua se calcula como el domingo de ramos + 7 días (`servicios/ServicioFechas.js`).

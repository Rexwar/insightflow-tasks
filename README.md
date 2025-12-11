# InsightFlow Tasks Service

Microservicio de gestión de tareas para la plataforma InsightFlow.

## 🚀 Tecnologías

- Node.js 18+
- Express.js
- UUID v4
- Docker

## 📋 Características

- CRUD completo de tareas
- Soft delete para preservar trazabilidad
- Validación de datos con middlewares
- Arquitectura de microservicios
- API RESTful

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor
npm start
```

## 📡 Endpoints

- `POST /tasks\` - Crear tarea
- `GET /documents/:documentId/tasks\` - Listar tareas por documento
- `GET /tasks/:id\` - Obtener tarea específica
- `PUT /tasks/:id/status\` - Actualizar estado
- `PATCH /tasks/:id\` - Actualizar tarea
- `DELETE /tasks/:id\` - Eliminar tarea (soft delete)

## 🐳 Docker

```bash
# Construir imagen
docker build -t insightflow-tasks .

# Ejecutar contenedor
docker run -p 3004:3004 insightflow-tasks
```

## 👥 Autor

- Rey Valdes M - 19537900-9

## 📄 Licencia

Este proyecto es parte del Taller 3 de Arquitectura de Sistemas - UCN

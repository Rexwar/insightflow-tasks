/**
 * Configuración principal de la aplicación Express
 * Define middlewares globales y rutas
 */

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');

// Crear instancia de Express
const app = express();

// ===== MIDDLEWARES GLOBALES =====

/**
 * CORS - Permitir peticiones desde cualquier origen
 * Necesario para que el frontend pueda consumir la API
 */
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

/**
 * Morgan - Logger de peticiones HTTP
 * Útil para debugging y monitoreo
 */
app.use(morgan('dev'));

/**
 * Body Parser - Parsear JSON en peticiones
 * Permite leer req.body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== RUTAS =====

/**
 * Ruta de health check
 * Útil para verificar que el servicio está funcionando
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'InsightFlow Tasks Service - API funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      health: 'GET /',
      createTask: 'POST /tasks',
      getTasksByDocument: 'GET /documents/:documentId/tasks',
      getTaskById: 'GET /tasks/:id',
      updateTaskStatus: 'PUT /tasks/:id/status',
      updateTask: 'PATCH /tasks/:id',
      deleteTask: 'DELETE /tasks/:id'
    }
  });
});

/**
 * Health check endpoint
 * Útil para monitoreo de servicios (Render, Docker, etc.)
 */
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Service is healthy',
    timestamp: new Date().toISOString()
  });
});

/**
 * Rutas de tareas
 * Todas las rutas definidas en taskRoutes.js
 */
app.use('/', taskRoutes);

// ===== MANEJO DE ERRORES =====

/**
 * Ruta no encontrada - 404
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.path
  });
});

/**
 * Manejador de errores global
 */
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;

/**
 * Rutas para el servicio de Tareas
 * Define los endpoints y asocia los controladores
 */

const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasksByDocument,
  getTaskById,
  updateTaskStatus,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const {
  validateUUIDParam,
  validateDate,
  validateRequiredFields,
  validateBodyNotEmpty
} = require('../middlewares/validation');

/**
 * POST /tasks
 * Crear nueva tarea
 * Body: { document_id, title, description?, status?, assigned_to?, due_date? }
 */
router.post(
  '/tasks',
  validateRequiredFields(['document_id', 'title']),
  validateDate,
  createTask
);

/**
 * GET /documents/:documentId/tasks
 * Obtener todas las tareas de un documento
 */
router.get(
  '/documents/:documentId/tasks',
  validateUUIDParam('documentId'),
  getTasksByDocument
);

/**
 * GET /tasks/:id
 * Obtener tarea por ID
 */
router.get(
  '/tasks/:id',
  validateUUIDParam('id'),
  getTaskById
);

/**
 * PUT /tasks/:id/status
 * Actualizar solo el estado de una tarea
 * Body: { status }
 */
router.put(
  '/tasks/:id/status',
  validateUUIDParam('id'),
  validateBodyNotEmpty,
  updateTaskStatus
);

/**
 * PATCH /tasks/:id
 * Actualizar campos de una tarea
 * Body: { title?, description?, status?, assigned_to?, due_date? }
 */
router.patch(
  '/tasks/:id',
  validateUUIDParam('id'),
  validateBodyNotEmpty,
  validateDate,
  updateTask
);

/**
 * DELETE /tasks/:id
 * Eliminar tarea (soft delete)
 */
router.delete(
  '/tasks/:id',
  validateUUIDParam('id'),
  deleteTask
);

module.exports = router;

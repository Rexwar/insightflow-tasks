/**
 * Controlador de Tareas
 * Maneja la lógica de negocio para las operaciones CRUD de tareas
 */

const TaskModel = require('../models/taskModel');
const { success, error } = require('../utils/responses');

/**
 * Crear nueva tarea
 * POST /tasks
 */
const createTask = (req, res) => {
  try {
    const { document_id, title, description, status, assigned_to, due_date } = req.body;

    // Validar campos requeridos
    if (!document_id || !title) {
      return error(res, 400, 'document_id y title son campos requeridos');
    }

    // Verificar que el documento existe (simulado)
    if (!TaskModel.documentExists(document_id)) {
      return error(res, 400, 'El document_id no tiene un formato UUID válido');
    }

    // Crear tarea
    const newTask = TaskModel.create({
      document_id,
      title,
      description,
      status,
      assigned_to,
      due_date
    });

    return success(res, 201, newTask, 'Tarea creada exitosamente');
  } catch (err) {
    console.error('Error al crear tarea:', err);
    return error(res, 500, 'Error al crear la tarea');
  }
};

/**
 * Obtener todas las tareas de un documento
 * GET /documents/:documentId/tasks
 */
const getTasksByDocument = (req, res) => {
  try {
    const { documentId } = req.params;

    // Verificar que el documento existe (simulado)
    if (!TaskModel.documentExists(documentId)) {
      return error(res, 400, 'El documentId no tiene un formato UUID válido');
    }

    const tasks = TaskModel.getByDocumentId(documentId);

    return success(res, 200, tasks, 'Tareas obtenidas exitosamente');
  } catch (err) {
    console.error('Error al obtener tareas:', err);
    return error(res, 500, 'Error al obtener las tareas');
  }
};

/**
 * Obtener tarea por ID
 * GET /tasks/:id
 */
const getTaskById = (req, res) => {
  try {
    const { id } = req.params;

    const task = TaskModel.getById(id);

    if (!task) {
      return error(res, 404, 'Tarea no encontrada');
    }

    return success(res, 200, task, 'Tarea obtenida exitosamente');
  } catch (err) {
    console.error('Error al obtener tarea:', err);
    return error(res, 500, 'Error al obtener la tarea');
  }
};

/**
 * Actualizar estado de tarea
 * PUT /tasks/:id/status
 */
const updateTaskStatus = (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validar campo requerido
    if (!status) {
      return error(res, 400, 'El campo status es requerido');
    }

    // Validar valores permitidos
    const validStatuses = ['Pendiente', 'En Progreso', 'Completado'];
    if (!validStatuses.includes(status)) {
      return error(res, 400, `El status debe ser: ${validStatuses.join(', ')}` );
    }

    const updatedTask = TaskModel.updateStatus(id, status);

    if (!updatedTask) {
      return error(res, 404, 'Tarea no encontrada');
    }

    return success(res, 200, updatedTask, 'Estado de tarea actualizado exitosamente');
  } catch (err) {
    console.error('Error al actualizar estado:', err);
    return error(res, 500, 'Error al actualizar el estado de la tarea');
  }
};

/**
 * Actualizar tarea completa
 * PATCH /tasks/:id
 */
const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // No permitir actualizar estos campos
    delete updates.id;
    delete updates.created_at;
    delete updates.is_active;

    const updatedTask = TaskModel.update(id, updates);

    if (!updatedTask) {
      return error(res, 404, 'Tarea no encontrada');
    }

    return success(res, 200, updatedTask, 'Tarea actualizada exitosamente');
  } catch (err) {
    console.error('Error al actualizar tarea:', err);
    return error(res, 500, 'Error al actualizar la tarea');
  }
};

/**
 * Eliminar tarea (Soft Delete)
 * DELETE /tasks/:id
 */
const deleteTask = (req, res) => {
  try {
    const { id } = req.params;

    const deleted = TaskModel.delete(id);

    if (!deleted) {
      return error(res, 404, 'Tarea no encontrada');
    }

    return success(res, 200, { id }, 'Tarea eliminada exitosamente');
  } catch (err) {
    console.error('Error al eliminar tarea:', err);
    return error(res, 500, 'Error al eliminar la tarea');
  }
};

module.exports = {
  createTask,
  getTasksByDocument,
  getTaskById,
  updateTaskStatus,
  updateTask,
  deleteTask
};

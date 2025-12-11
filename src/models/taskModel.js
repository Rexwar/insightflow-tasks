/**
 * Modelo de datos para Tasks (en memoria)
 * Simula una base de datos sin persistencia real
 */

const { v4: uuidv4 } = require('uuid');
const { sampleTasks } = require('../config/seeders');

/**
 * Base de datos en memoria
 * Se reinicia cada vez que el servicio se reinicia
 */
let tasks = [...sampleTasks];

/**
 * Modelo de Task
 */
class TaskModel {
  /**
   * Obtener todas las tareas
   * @returns {Array} Lista de tareas activas
   */
  static getAll() {
    return tasks.filter(task => task.is_active);
  }

  /**
   * Obtener tareas por ID de documento
   * @param {string} documentId - ID del documento
   * @returns {Array} Lista de tareas del documento
   */
  static getByDocumentId(documentId) {
    return tasks.filter(task => 
      task.document_id === documentId && task.is_active
    );
  }

  /**
   * Obtener tarea por ID
   * @param {string} id - ID de la tarea
   * @returns {object|null} Tarea encontrada o null
   */
  static getById(id) {
    const task = tasks.find(task => task.id === id && task.is_active);
    return task || null;
  }

  /**
   * Crear nueva tarea
   * @param {object} taskData - Datos de la tarea
   * @returns {object} Tarea creada
   */
  static create(taskData) {
    const newTask = {
      id: uuidv4(),
      document_id: taskData.document_id,
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status || 'Pendiente',
      assigned_to: taskData.assigned_to || null,
      due_date: taskData.due_date || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_active: true
    };

    tasks.push(newTask);
    return newTask;
  }

  /**
   * Actualizar tarea
   * @param {string} id - ID de la tarea
   * @param {object} updates - Datos a actualizar
   * @returns {object|null} Tarea actualizada o null
   */
  static update(id, updates) {
    const index = tasks.findIndex(task => task.id === id && task.is_active);
    
    if (index === -1) return null;

    tasks[index] = {
      ...tasks[index],
      ...updates,
      id: tasks[index].id,
      created_at: tasks[index].created_at,
      updated_at: new Date().toISOString()
    };

    return tasks[index];
  }

  /**
   * Actualizar solo el estado de una tarea
   * @param {string} id - ID de la tarea
   * @param {string} status - Nuevo estado
   * @returns {object|null} Tarea actualizada o null
   */
  static updateStatus(id, status) {
    return this.update(id, { status });
  }

  /**
   * Eliminar tarea (Soft Delete)
   * @param {string} id - ID de la tarea
   * @returns {boolean} true si se eliminó, false si no
   */
  static delete(id) {
    const index = tasks.findIndex(task => task.id === id && task.is_active);
    
    if (index === -1) return false;

    tasks[index].is_active = false;
    tasks[index].updated_at = new Date().toISOString();
    
    return true;
  }

  /**
   * Verificar si existe un documento (simulado)
   * @param {string} documentId - ID del documento
   * @returns {boolean} true si existe
   */
  static documentExists(documentId) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(documentId);
  }
}

module.exports = TaskModel;

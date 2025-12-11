/**
 * Datos de ejemplo (seeders) para pruebas
 * Estos datos se cargan en memoria al iniciar el servicio
 */

const { v4: uuidv4 } = require('uuid');

/**
 * Usuarios de ejemplo (simulados de Users Service)
 */
const sampleUsers = [
  {
    id: uuidv4(),
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    username: 'juanp'
  },
  {
    id: uuidv4(),
    name: 'María González',
    email: 'maria.gonzalez@example.com',
    username: 'mariag'
  },
  {
    id: uuidv4(),
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@example.com',
    username: 'carlosr'
  }
];

/**
 * Documentos de ejemplo (simulados de Documents Service)
 */
const sampleDocuments = [
  {
    id: uuidv4(),
    title: 'Proyecto Q4 2024',
    workspace_id: uuidv4()
  },
  {
    id: uuidv4(),
    title: 'Desarrollo Frontend',
    workspace_id: uuidv4()
  },
  {
    id: uuidv4(),
    title: 'Planificación Sprint',
    workspace_id: uuidv4()
  }
];

/**
 * Tareas de ejemplo
 */
const sampleTasks = [
  {
    id: uuidv4(),
    document_id: sampleDocuments[0].id,
    title: 'Diseñar arquitectura de microservicios',
    description: 'Crear diagrama de la arquitectura completa del sistema',
    status: 'En Progreso',
    assigned_to: sampleUsers[0].id,
    due_date: '2024-12-15',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true
  },
  {
    id: uuidv4(),
    document_id: sampleDocuments[0].id,
    title: 'Implementar CI/CD con GitHub Actions',
    description: 'Configurar pipeline de integración y despliegue continuo',
    status: 'Pendiente',
    assigned_to: sampleUsers[1].id,
    due_date: '2024-12-20',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true
  },
  {
    id: uuidv4(),
    document_id: sampleDocuments[1].id,
    title: 'Crear componentes React',
    description: 'Desarrollar componentes reutilizables para el frontend',
    status: 'Completado',
    assigned_to: sampleUsers[2].id,
    due_date: '2024-12-10',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true
  },
  {
    id: uuidv4(),
    document_id: sampleDocuments[1].id,
    title: 'Integrar APIs de backend',
    description: 'Conectar frontend con los microservicios',
    status: 'En Progreso',
    assigned_to: sampleUsers[0].id,
    due_date: '2024-12-18',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_active: true
  }
];

module.exports = {
  sampleUsers,
  sampleDocuments,
  sampleTasks
};

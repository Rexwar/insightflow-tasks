/**
 * Punto de entrada del servidor
 * Inicia el servidor Express en el puerto configurado
 */

const app = require('./app');

// Obtener puerto de variables de entorno o usar 3004 por defecto
const PORT = process.env.PORT || 3004;

/**
 * Iniciar servidor
 */
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 InsightFlow Tasks Service');
  console.log('='.repeat(50));
  console.log(`📡 Servidor corriendo en puerto: ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`💚 Health check: http://localhost:${PORT}/health`);
  console.log('='.repeat(50));
  console.log('📋 Endpoints disponibles:');
  console.log('   POST   /tasks');
  console.log('   GET    /documents/:documentId/tasks');
  console.log('   GET    /tasks/:id');
  console.log('   PUT    /tasks/:id/status');
  console.log('   PATCH  /tasks/:id');
  console.log('   DELETE /tasks/:id');
  console.log('='.repeat(50));
});

/**
 * Manejo de cierre graceful
 */
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM recibido. Cerrando servidor...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT recibido. Cerrando servidor...');
  process.exit(0);
});

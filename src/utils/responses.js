/**
 * Utilidades para respuestas HTTP estandarizadas
 */

/**
 * Respuesta exitosa
 * @param {object} res - Objeto response de Express
 * @param {number} statusCode - Código de estado HTTP
 * @param {object} data - Datos a enviar
 * @param {string} message - Mensaje opcional
 */
const success = (res, statusCode = 200, data = null, message = 'Success') => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

/**
 * Respuesta de error
 * @param {object} res - Objeto response de Express
 * @param {number} statusCode - Código de estado HTTP
 * @param {string} message - Mensaje de error
 */
const error = (res, statusCode = 500, message = 'Internal Server Error') => {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null
  });
};

module.exports = {
  success,
  error
};

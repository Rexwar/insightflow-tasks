/**
 * Middleware de validación
 * Valida formatos y datos de entrada
 */

const { error } = require('../utils/responses');

/**
 * Validar formato UUID v4
 * @param {string} uuid - UUID a validar
 * @returns {boolean} true si es válido
 */
const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Middleware para validar UUID en parámetros
 */
const validateUUIDParam = (paramName) => {
  return (req, res, next) => {
    const uuid = req.params[paramName];

    if (!uuid || !isValidUUID(uuid)) {
      return error(res, 400, `El parámetro ${paramName} debe ser un UUID v4 válido`);
    }

    next();
  };
};

/**
 * Middleware para validar formato de fecha
 */
const validateDate = (req, res, next) => {
  const { due_date } = req.body;

  if (due_date) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(due_date)) {
      return error(res, 400, 'El formato de due_date debe ser YYYY-MM-DD');
    }

    // Validar que sea una fecha válida
    const date = new Date(due_date);
    if (isNaN(date.getTime())) {
      return error(res, 400, 'due_date no es una fecha válida');
    }
  }

  next();
};

/**
 * Middleware para validar campos requeridos
 */
const validateRequiredFields = (fields) => {
  return (req, res, next) => {
    const missingFields = [];

    fields.forEach(field => {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      return error(
        res,
        400,
        `Campos requeridos faltantes: ${missingFields.join(', ')}`
      );
    }

    next();
  };
};

/**
 * Middleware para validar el cuerpo no esté vacío
 */
const validateBodyNotEmpty = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return error(res, 400, 'El cuerpo de la petición no puede estar vacío');
  }
  next();
};

module.exports = {
  isValidUUID,
  validateUUIDParam,
  validateDate,
  validateRequiredFields,
  validateBodyNotEmpty
};

# Imagen base de Node.js
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Limpiar cache de npm e instalar dependencias
RUN npm cache clean --force && \
    rm -rf node_modules && \
    npm ci --only=production

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3004

# Variable de entorno por defecto
ENV PORT=3004
ENV NODE_ENV=production

# Comando para iniciar la aplicación
CMD ["node", "src/server.js"]
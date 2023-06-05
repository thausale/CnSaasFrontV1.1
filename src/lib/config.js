// config.js
const isDevelopment = process.env.NODE_ENV === 'development';

export const serverAddress = isDevelopment ? 'http://localhost:3000' : '';

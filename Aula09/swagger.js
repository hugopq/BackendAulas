const swaggerAuton = require('swagger-autogen');
const docsFile = "./swagger-docs.json";
const endpoints = './app.js';

swaggerAuton(docsFile,[endpoints]);

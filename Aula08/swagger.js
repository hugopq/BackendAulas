const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Gestão Utilizadores',
    description: 'Documentação gerada automaticamente para a aula de Back-End'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = './swagger_output.json';
const endpointFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointFiles, doc);
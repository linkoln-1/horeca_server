import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Horeca API",
      version: "1.0.0",
      description: "Для верификации общепита и поставщика требуется токен",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };



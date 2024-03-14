import * as dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
  },
  servers: [
    {
      url: process.env.API_URL,
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./api-docs/*.yaml"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerSpec };

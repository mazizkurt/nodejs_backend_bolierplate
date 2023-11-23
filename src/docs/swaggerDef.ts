import config from "../config/config";

const swaggerDef = {
  openapi: "3.0.0",
  info: {
    title: "Template - Backend",
    version: "1.0.0",
    license: {
      name: "APITHON SOFTWARE",
      url: "https://apithon.com.tr",
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "apiKey",
        in: "header", // can be "header", "query" or "cookie"
        name: "token", // name of the header, query parameter or cookie
        description: "any description...",
      },
    },
  },
  servers: [
    {
      url:
        config.env === "production"
          ? `${config.server}/v1`
          : `http://localhost:${config.port}/v1`,
    },
  ],
};

export default swaggerDef;

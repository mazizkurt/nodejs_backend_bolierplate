import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    SERVER: Joi.string().required().description("Server url"),
    JWT_SECRET: Joi.string().required().description("JWT SECRET"),
    SEQ_HOST: Joi.string().required().description("sequelize host required!"),
    SEQ_DATABASE: Joi.string()
      .required()
      .description("sequelize database required!"),
    SEQ_DIALECT: Joi.string()
      .required()
      .description("sequelize dialect required!"),
    SEQ_USERNAME: Joi.string()
      .required()
      .description("sequelize username required!"),
    SEQ_PASSWORD: Joi.string()
      .required()
      .description("sequelize password required!"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  server: envVars.SERVER,
  jwt: {
    secret: envVars.JWT_SECRET,
  },
  sequelize: {
    seq_host: envVars.SEQ_HOST,
    seq_database: envVars.SEQ_DATABASE,
    seq_dialect: envVars.SEQ_DIALECT,
    seq_username: envVars.SEQ_USERNAME,
    seq_password: envVars.SEQ_PASSWORD,
  },
};

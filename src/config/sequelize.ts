import { Sequelize } from "sequelize";
import config from "./config";

import { UserModel } from "../models"; // User modeli

const sequelize = new Sequelize(
  config.sequelize.seq_database,
  config.sequelize.seq_username,
  config.sequelize.seq_password,
  {
    host: config.sequelize.seq_host,
    dialect: config.sequelize.seq_dialect,
    logging: false,
  }
);

const models: { [key: string]: any } = {
  User: UserModel(sequelize), // UserModel fonksiyonuyla User modelini oluştur
  // Diğer modelleri de aynı şekilde tanımlayabilirsiniz
};

// Modellerin ilişkilendirilmesi
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize, models };

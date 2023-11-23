import { DataTypes, Model, Sequelize } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  surname: string;
  surname1: string;
  email: string;
}

interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

const UserModel = (sequelize: Sequelize) => {
  class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public id!: number;
    public name!: string;
    public surname!: string;
    public surname1!: string;
    public email!: string;

    static associate(models: any) {
      // İlişkilendirme işlemleri burada yapılabilir
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  return User; // Sınıfın kendisini döndür
};

export { UserModel };

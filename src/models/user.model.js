import {Sequelize, DataTypes, Model} from "sequelize";
import sequelize from "./index.js"

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: false
})

export default User
import {Sequelize, DataTypes, Model} from "sequelize";
import sequelize from "./index.js"
import User from "./user.model.js";

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Title"
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: "users",
            key: "id"
        }
    }
}, {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true,
    paranoid: false
})

Post.belongsTo(User, {
    foreignKey: "userId"
})

export default Post
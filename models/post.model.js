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
    }
}, {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true,
    createdAt: "createdat",
    updatedAt: "updatedat",
    paranoid: true
})

Post.belongsTo(User)

export default Post
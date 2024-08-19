"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
// Define o modelo de dados
class ShortenedUrl extends sequelize_1.Model {
}
// Inicializa o modelo
ShortenedUrl.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    originalUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shortenedUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    clickCount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'ShortenedUrl',
    tableName: 'shortened_urls',
    paranoid: true,
    timestamps: true,
});
exports.default = ShortenedUrl;

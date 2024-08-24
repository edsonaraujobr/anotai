import { DataTypes } from 'sequelize';
import { database } from '../db/connection.db.js';

export const User = database.define('Users', {
    email: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    full_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    photo: {
        type: DataTypes.BLOB,
        allowNull: true,
    },
})
import { DataTypes } from 'sequelize';
import { database } from '../db/connection.db.js';

export const User = database.define('Users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
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
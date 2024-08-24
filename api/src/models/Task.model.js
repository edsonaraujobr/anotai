import { DataTypes } from 'sequelize';
import { database } from '../db/connection.db.js';
import { User } from './User.model.js';

export const Task = database.define('Tasks', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    tittle: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    idUser: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: User,
            key: 'email'
        }
    }
})

User.hasMany(Task, {foreign: 'idUser'});
Task.belongsTo(User, {foreign: 'idUser'});

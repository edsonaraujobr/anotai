import { Sequelize } from "sequelize";

export const database = new Sequelize('todo-list', 'root', 'root', {
    host: 'mysql',
    dialect: 'mysql'
})

try {
    await database.authenticate();
    console.log("Conexão com o banco de dados realizado com sucesso.")
} catch(error) {
    console.error(error)
}
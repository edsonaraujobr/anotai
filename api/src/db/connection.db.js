import { Sequelize } from "sequelize";

export const database = new Sequelize('todo_list', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    await database.authenticate();
    console.log("Conexão com o banco de dados realizado com sucesso.")
} catch(error) {
    console.error(error)
}
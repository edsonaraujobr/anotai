import { where } from "sequelize";
import { Task } from "../models/Task.model.js";
import { User } from "../models/User.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, id } = req.body;
        if(!title || !description || !id )
            return res.status(400).json({ messageError: "Faltam parâmetros." });

        const user = await User.findByPk(id);

        if(!user)
            return res.status(404).json({ messageError: "Usuário não encontrado" });

        const taskObject = { 
            title: title, 
            description: description, 
            userId: id
        };


        await Task.sync();
        await Task.create(taskObject);

        return res.status(201).json({ messageSuccess: "Tarefa criada com sucesso." });
    } catch (error) {
        return res.status(500).json({messageError: "Tarefa não criada.", error});
    }
}

export const getAllTask = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; 
        const { userId } = req.body;

        const offset = (page - 1) * limit;
        const tasks = await Task.findAndCountAll({
            where: { userId },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!tasks.rows.length)
            return res.status(400).json({ messageError: "Nenhuma tarefa encontrada." });

        return res.status(200).json({
            tasks: tasks.rows,
            totalTasks: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        return res.status(500).json({ messageError: "Não foi possível retornar as tarefas", error });
    }
}

export const getAllCompleted = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; 
        const { userId } = req.body;

        const offset = (page - 1) * limit;
        const tasks = await Task.findAndCountAll({
            where: { userId, completed: true },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!tasks.rows.length)
            return res.status(400).json({ messageError: "Nenhuma tarefa encontrada." });

        return res.status(200).json({
            tasks: tasks.rows,
            totalTasks: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        return res.status(500).json({ messageError: "Não foi possível retornar as tarefas", error });
    }
}

export const getAllNoCompleted = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; 
        const { userId } = req.body;

        const offset = (page - 1) * limit;
        const tasks = await Task.findAndCountAll({
            where: { userId, completed: false },
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        if (!tasks.rows.length)
            return res.status(400).json({ messageError: "Nenhuma tarefa encontrada." });

        return res.status(200).json({
            tasks: tasks.rows,
            totalTasks: tasks.count,
            totalPages: Math.ceil(tasks.count / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        return res.status(500).json({ messageError: "Não foi possível retornar as tarefas", error });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed  } = req.body;
        
        const updateFields = {};

        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (completed !== undefined) updateFields.completed = completed;

        if (Object.keys(updateFields).length === 0) 
            return res.status(400).json({ messageError: "Nenhum parâmetro para atualizar." });

        const [updated] = await Task.update(updateFields, {
            where: { id },
        });

        if (!updated) 
            return res.status(404).json({ messageError: "Tarefa não encontrada." });

        return res.status(200).json({messageSuccess: "Tarefa atualizada com sucesso"});
    } catch (error) {
        return res.status(500).json({messageError: "Tarefa não atualizada.",error});
    }
}

export const deleteTask = async (req,res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) 
            return res.status(404).json({ messageError: "Tarefa não encontrada." });

        await Task.destroy({
            where: { id },
          });
        return res.status(200).json({messageSuccess: 'Tarefa deletada com sucesso'})
    } catch (error) {
        return res.status(500).json({messageError: "Tarefa não deletada.", error});
    }

}
import { Task } from "../models/Task.model.js";
import { User } from "../models/User.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, userId } = req.body;

        if(!title || !description || !userId )
            return res.status(400).json({ messageError: "Faltam parâmetros." });

        const user = await User.findByPk(userId);

        if(!user)
            return res.status(400).json({ messageError: "Usuário não encontrado" });

        const taskObject = { 
            title: title, 
            description: description, 
            userId: userId
        };


        await Task.sync();
        await Task.create(taskObject);

        return res.status(201).json({ messageSuccess: "Tarefa criada com sucesso." });
    } catch (error) {
        return res.status(500).json({messageError: "Tarefa não criada.", error});
    }
}

export const getAllTask = async (req,res) => {
    try {
        const tasks = await Task.findAll();
        if(!tasks)
            return res.status(400).json({ messageError: "Nenhuma tarefa encontrada." });
        return res.status(200).json({tasks});
    } catch (error) {
        return res.status(500).json({messageError: "Não foi possível retornar as tarefas",error});
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed  } = req.body;

        const updateFields = {};
        if (title) updateFields.title = title;
        if (description) updateFields.description = description;
        if (completed) updateFields.completed = completed;

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
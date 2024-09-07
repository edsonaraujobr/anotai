import { User } from "../models/User.model.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const saltRounds = 10;
dotenv.config();

const SECRET = process.env.SECRET;

export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password)
            return res.status(400).json({ messageError: "Faltam parâmetros." });

        const user = await User.findOne({where: { email }});

        if(!user)
            return res.status(404).json({ messageError: "Usuário não encontrado." });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) 
            return res.status(401).json({ messageError: "Usuário não encontrado." });
        
        const token = jwt.sign(
            {
                email: user.email,
                role: 'user'
            },
            SECRET,
            {
                expiresIn: '3h'
            }
        )

        const result = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            token: token,
        };

        return res.status(200).json({messageSuccess: 'Usuário logado com sucesso', result})
    } catch(error) {
        return res.status(500).json({ messageError: "Erro ao realizar login" , error});
    }
}

export const createUser = async(req, res) => {
    try {
        const { email, password, fullName} = req.body;
        const photo = req.file ? req.file.filename : null;

        if(!email || !password || !fullName)
            return res.status(400).json({ messageError: "Faltam parâmetros." });

        await User.sync();

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) 
            return res.status(409).json({ messageError: "O email já está em uso." });


        bcrypt.hash(password, saltRounds, async (err, hash) => {
            const user = {
                email,
                password: hash,
                full_name: fullName,
                photo
            };
    
            await User.create(user);
            return res.status(201).json({ messageSuccess: "Usuário criado com sucesso." });
        })

    } catch(error) {
        return res.status(500).json({ messageError: "Usuário não criado." , error});
    }
}

export const updateUser = async(req, res) => {
    try {
        const { id } = req.params;
        const { email, password, full_name } = req.body;
        const photo = req.file ? req.file.filename : null;

        const updateFields = {};
        if (full_name) updateFields.full_name = full_name
        if (email) updateFields.email = email
        if (password) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            updateFields.password = hashedPassword;
        }
        if (photo) updateFields.photo = photo

        if (Object.keys(updateFields).length === 0)
            return res.status(400).json({ messageError: "Nenhum parâmetro para atualizar." });

        const [updated] = await User.update(updateFields, {
            where: { id }
        });

        if (!updated)
            return res.status(404).json({ messageError: "Usuário não encontrado." });

        return res.status(200).json({ messageSuccess: "Usuário atualizado com sucesso" });

    } catch (error) {
        return res.status(500).json({ messageError: "Usuário não atualizado." , error});
    }
}

export const deleteUser = async (req,res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) 
            return res.status(404).json({ messageError: "Usuário não encontrado." });

        await User.destroy({
            where: { id },
          });
        return res.status(200).json({messageSuccess: 'Usuário deletado com sucesso'})
    } catch (error) {
        return res.status(500).json({messageError: "Usuário não deletado.",error});
    }
}
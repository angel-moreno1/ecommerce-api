import bcrypt from 'bcryptjs';
import User from '../models/user.js';

export const usersController = async (_req, res) => { 
    const users = await User.find({});
    res.status(200).json(users);
}; 

export const oneUserController = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if(user) {
            res.send(user);
        }else {
            res.status(404).send({ error: `user with id: ${id} not found` });
        }
    } catch (error) {
        next(error);
    }
};

export const userRegistrationController = async (req, res, next) => {
    try {  
        const { name, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = { 
            name,
            lastName,
            email,
            password: hashedPassword
        };
        const user = await User.create(data);
        res.json(user);
        
    } catch (error) {
        next(error);
    }
};

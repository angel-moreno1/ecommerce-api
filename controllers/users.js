import bcrypt from 'bcryptjs';
import jtw from 'jsonwebtoken';
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
            res.send({
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
            });
        }else {
            res.status(404).json({ error: `user with id: ${id} not found` });
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
        // send email to user to verify account
        res.json(user);
        
    } catch (error) {
        next(error);
    }
};

export const userLoginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });
        if(userExists){
            const correctPassoword = await bcrypt.compare(password, userExists.password);
            if(!userExists.active) {
                res.json({ message: 'account not active. please confirm your email' });
            } else if (correctPassoword) {
                const publicInfo = {
                    _id: userExists._id,
                    name: userExists.name,
                    lastName: userExists.lastName,
                    email: userExists.email,
                };
                res.json({...publicInfo, token: jtw.sign(publicInfo, process.env.JTW_SECRET) });
            }else {
                res.status(400).json({ error: 'Invalid email or password' });
            }
        }else {
            res.status(404).json({ error: 'Invalid email or password' });
        }

    } catch (error) {
        next(error);
    }
};

export const userUpdateController = (req, res) => {
    res.json({ user: req.user });
};

import bcrypt from 'bcryptjs';
import jtw from 'jsonwebtoken';
import User from '../models/user.js';
import mailgun from 'mailgun-js';

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
        /**
         * should receive in the body a url to putting
         * in the user send email to redirect to it 
         * and that url need to be modify here with query: ?token=$token
         * when user click. Frontend need to make a get request to:
         * /api/email/verify?token=$token ( $token come in the url previus send it for backend to user email )
        */ 
        const mg = mailgun(
            { 
                apiKey: process.env.API_KEY_MAILGUN || 'ss', 
                domain: process.env.DOMAIN  
            }
        );
        const { name, lastName, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = { 
            name,
            lastName,
            email,
            password: hashedPassword,
            role
        };
        const user = await User.create(data);
        const tokenToverify = jtw.sign(email, process.env.JTW_SECRET);
        // this url need to be modify with the url that come in body
        const verifyUrl = `${process.env.HOST}/api/email/verify?token=${tokenToverify}`;
        const msg = {
            from: 'Amazona <amazona@mg.amazona.com.mx>',
            to: 'angelmrsofa@gmail.com',
            subject: 'company name, please verify your account',
            html: `please click in this link to confirm your account: <a href="${verifyUrl}">verify link</a> <br/><br/><br/><br/>.or copy this: ${verifyUrl} and paste to your browser. `
        };
        mg.messages()
            .send(
                msg,
                (error, body) => {
                    if(error){
                        return console.log('was and error');
                    }
                    console.log('body:', body);
                });
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

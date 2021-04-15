import express from 'express';
import cors from 'cors';
import usersRoute from './routes/users.js';

import unknownEndpoint from './middlewares/unknownEndpoint.js';
import errorHandler from './middlewares/errorHandler.js';

// temp imports 
import jtw from 'jsonwebtoken';
import User from './models/user.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', usersRoute);

app.get('/api/email/verify', async (req, res) => {
    const { token } = req.query;
    const decode = jtw.decode(token);
    if(decode) {
        await User.findOneAndUpdate({ email: decode }, { active: true });
        res.status(201).json({ message: 'account verified' });
    } else {
        res.json({error: 'token modified'});
    }
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
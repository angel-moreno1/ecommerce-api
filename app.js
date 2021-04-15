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
    const { email, token } = req.query;
    const decode = jtw.decode(token);
    if(decode === email) {
        const user = await User.findOneAndUpdate({ email }, { active: true });
        res.status(201).json({ message: 'account verified', user });
    } else {
        res.json({error: 'token or email modified'});
    }
});

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
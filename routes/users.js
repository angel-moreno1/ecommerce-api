import { Router } from 'express';

const route = Router();

let dummyUsers = [
    {
        name: 'angel moreno',
        age: 20,
        email: 'sldk@gmail'
    }
];

route.get('/', (_req, res) => void res.status(200).json(dummyUsers).end());

export default route;

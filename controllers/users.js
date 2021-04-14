let dummyUsers = [
    {
        id: 1,
        name: 'angel moreno',
        age: 20,
        email: 'sldk@gmail'
    },
    {
        id: 2,
        name: 'luisa figueroa',
        age: 26,
        email: 'dsfsdfdsf@gmail'
    }
];

export const usersMiddleware = (_req, res) => void res.status(200).json(dummyUsers).end();

export const oneUserMiddleware = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const userExist = dummyUsers.find(user => user.id === id);
        if(userExist) {
            res.send(userExist);
        }else {
            res.status(404).send('user not found');
        }
    } catch (error) {
        next(error);
    }
};
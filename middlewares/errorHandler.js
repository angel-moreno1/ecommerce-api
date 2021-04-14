
const erroHandler = (err, _req, res, next) => {
    console.log(err);

    if(err) {
        return res.status(400).send({ error: 'was an error' });
    }

    next(err);
};

export default erroHandler;
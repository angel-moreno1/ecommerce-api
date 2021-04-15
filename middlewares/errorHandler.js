
const erroHandler = (err, _req, res, next) => {
    console.log('error es:', err);
    if(err.MongooseError) {
        return res.status(400).send({ message: 'mongoose error', error: err });
    }
    if(err){
        return res.status(400).send({ message: 'was an error', error: err.message });
    }

    next(err);
};

export default erroHandler;
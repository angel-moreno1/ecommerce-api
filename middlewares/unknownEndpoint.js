
const unknownEnpoit = (req, res) => {
    res.status(404).send({ error: 'unknownEnpoit' });
};

export default unknownEnpoit;
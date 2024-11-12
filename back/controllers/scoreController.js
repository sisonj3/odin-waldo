const query = require('../prisma/queries');

const createScore = async (req, res) => {
    await query.createScore(req.body.name);

    res.send('Score added!');
}

const getScore = async (req, res) => {
    const score = await query.getScore(req.body.name);

    res.json(score);
}

const updateScore = async (req, res) => {
    await query.updateScore(req.body.name);

    res.send('Score updated');
}

const deleteScore = async (req, res) => {
    await query.deleteScore(req.body.name);

    res.send('Score deleted!');
}

module.exports = {
    createScore,
    getScore,
    updateScore,
    deleteScore,
};
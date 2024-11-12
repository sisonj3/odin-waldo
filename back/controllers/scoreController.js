const query = require('../prisma/queries');

const createScore = async (req, res) => {
    const score = await query.getScore(req.body.name);

    if (!score) {
        await query.createScore(req.body.name);

        console.log('User added');
        return res.json(`Score added for ${req.body.name}!`);
    }
        
    console.log('User already exists!');
    return res.json('User already exists');
    
}

const getScore = async (req, res) => {
    console.log(req.params.name);

    const score = await query.getScore(req.params.name);

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
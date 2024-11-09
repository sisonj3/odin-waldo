const query = require('../prisma/queries');

const waldo = "Waldo";

// Get location info based on id
const getWaldo = async (req, res) => {
    console.log(req.params.id);

    const location = await query.getLocation(waldo, Number(req.params.id));

    return res.json(location);
}

// Add new waldo location
const addWaldo = async (req, res) => {
    const imageId = Number(req.params.id);
    const x = Number(req.params.x);
    const y = Number(req.params.y);

    await query.addLocation(waldo, imageId, x, y);

    return res.send("Location added!");
}

module.exports = {
    getWaldo,
    addWaldo,
}
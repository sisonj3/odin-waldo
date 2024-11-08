const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Get location of character with imageId
async function getLocation(name, imageId) {
    const location = await prisma.location.findFirst({
        where: {
            characterName: name,
            imageId: imageId,
        }
    });

    return location;
}

// Add location of character
async function addLocation(name, imageId, x, y) {
    await prisma.location.create({
        data: {
            characterName: name,
            imageId: imageId,
            x: x,
            y: y,
        }
    })
}

module.exports = {
    getLocation,
    addLocation,
}
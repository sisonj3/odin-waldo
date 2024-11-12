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

// Create score
async function createScore(name) {
    await prisma.score.create({
        data: {
            name: name,
            endTime: new Date(),
        }
    });
}

// Get score by name
async function getScore(name) {
    const score = await prisma.score.findUnique({
        where: {
            name: name,
        }
    });

    return score;
}

// Update score
async function updateScore(name) {

    const end = new Date();

    const score = await prisma.score.findUnique({
        where: {
            name: name,
        }
    });

    // Convert milliseconds to hours:minutes:seconds
    const timeDiff = Math.abs(end - score.startTime);
    let seconds = Math.floor(timeDiff / 1000) % 60;
    let minutes = Math.floor(timeDiff / (1000 * 60)) % 60;
    let hours = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;

    // Formatting
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    hours = (hours < 10) ? "0" + hours : hours;

    const finalTime = `${hours}:${minutes}:${seconds}`;
    
    console.log(timeDiff);
    console.log(finalTime);

    await prisma.score.update({
        where: {
            name: name,
        },
        data: {
            endTime: end,
            finalTime: finalTime,
        }
    })
}

// Delete score
async function deleteScore(name) {
    await prisma.score.delete({
        where: {
            name: name,
        }
    });
}

module.exports = {
    getLocation,
    addLocation,
    createScore,
    getScore,
    updateScore,
    deleteScore,
}
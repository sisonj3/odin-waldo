const express = require('express');

const app = express();

// Router constants
const waldoRouter = require('./routes/waldoRouter');

// Used for req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
// app.use("/", (req, res) => res.send('Hello World!'));
app.use("/waldo", waldoRouter);

app.listen(3000, () => console.log('App listening on port 3000!'));
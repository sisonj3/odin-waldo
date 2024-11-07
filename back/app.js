const express = require('express');

const app = express();

// Router constants

// Used for req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers

app.listen(3000, () => console.log('App listening on port 3000!'));
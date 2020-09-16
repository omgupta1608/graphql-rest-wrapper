const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.listen(4000, () => {
    console.log('Rest Server Started');
});
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
});

app.listen(port, () => { console.log(`Listening on port: ${port}`) });
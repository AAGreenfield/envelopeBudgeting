const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: 'Envelope Secret',
    resave: false,
    saveUninitialized: false
}));


app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('base', { title: "Envelop Budgeting" });
});

app.listen(port, () => { console.log(`Listening on port: ${port}`) });
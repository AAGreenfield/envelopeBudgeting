const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const session = require('express-session');

const login = require('./login/loginRouter');
const signup = require('./signup/signupRouter');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(session({
    secret: 'Envelope Secret',
    resave: false,
    saveUninitialized: false
}));

app.use('/login', login);
app.use('/signup', signup);

app.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    if (req.session.sessionId > 0) {
        console.log('Are you sure you want to log out and return to home?')
    } else {
        res.render('base', { title: "Envelope Budgeting" });
    }
});

app.listen(port, () => { console.log(`Listening on port: ${port}`) });
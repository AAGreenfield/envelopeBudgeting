const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const { Pool, Client } = require('pg');


const pool = new Pool({
    host: "dpg-cntjia6ct0pc739rj0v0-a.oregon-postgres.render.com",
    port: 5432,
    database: "users_ia68",
    user: "admin",
    password: "LLz3BufwYpRI8eWXgz1jWp9vbVrTtp5W",
    ssl: true
});

const checkUser = async (signupUsername) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE username = '${signupUsername}'`);
        if (rows[0]) {
            return rows[0];
        } else {
            return false;
        }
    } catch (err){
        console.log(err);
    }
};

const checkEmail = async (signupEmail) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE email = '${signupEmail}'`);
        if (rows[0]) {
            return rows[0];
        } else {
            return false;
        }
    } catch (err){
        console.log(err);
    }
};

const getId = async () => {
    try {
        const { rows } = await pool.query(`SELECT MAX(id) FROM users;`);
        return rows[0].max
    } catch(err) {
        console.log(err)
    }
}

const addUser = async(signupDetails, res) => {
    const id = await getId();

    try {
        const { rows } = await pool.query(`INSERT INTO users (id, username, email, password) VALUES (${id + 1}, '${signupDetails.signupUsername}', '${signupDetails.signupEmail}', '${signupDetails.signupPassword}')`);
        res.render('login/logged', { title: "Account",
            username: `${signupDetails.signupUsername}`
        })
    } catch (err){
        console.log(err);
    }
}

router.get('/signup.js', (eq, res) => {
    res.sendFile(path.join(__dirname, '/signup.js'));
})

router.post('/', async (req, res) => {
    const userExists = await checkUser(req.body.signupUsername);
    const emailExists = await checkEmail(req.body.signupEmail);

    if (userExists) {
        res.render('signup/noSignupUser', {
            title: "Sign Up",
            username: req.body.signupUsername,
            email: req.body.signupEmail,
            password: req.body.signupPassword
        })
    } else {
        if (emailExists) {
            res.render('signup/noSignupEmail', {
                title: "Sign Up",
                username: req.body.signupUsername,
                email: req.body.signupEmail,
                password: req.body.signupPassword
            })
        } else {
            if (req.body.signupPassword === req.body.signupPasswordTwo) {
                addUser(req.body, res);
            } else {
                res.render('signup/noSignupPass', {
                    title: 'Sign Up',
                    username: req.body.signupUsername,
                    email: req.body.signupEmail,
                })
            }
        }
    }
})


module.exports = router;
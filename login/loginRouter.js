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

router.get('/login.js', (eq, res) => {
    res.sendFile(path.join(__dirname, '/login.js'));
})

router.post('/', async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE username = '${req.body.username}'`);
        if (rows[0]) {
            if (rows[0].password === req.body.password) {
		        req.session.sessionId = `${rows[0].id}`;
                res.render('login/logged', { title: "Account", sessionId: req.session.sessionId, username: req.body.username});
            } else {
                res.render('login/noLogPass', { title: "Account", sessionId: req.session.sessionId, username: req.body.username});
            }
        } else {
            res.render('login/noLogUser', { title: "Account", sessionId: req.session.sessionId });
        }
    } catch (err){
        console.log(err);
    }
})


module.exports = router;
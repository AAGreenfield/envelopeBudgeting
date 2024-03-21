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


module.exports = router;
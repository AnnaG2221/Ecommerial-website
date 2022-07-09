const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log ('this is login rount')
})

module.exports =router
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authentication');

router.get('/dashboard', verifyToken, (req, res) => {
    res.status(200).json({ data: req.username });
});

module.exports = router;
const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

router.post('/', (req, res) => {
    fs.writeFile(path.join(__dirname, "../../..", `${req.body.username}.json`), JSON.stringify(req.body.data), err => {
        if (err) throw err;
        res.status(200).json({
            msg: "Albums updated"
        });
    });

})

module.exports = router;
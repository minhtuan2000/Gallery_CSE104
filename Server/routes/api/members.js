const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

let members = {};
fs.readFile(path.join(__dirname, "../../..", "cre.json"), (err, data) => {
    if (err) {
        throw err;
    } else {
        members = JSON.parse(data).users;
    }
});

//Get member's data
router.get('/:username/:password', (req, res) => {
    const found = members.some(member => member.username === req.params.username && member.password === req.params.password);

    if (found){
        username = members.filter(member => member.username === req.params.username && member.password === req.params.password)[0].username;
        //console.log(username);
        fs.readFile(path.join(__dirname, "../../..", `${username}.json`), (err, data) => {
            if (err) {
                throw err;
            } else {
                //console.log(data.toString());
                res.json(data.toString());
            }
        }); 
    } else {
        res.status(400).json({msg: `Username ${req.params.username} or password is incorrect`});
    }
});

//Add member
router.post('/', (req, res) => {
    const newMember = {
        username: req.body.username,
        password: req.body.password
    }

    if (!newMember.username || !newMember.password){
        return res.status(400).json({
            msg: "Missing username or password"
        })
    }

    if (members.some(member => member.username === newMember.username)){
        return res.status(400).json({
            msg: "Username already existed"
        });
    }

    members.push(newMember);
    fs.writeFile(path.join(__dirname, "../../..", "cre.json"), JSON.stringify({"users": members}), err => {
        if (err) throw err;
        fs.writeFile(path.join(__dirname, "../../..", `${newMember.username}.json`), JSON.stringify({"albums": []}), err => {
            if (err) throw err;
            res.status(200).json({
                msg: "User created"
            });
        });
    });

})

module.exports = router;
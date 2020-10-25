var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require("jsonwebtoken");
var fs = require("fs");
var privateKey = fs.readFileSync(process.cwd() + '\\routes\\server.key', 'utf8');

router.get('/', async function (req, res, next) {

});

router.post('/login', function (req, res, next) {
    try {

        const { user } = req.body;
        var userObj = {};

        userObj = {
            email: user.email,
        }
        client.db("test").collection("users").findOne(userObj, function (err, result) {
            if (err) {
                res.json({ status: "fail", msg: "No such user" });
                throw err
            };

            if (result) {
                if (bcrypt.compareSync(user.password, result.password)) {
                    const userDetail =
                    {
                        email: result.email
                    };
                    var token = jwt.sign(userDetail, privateKey, {
                        expiresIn: "1h"
                    });
                    userDetail.token = token;
                    res.json({ status: "success", result: userDetail, msg: "Login Success" });
                } else {
                    res.json({ status: "fail", msg: "Password incorrect" });
                }
            } else {
                res.json({ status: "fail", msg: "Email/Password not correct" });
            }

            // db.close();
        });

    } catch (e) {
        console.error(e);
    } finally {
    }

});


module.exports = router;

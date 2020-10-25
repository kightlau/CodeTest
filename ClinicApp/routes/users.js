var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.get('/', async function (req, res, next) {

  try {
    const test = await client.db("test").collection("users").find({}).toArray(function (err, result) {
      if (err) throw err;
      console.log(result);
      // db.close();
    });
    console.log(test)

  } catch (e) {
    console.error(e);
  } finally {
  }
});

router.post('/registerUser', function (req, res, next) {
  try {
    console.log("user", req);
    const { user } = req.body;
    var userObj = {};

    userObj = {
      email: user.email,
      password: bcrypt.hashSync(user.password, saltRounds),
      clinicName: user.clinicName,
      phone: user.phone,
      address: user.address
    }
    client.db("test").collection("users").insert(userObj, function (err, result) {
      if (err) {
        res.json({ status: "fail", msg: "Record creation failed." });
        throw err;
      }
      console.log(result);
      res.json({ status: "success", msg: "Register Successful" });
    });

  } catch (e) {
    console.error(e);
  } finally {
  }

});



module.exports = router;

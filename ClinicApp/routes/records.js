var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var fs = require("fs");
const { ObjectId } = require('mongodb');
var privateKey = fs.readFileSync(process.cwd() + '\\routes\\server.key', 'utf8');

router.get('/', async function (req, res, next) {

});

router.post('/createRecord', function (req, res, next) {
    try {
        const { record, token } = req.body;

        if (token) {

            const decoded = jwt.verify(token, privateKey)
            console.log("decoded", decoded);
            var recordObj = {};

            recordObj = {
                doctorName: record.doctorName,
                patientName: record.patientName,
                diagnosis: record.diagnosis,
                fee: record.fee,
                dateTime: record.dateTime,
                followConsultation: record.followConsultation,
                medication: record.medication,
                createBy: decoded.email
            }

            client.db("test").collection("records").insert(recordObj, function (err, result) {
                if (err) {
                    res.json({ status: "fail", msg: "Record creation failed." });
                    throw err;
                }

                console.log("result", result);
                res.json({ status: "success", msg: "Record created." });
            });
        } else {
            res.json({ status: "fail", msg: "Please login" });
        }
    } catch (e) {
        console.error(e);
        res.json({ status: "fail", msg: "Record creation failed." });

    } finally {
    }

});

router.post('/getRecords', function (req, res, next) {
    try {
        const { record, token } = req.body;
        console.log("record", record);
        if (token) {
            var recordObj = {
            };
            if (record) {
                recordObj = {
                    _id: ObjectId(record._id)
                }
            }

            const decoded = jwt.verify(token, privateKey)
            console.log("decoded", decoded);
            client.db("test").collection("records").find(recordObj).toArray(function (err, result) {
                if (err) {
                    res.json({ status: "fail", msg: "Get record failed." });
                    throw err;
                }

                console.log("result", result);
                res.json({ status: "success", msg: "Record created.", result: result });
            });
        }
        else {
            res.json({ status: "fail", msg: "Please login" });
        }
    } catch (e) {
        console.error(e);
        res.json({ status: "fail", msg: "Record creation failed." });

    } finally {
    }

});


module.exports = router;

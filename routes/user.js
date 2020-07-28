const express = require('express');
const router = express.Router();
const connection = require('../models/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/auth', function (req, res) {
    let agent_id = req.body.agent_id;
    let password = req.body.password;
    let statusMess = null;
    if (!agent_id || !password) {
        return res.json({ error: true, message: "Please type all the details" });
    }
    connection.query('SELECT * FROM users WHERE agent_id = ?',[agent_id], function (error, results, fields) {
        if(results[0]){
            bcrypt.compare(password, results[0].password,function(err,ress){
                if(ress){ 
                    statusMess = 'success';
                    return res.status(200).json({
                        status: statusMess, status_code: 200
                    });
                    console.log('yay'); 
                }else{
                    statusMess = 'failure';    
                    return res.status(401).json({
                        status: statusMess, status_code: 401
                    });
                }
            });
        }
        if (error) {
            throw error
        }else {
            
        }
       
    });
    
});

router.post('/', function (req, res) {
    let agent_id = req.body.agent_id;
    let password = req.body.password;
    if (!agent_id || !password) {
        return res.json({ error: true, message: "Please type all the details" });
    }
    bcrypt.hash(password, saltRounds, function (err, hash) {
        connection.query('INSERT INTO users SET ?', { agent_id: agent_id, password: hash }, function (error, results, fields) {

            if (error){
                return res.json({ status: error.sqlMessage,status_code : 400 });
            }
                
            return res.status(200).json({
                status: 'Account Created',status_code:200
            });
        })
    })
});

module.exports=router;
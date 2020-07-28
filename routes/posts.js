const express = require('express');
const router = express.Router();
const connection = require('../models/db');

router.get('/list/:agent_id',function(req,res){
    let agent_id = req.params.agent_id;
    connection.query('SELECT * FROM todoListUser where agent_id = ? order by DATE(due_date) DESC',[agent_id],function(error,results,fields){
        if(error){
            return res.json({ error: true, message: error.sqlMessage });
        }
        
        console.log(results[0].due_date);
        return res.json({error:false, data: results});
    })
});

router.post('/:agent_id',function(req,res){
    let agent_id = req.params.agent_id;
    let title = req.body.title;
    let description = req.body.description;
    let due_date = req.body.due_date;
    let category = req.body.category;
    if(!title||!description||!due_date||!category){
        return res.json({ error: true, message: "Please type all the details" });
    }
    connection.query('INSERT INTO todoListUser SET ?', {title: title,description:description,due_date:due_date,category:category,agent_id: agent_id},function (error, results, fields) {
        if (error)
            return res.json({ error: true, message: error.sqlMessage });
        return res.status(200).json({
            status : 'success',status_code: 200
        });
    })
});

router.put('/update/:agent_id/:id',function(req,res){
    let id=req.params.id;
    let agent_id=req.params.agent_id;
    let description = req.body.description;
    connection.query("UPDATE notesTask SET description = ? WHERE id = ? and agent_id = ?", [description,id,agent_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
    });
});

module.exports=router;
const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const Task = require('../models/task')




router.get('/', async (req, res) => {
    const tasks = await Task.find();
    console.log("cargado el index");

    res.render('index', {
        tasks
    });
});

router.post('/add', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');

});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.deleteOne({ _id: ObjectID(id) });
    res.redirect('/');
});

router.get('/turn/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id)
    //await Task.updateOne({ _id: ObjectID(id) },{});
    //res.redirect('/');
    task.status = !task.status;
    await task.save();
    console.log(task);
    res.redirect("/");

});
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id)
    res.render("edit", {
        task
    });

});
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Task.update({_id:id},
        req.body
    );   
        res.redirect('/');
});
module.exports = router;
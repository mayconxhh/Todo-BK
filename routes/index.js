const express = require('express');
const router = express.Router();
const ToDo = require('../models/todo')

/* GET home page. */
router.get('/tasks', (req, res, next) => {

  ToDo
    .find()
    .exec((err, tasks)=>{
      if(err){
        res
            .status(500)
            .json({
              err: err
            })
      }

      res
        .status(200)
        .json({
          tasks: tasks,
        })
    });
});

router.get('/task/:id', (req, res, next) => {

  let id = req.params.id;

  ToDo
    .findById(id)
    .exec((err, task)=>{
      if(err){
        res
            .status(500)
            .json({
              err: err
            })
      }

      res
        .status(200)
        .json({
          task: task
        })
    });
});

router.post('/new-todo', (req, res, next) => {

  let params = req.body;

  let task = new ToDo({
    author: params.author,
    name: params.name,
    description: params.description
  });

  task.save((err, task)=>{
    if(err){
      res
        .status(500)
        .json({
          err: err
        })
    }

    res
      .status(200)
      .json({
        task: task
      })
  })
})

router.put('/task/:id/:status', (req, res, next) => {

  let id = req.params.id;
  let oldStatus = req.params.status;
  let newStatus = (oldStatus === 'false') ? true : false;

  ToDo.findByIdAndUpdate(id, { state: newStatus }, { new: true })
  .exec((err, task)=>{
    if(err){
      res
        .status(500)
        .json({
          err: err
        })
    }

    res
      .status(200)
      .json({
        task: task
      })
  })
})

router.delete('/task/:id', (req, res, next) => {

  let id = req.params.id;

  ToDo.findByIdAndDelete({ "_id": id}, (err)=>{

    if(err){
      res
        .status(500)
        .json({
          err: err
        })
    }

    res
      .status(200)
      .json({
        message: "Se ha eliminado la tarea correctamente"
      })

  })
})

module.exports = router;

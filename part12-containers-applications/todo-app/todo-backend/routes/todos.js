const express = require('express');
const { Todo } = require('../mongo');
const { getAsync , setAsync } = require('../redis');
const router = express.Router();
let counter
/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  });

  const currentTodos = JSON.parse(await getAsync('todos')) || [];
    
  currentTodos.push(todo);

  await setAsync('todos', JSON.stringify(currentTodos));

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)
    
    next()
  }

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = await req.todo
  console.log(todo)
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todoToAdd = req.body;
  req.todo.set(todoToAdd);
  await req.todo.save();
  res.send(200);
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;

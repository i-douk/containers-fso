const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

router.get('/', async (_, res) => {
  try {
    const todos = JSON.parse(await getAsync('todos'));
    if (todos.length>0) {
      console.log(todos)
      res.send({"added_todos": todos.length});
    } else {
      res.status(404).send({ error: 'No todos found in Redis' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Error fetching todos from Redis' });
  }
});

module.exports = router;

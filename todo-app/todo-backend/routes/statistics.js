const express = require('express');
const { getAsync ,  setAsync } = require('../redis');
const router = express.Router();

router.get('/', async (_, res) => {
  try {

    res.send({ "added_todos" : (await getAsync('added_todos')) });
  } catch (error) {
    res.status(500).send({ error: 'Error fetching todos from Redis' });
  }
});

module.exports = router;

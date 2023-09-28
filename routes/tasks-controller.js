const express = require('express');
const router = express.Router();

const {createTasks, readTasks, updateTasks, deleteTask} = require('../controllers/tasks')

router.get('/', readTasks)
router.post('/', createTasks)
router.put('/:id', updateTasks)
router.delete('/:id', deleteTask)

module.exports = router;
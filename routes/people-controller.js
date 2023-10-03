const express = require('express');
const router = express.Router();

const {createPeople, readPeople, updatePeople, deletePerson, assignTask, unassignTask} = require('../controllers/people')

router.get('/', readPeople)
router.post('/', createPeople)
router.put('/:id', updatePeople)
router.patch('/:id', assignTask)
router.patch('/unassign/:id', unassignTask)
router.delete('/:id', deletePerson)

module.exports = router;
const express = require('express');
const router = express.Router();

const {createPeople, readPeople, updatePeople, deletePerson, assignTask} = require('../controllers/people')

router.get('/', readPeople)
router.post('/', createPeople)
router.put('/:id', updatePeople)
router.patch('/:id', assignTask)
router.delete('/:id', deletePerson)

module.exports = router;
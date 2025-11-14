const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();
// Create a new todo
router.post('/', async (req, res) => {
    try {
        const todo = await Todo .create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//Read all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Update a todo by ID
router.put('/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
});
// Delete a todo by ID
router.delete('/:id', async (req, res) => {
 const todo = await Todo.findByIdAndDelete(req.params.id);
 if (!todo) return res.status(404).json({ error: 'Todo not found' });
 res.json({ message: 'Todo deleted successfully' });
});
module.exports = router;


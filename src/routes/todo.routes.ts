import express from 'express';
import prisma from '../prisma';

const todoRouter = express.Router();

// Get all todos
todoRouter.get('', async (req, res) => {
  const todos = await prisma.todo.findMany({ orderBy: { id: 'desc' } });
  return res.json(todos);
});

// Add todo
todoRouter.post('', async (req, res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({ data: { title } });
  res.json(todo);
});

// Update todo
todoRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { title, completed }
  });
  res.json(todo);
});

// Delete todo
todoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({ where: { id: Number(id) } });
  res.json({ message: 'Todo deleted' });
});

export default todoRouter;

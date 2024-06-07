const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public/')));

let todos = [
  { id: 1, task: 'Learn HTMX' },
  { id: 2, task: 'Feed Cat' }
];

app.get('/api/todos', (req, res) => {
  try {
    res.status(200).json(todos);
  } catch (error) {
    console.error('Failed to get todos', error);
  }
});

app.post('/api/todos', (req, res) => {
  try {
    const newTodo = { id: todos.length + 1, task: req.body.task };
    todos.push(newTodo);

    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Failed to create todo', error);
  }
});

app.put('/api/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) {
      res.status(404).send('Todo not found');

      return;
    }

    todo.task = req.body.task;

    res.status(200).json(todo);
  } catch (error) {
    console.error('failed to edit todo', error);
  }
});

app.delete('/api/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);

    res.status(204).send();
  } catch (error) {
    console.error('failed to delete todo', error);
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

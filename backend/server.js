const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/todo';

app.use(bodyParser.json());

MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');
    const db = client.db('todo');
    const collection = db.collection('todos');

    app.get('/api/todos', async (req, res) => {
        try {
            const todos = await collection.find({}).toArray();
            res.json(todos);
        } catch (error) {
            console.error('Error fetching todos:', error);
            res.status(500).json({ error: 'Failed to fetch todos' });
        }
    });

    app.post('/api/todos', async (req, res) => {
        try {
            const todo = req.body;
            await collection.insertOne(todo);
            res.status(201).send();
        } catch (error) {
            console.error('Error adding todo:', error);
            res.status(500).json({ error: 'Failed to add todo' });
        }
    });

    app.delete('/api/todos/:id', async (req, res) => {
        try {
            const id = req.params.id;
            await collection.deleteOne({ _id: mongodb.ObjectID(id) });
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting todo:', error);
            res.status(500).json({ error: 'Failed to delete todo' });
        }
    });

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});

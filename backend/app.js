const express = require('express');
const cors = require('cors')
const app = express();

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;


const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'ToDoApp';

app.use(cors())
app.use(express.json())

app.get('/', function (req, res) {
    res.send("add /api to the url for backend section");
})


app.get('/api', function (req, res) {
    res.send("Hi, Welcome to the backend section for To Do App.");
})

app.get('/api/to-do-list', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);

        const toDoList = await db.collection("ToDoItems").find({}).toArray();
        console.log("toDoList: " + toDoList);

        res.send(toDoList);
        client.close();
    }
    catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Error while fetching toDoList" });
    }
});

app.get('/api/delete-to-do-item', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);

        const data = await db.collection("ToDoItems").deleteOne({ _id: new ObjectId(req.query.id) });
        res.send(data);
        console.log(data);
        client.close();
    }
    catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Error while deleting to do item with id: " + req.query.id });
    }
});

app.post('/api/create-to-do-item', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);

        const { title, description } = req.body;
        console.log("backend app, title: " + title);
        console.log("backend app, description: " + description);

        const data = await db.collection("ToDoItems").insertOne({ title: title, description: description });
        res.send(data);
        console.log(data);
        client.close();
    }
    catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Error while creating new to do item" });
    }
});

app.post('/api/update-to-do-item', async (req, res) => {
    try {
        const client = await MongoClient.connect(mongoUrl);
        const db = client.db(dbName);

        const { id, title, description } = req.body;
        console.log("backend app, _id: " + id);
        console.log("backend app, title: " + title);
        console.log("backend app, description: " + description);

        const data = await db.collection("ToDoItems").updateOne(
            { _id: new ObjectId(id) },
            { $set: { title: title, description: description } });

        res.send(data);
        console.log(data);
        client.close();
    }
    catch (error) {
        console.error("Error", error);
        res.status(500).json({ error: "Error while creating new to do item" });
    }
});







app.listen(3000, function () {
    console.log('Backend for To Do App listening on port 3000!');
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config;
const Todo = require("./models/Todo");
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Mongo DB connected")
    })
    .catch((err)=>{
        console.log("MongoDB error",err)
    })

app.get('/',(req,res)=>{
    res.send("Todo API is running")
})

app.get('/api/todos',async(req,res)=>{
    try{
        const todos = await Todo.find();
        res.json(todos)
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})
app.post('/api/todos',async(req,res)=>{
    try{
        const todo = await Todo.create({
            title: req.body.title
        });
        res.status(201).json(todo);
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})
app.put('/api/todos/:id',async(req,res)=>{
    try{
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
               completed: req.body.completed 
            },
            {
                new: true
            }
        );
        res.json(todo);
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})
app.delete('/api/todos/:id',async(req,res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id);
        res.json({
            message: "Todo deleted successfully"
        })
    } catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})
app.listen(process.env.PORT || 5000,()=>{
    console.log('server running on port 5000')
})
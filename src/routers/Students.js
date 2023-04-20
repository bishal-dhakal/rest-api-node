const express = require('express');
const router = new express.Router();
const Student = require('../models/students');

router.get('/',(req,res)=>{
    res.send("hello from root router");
})

//create a new students
// app.post('/students',(req,res) =>{
//     console.log(req.body)
//     const user = new Student(req.body);
//     user.save()
//     .then(()=>{
//         res.status(201).send(user);
//     }).catch((e)=>{
//         res.status(400).send(e);
//     })
// })

router.post('/students', async (req,res) =>{
    try{
        const user = new Student(req.body);
        const createUser= await user.save();
        res.status(201).send(createUser);
    }catch(e){
    res.status(400).send(e);
    }
})

//read student data
router.get('/students', async (req,res) =>{
    try{
        const studentData =await Student.find();
        res.send(studentData)
    }catch(e){
        console.log(e);
    }
})

//read student data with id
router.get('/students/:name', async (req,res)=>{
    try{
        const name = req.params.name;
        const studentData = await Student.find({name}); 
        res.send(studentData)
    }catch(e){
        console.log(e);
    }
})

//delete user
router.delete('/students/:id', async(req,res)=>{
    try{
        const deleteStudent = await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send();
        }
        else{
            res.send(deleteStudent)
        }
    }catch(e){
        res.status(500).send(e);
    }
})

//update thew student info by id
router.patch('/students/:id', async (req,res) =>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updateStudent);
    }catch(e){
        console.log(e);
    }
})


module.exports = router ;
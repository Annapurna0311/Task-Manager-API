const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const getAllTasks = asyncWrapper (async(req,res) => {
//    try{
    const tasks = await Task.find({})
    res.status(200).json({tasks})
    // res.status(200).json({tasks , amount:tasks.length})
    // res.status(200).json({status:"success", data:{tasks , nbHits:tasks.length}})
// }catch(error){
//     res.status(500).json({msg:error})
//    }
})

const createTask = asyncWrapper ( async(req,res) =>{
    // try{
        const task = await Task.create(req.body)
    res.status(201).json({task})
    // }
    // catch(error){
    //     res.status(500).json({msg:error})
    // }
})
const getTask = asyncWrapper (async(req,res,next) =>{
    // try{
        const {id:taskID} = req.params
        const task = await Task.findOne({ _id:taskID})
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}` , 404))
            // return res.status(404).json({msg:`No task with id: ${taskID}`})
        }
        
        res.status(200).json({task})
    // }
    // catch(error){
    //     res.status(500).json({msg:error})
    // }
})
const deleteTask =asyncWrapper( async(req,res) =>{
    // try{
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id: taskID})
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}` , 404))
            // return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        // res.status(200).json({task})
        // res.status(200).send()
        res.status(200).json({ task: null , status: 'Success'})
    // }
    // catch(error){
    //     res.status(500).json({msg:error})
    // }
})
const updateTask = asyncWrapper(async(req,res) =>{
    // try{
        const { id: taskID} = req.params
        
        const task = await Task.findByIdAndUpdate({_id:taskID} , req.body , {
            new: true,runValidators:true,
        })
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}` , 404))
            // return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        res.status(200).json({ task})
    // }catch(error){
    //     res.status(500).json({msg:error})
    // }
})
// const editTask = async(req,res) =>{
//     try{
//         const { id: taskID} = req.params
        
//         const task = await Task.findByIdAndUpdate({_id:taskID} , req.body , {
//             new: true,runValidators:true,overwrite:true,
//         })

//         res.status(200).json({ task})
//     }catch(error){
//         res.status(500).json({msg:error})
//     }
// }

//creating HTTP interface
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    // editTask,
}
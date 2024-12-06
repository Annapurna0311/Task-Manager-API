const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'MUST PROVIDE STRING'],
        trim:true,
        maxlength:[20,'DONOT EXCEED 20 CHARACTERS']
    }, completed:{
        type :Boolean,
        // default : false
    }
})

module.exports = mongoose.model('Task', TaskSchema)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoScheman = new Schema({
    description: { type: String, required: true },
    deadline: { type: Date, required: true },
    progress: { type: Number, required: true },
    subTasks: [
        {
            description: { type: String, required: true },
            percentage: { type: Number, required: true },
            done: { type: Boolean, required: true }
        }
    ]
})

module.exports = mongoose.model('todo', todoScheman);
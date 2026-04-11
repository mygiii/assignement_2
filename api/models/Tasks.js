const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required : true

        },
        completed : {
            type : Boolean,
            default : false
        }
    }
);

module.exports = mongoose.model('Task', TaskSchema);

const UserSchema = new mongoose.Schema({
username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true
},
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true
}
});

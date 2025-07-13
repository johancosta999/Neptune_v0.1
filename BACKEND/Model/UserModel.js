const mongoose=require("mongoose");
const Schema =mongoose.Schema;

const userSchema =new Schema({
    name:{
        type:String,
        required:true,//validate 
    },
     gmail:{
        type:String,
        required:true,//validate
    },
    age:{
        type:Number,
        required:true,//validate
    },
     Address:{
        type:String,
        required:true,//validate
    },
});

module.exports = mongoose.model("UserModel", userSchema);

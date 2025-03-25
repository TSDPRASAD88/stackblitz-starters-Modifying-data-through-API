const mongoose=require('mongoose');

const schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
    },
     
    price:{
        type:String,
        required:true,
    }
})

const model=mongoose.model("menuItems",schema);
module.exports=model;

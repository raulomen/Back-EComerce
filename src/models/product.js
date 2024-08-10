const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    value:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('poduct',productSchema);

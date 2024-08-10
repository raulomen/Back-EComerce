const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
    productId:{
        type:String,
        required: true
    },
    quantity:{
        type:String,
        required:true
    },
    totalValue:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('order',orderSchema);
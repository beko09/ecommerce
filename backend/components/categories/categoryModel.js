const mongoose = require("mongoose");


categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'الرجاء ادخال اسم القسم']
    },
  
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
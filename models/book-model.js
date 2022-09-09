const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        required: true,
    }
},

{
    timestamps: true,
});
        //create model         (this parameter are)  //Name of model(db)   //Name of schema
module.exports = mongoose.model("Book", bookSchema)


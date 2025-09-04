const mongoose = require("mongoose");
const detailSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    course : {
        type : String,
        required : true
    },
    admno : {
        type : Number,
        required : true
    },
    residence : {
        type : String,
        required : true
    }
});

const address = mongoose.model("detail", detailSchema);
module.exports = address;


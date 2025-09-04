const mongoose = require("mongoose");
const detail = require("./models/detail.js");

main()
.then((res) => {
    console.log("connect successfully");
}).catch((err) => {
    console.log("some error occured in database", err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/studetail");
};

//now sample data

const stu_detail = [
    {
        name : "Vedansh kumar",
        course : "BCA(CCS)",
        admno : 2266,
        residence : "Muzaffarnagar"
    },
    {
        name : "Devansh kumar",
        course : "BCA(CCS)",
        admno : 2266,
        residence : "Muzaffarnagar"
    }
];

detail.insertMany(stu_detail);

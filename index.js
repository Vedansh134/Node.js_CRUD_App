const express = require("express");
const app = express();
const port = 8082;
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const studentDetail = require("./models/detail.js");


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

main()
    .then((res) => {
        console.log("connection establish successfully");
    }).catch((err) => {
        console.log("some error occured in database", err);
    });
async function main() {
    //await mongoose.connect("mongodb://127.0.0.1:27017/studetail");
    //for docker container
    await mongoose.connect("mongodb://mongodb:27017/studetail");
}

// Redirect root to /home
app.get("/", (req, res) => res.redirect("/home"));

// home route
app.get("/home", async (req, res) => {
    let stuDetail = await studentDetail.find();
    res.render("home.ejs", { stuDetail });
});

// add new student detail
app.get("/add", (req, res) => {
    res.render("add.ejs");
});

// post request to add new student detail
app.post("/add", (req, res) => {
    let { name, course, admno, residence } = req.body;
    let new_stu_detail = new studentDetail({
        name: name,
        course: course,
        admno: admno,
        residence: residence
    });
    new_stu_detail.save().then(() => {
        console.log("student detail add");
    }).catch((err) => {
        console.log("some error occured in database", err);
    });
    res.redirect("/home");
});

// edit student detail
app.get("/home/:id/edit", async (req, res) => {
    let { id } = req.params;
    let stu_det = await studentDetail.findById(id);
    res.render("edit.ejs", { stu_det });
});

// update student detail
app.patch("/home/:id/edit", async (req, res) => {
    let { id } = req.params;
    let { name, course, admno, residence } = req.body;
    let stu_det = await studentDetail.findByIdAndUpdate(id, { name, course, admno, residence }, { runValidators: true, new: true});
    console.log("Student detail update successfully");
    res.redirect("/home");
});

// delete student detail
app.delete("/home/:id/delete", async (req, res) => {
    let { id } = req.params;
    let findStu = await studentDetail.findByIdAndDelete(id);
    console.log("recent deleted student detail", findStu);
    res.redirect("/home");
});

// see student detail
app.get("/home/:id/see", async (req, res) => {
    let { id } = req.params;
    let findStu = await studentDetail.findById(id);
    res.render("see.ejs", { findStu });
});

// server listen
app.listen(port, () => {
    console.log(`app listen on port number ${port}`);
});

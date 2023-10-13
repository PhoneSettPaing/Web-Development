import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const d = new Date();
const months = ["January", "February", "March", "April", "May",
    "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { day: days[d.getDay()], month: months[d.getMonth()], date: d.getDate()});
});

app.get("/work", (req, res) => {
    res.render("work.ejs");
})

app.post("/addTodayList", (req, res) => {
    var todaylist = req.body["addCheckList"];
    res.render("index.ejs", { day: days[d.getDay()], month: months[d.getMonth()], date: d.getDate(), addlist: todaylist});
})

app.post("/addWorkList", (req, res) => {
    var worklist = req.body["addCheckList"];
    res.render("work.ejs", { addlist: worklist});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

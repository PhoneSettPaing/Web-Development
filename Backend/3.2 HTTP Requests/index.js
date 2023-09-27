import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Home Page</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<p>Phone: +123456789</p>");
});

app.get("/about", (req, res) => {
    res.send("<p>Info: Test Express Server</p>");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});
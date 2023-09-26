import express from "express";
const app = express();
const port = 3000;

app.listen(port, function() {
    console.log(`Server runnning on port ${port}.`);
});
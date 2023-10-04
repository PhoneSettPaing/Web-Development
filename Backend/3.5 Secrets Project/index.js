//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({extended:true}));

// Creating Custom passwordCheck middleware
//var userIsAuthorised = false;
//function passwordCheck(req, res, next) {
//    const password = req.body["password"];
//    if (password === "ILoveProgramming") {
//        userIsAuthorised = true;
//    };
//    next();
//};
//app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    // better have a password check in custom middleware
    // if (userIsAuthorised) {
    if (req.body["password"] === "ILoveProgramming") {
        res.sendFile(__dirname + "/public/secret.html");

    } else {
        //can use the one below instead of writing res.sendFile(......)
        //res.redirect("/");
        res.sendFile(__dirname + "/public/index.html");
    };
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const d = new Date();
const day = d.getDay();

if ( (day === 0) || (day === 6) ) {
    var daytype = "the weekend, it's time to have fun!";
} else {
    var daytype = "a weekday, it's time to work hard!";
}

app.get("/", (req, res) => {
    res.render(__dirname + "/views/index.ejs", {today: daytype});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
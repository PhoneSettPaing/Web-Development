import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  try {
    const queryResult = await db.query("SELECT * FROM items ORDER BY id ASC;");
    items = queryResult.rows;
    // Checking
    //console.log("Getting items: ", items);
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: items,
    });    
  } catch (err) {
    console.log(err);
  };
});

app.post("/add", async (req, res) => {
  try {
    const item = req.body.newItem;
    // Checking
    //console.log("Added item: ", item);
    await db.query(
      "INSERT INTO items(title) VALUES ($1);",
      [item]
    );
    //items.push({ title: item });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  };
});

app.post("/edit", async (req, res) => {
  try {
    const itemId = req.body.updatedItemId;
    const editItem = req.body.updatedItemTitle;
    // Checking
    //console.log("Update item with id: ", itemId);
    //console.log("Update item with: ", editItem);
    await db.query(
      "UPDATE items SET title = $1 WHERE id = $2;",
      [editItem, itemId]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  };
});

app.post("/delete", async (req, res) => {
  try {
    const itemId = req.body.deleteItemId;
    // Checking
    //console.log("Id of item to delete: ", itemId);
    await db.query(
      "DELETE FROM items WHERE id = $1",
      [itemId]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  };
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
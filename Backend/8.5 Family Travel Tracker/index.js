import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query(
    `SELECT country_code FROM visited_countries 
    JOIN users ON visited_countries.user_id = users.id
    WHERE users.id = ${currentUserId};`);
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getCurrentUser() {
  const queryUsers = await db.query("SELECT * FROM users;");
  // users list get updated here
  users = queryUsers.rows;
  return users.find( (user) => user.id == currentUserId);
};

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();
  // Checking
  //console.log("users:", users);
  //console.log("test color:", currentUser.color);
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if ( req.body.add == "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    // Checking
    //console.log("currentUserId: ", req.body.user);
    res.redirect("/");
  };
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const addUser = req.body["name"];
  const addColor = req.body["color"];
  const newId = await db.query(
    "INSERT INTO users( name, color) VALUES ( $1, $2) RETURNING id;",
    [addUser, addColor]
  );
  currentUserId = newId.rows[0].id;
  // Checking
  //console.log("testing new: ", newId.rows);
  //console.log("current user id: ", currentUserId);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
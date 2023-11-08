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
  port: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await getCountries();
  console.log("Countries: ", countries);
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const addedCountry = req.body["country"];
  const countries = await getCountries();
  console.log("Add Country:",addedCountry);

  // get country code for added country
  const queryResult = await db.query(
    // In case user type in lower case
    "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
    [addedCountry.toLowerCase()]
  );

  // Check if queryResult return country code for newly adding country
  if ( queryResult.rows.length !== 0) {
    const countryCode = queryResult.rows[0].country_code;
    console.log("Country Code:",countryCode);
    // When queryResult got a return Check if country code has already been addded
    // if already added send already added error message
    if ( countries.includes(countryCode) ) {
      console.log("same value: ", countries.includes(countryCode));
      const errorMessage = "Country has already been added, try again";
      res.render("index.ejs", { countries: countries, total: countries.length, error: errorMessage });
    } else {
      // if country code hasn't been added yet then insert it
      db.query( "INSERT INTO visited_countries(country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    };
  } else {
    // if queryResult does't return country code, no queryResult []
    // send country doesn't exist error
    const errorMessage = "Country does not exist, try again";
    res.render("index.ejs", { countries: countries, total: countries.length, error: errorMessage });
  };
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

async function getCountries(){
  let visitedCountries = [];
  const queryResult = await db.query(  "SELECT country_code FROM visited_countries;" );
  queryResult.rows.forEach( (item) => visitedCountries.push(item.country_code) );
  console.log("Visited Countries:", visitedCountries );
  return visitedCountries;
}
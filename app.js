const express = require("express");
const app = express();
const request = require("request-promise");

app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("App is running on port 3000!");
});

app.get("/", (req, res) => {
  res.render("search");
});

app.get("/results", (req, res) => {
  let query = req.query.search;
  let url = "http://www.omdbapi.com/?s=" + query;
  request(url + "&apikey=thewdb&page=1")
    .then((body) => {
      const data = JSON.parse(body);
      res.render("results", {data: data});
    })
    .catch((err) => {
      console.log("Error!! ", err);
    });
});
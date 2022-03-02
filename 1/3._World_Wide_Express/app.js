const express = require(`express`);
const app = express();

const animalsRouter = require("./routers/animal-router.js");
app.use(animalsRouter);

const animalsUtils = require("./animals/animalsUtils.js");
console.log(animalsUtils);
console.log(animalsUtils.animals);
//console.log(animalsUtils);

app.use(express.static("public"));

app.get("/weather", (req, res) => {
    res.sendFile(`${__dirname}/public/weather.html`);
});

app.get("/", (req, res) => {
    //res.sendFile(`${__dirname}/public/frontpage/frontpage.html`);
    res.redirect("/animals");
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log("Server running on port", server.address().port);
});

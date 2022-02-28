const express = require(`express`);
const app = express();

app.use(express.static("public"));

app.get("/weather", (req, res) => {
    res.sendFile(`${__dirname}/public/weather.html`);
});

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/frontpage/frontpage.html`);
});

app.listen(8080, () => {
    console.log("Server running on port", 8080);
});

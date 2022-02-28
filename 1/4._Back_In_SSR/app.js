const express = require(`express`);
const app = express();

app.use(express.static("public"));

const fs = require("fs");
const nav = fs.readFileSync(`${__dirname}/public/components/nav.html`).toString();
const footer = fs.readFileSync(`${__dirname}/public/components/footer.html`).toString();

const frontpage = fs.readFileSync(`${__dirname}/public/pages/frontpage/frontpage.html`);
const sciencegallery = fs.readFileSync(`${__dirname}/public/pages/sciencegallery/sciencegallery.html`);

//const page = nav.replace(, replaceValue)

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/pages/frontpage/frontpage.html`);
});

app.listen(3000, () => {
    console.log("Listening on port ", 3000);
});

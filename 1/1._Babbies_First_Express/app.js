const express = require("express")
const app = express();
app.use(express.json());

console.log(app);
app.get("/", (req, res) => {
    res.send('<h1>Hello Express</h1><br><br><br><form action="/about" method="get"><button type="submit">About</button></form>');
});

app.get("/about", (req, res) => {
    res.send(express.name);
});

app.post("/", (res, req) => {
    console.log(req.body);
    res.send(req.body);
})

app.post("/about", (res, req) => {

});


app.get("/libraries", (req, res) => {
    res.send(req.query);
});

app.get("/aboutclient/:name", (req, res) => {
    res.send({ greeting: `Hello There ${req.params.name}` });
});

app.listen(8080);

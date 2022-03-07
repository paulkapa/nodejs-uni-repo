const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/index.html`).toString();

app.get("/", (req, res) => {
    res.send(index);
});

app.post("/loging-in", (req, res) => {
    const user = req.params.user;
    const password = req.params.password;
    const logged_in = checkUser(user, password);
    if (logged_in)
        res.redirect("/logged-in");
    else
        res.redirect("/login");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));


function checkUser(a, b) {
    return true;
}

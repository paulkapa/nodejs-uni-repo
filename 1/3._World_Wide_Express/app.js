const express = require(`express`);
const app = express();

// http://api.weatherstack.com/current?access_key=361bbf753b816d01b117fffca0e5ed2b&query=Copenhagen

app.get("/weather", (req, res) => {
    res.sendFile(`${__dirname}\\public\\weather.html`);
});

app.listen(8080, () => {
    console.log("Server running on port", 8080);
});

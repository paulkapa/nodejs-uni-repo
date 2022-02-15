const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const noGood = new Array(NaN, undefined, null, "Nan", "undefined");

/**
 * Use to provide the "/about" information as a user-friendly GUI by rendering an HTML page.
 * Note: "pug" needs to be defined as a dependency in "package.json" file.
*/
app.set('view engine', 'pug');

/**
 * Use to allow browser to load the favicon icon to show in the title bar or bookmark.
 * Note: this method doesn't require any extra dependencies, such as "serve-favicon".
 */
app.use(express.static(`${__dirname}\\favicon_io`));

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Movie class:
 *  - defines the properties of a Movie
 *  - provides constructor for initializing a Movie object
 */
class Movie {

    constructor(id, title, year, category, rating) {
        this.title = title;
        this.year = year;
        this.category = category;
        this.rating = rating;
        this.id = id;
    }
}

// Store all movie id's
let indexMap = new Map();
// Store Movie objects mapped by id's
let movieMap = new Map();

/**
 * Return a JSON representation of the Movie object provided.
 * @param {*} id the movie's id or -1 to apply to the entire list
 * @returns JSON representation of the object
 */
function toJSON(id) {
    if (id === -1)
        return JSON.stringify(Array.from(movieMap.values()));
    else if (typeof id === "number" && id < movieMap.size)
        return JSON.stringify(movieMap.get(id));
    else {
        console.log(`${colorText("Cannot convert object to JSON!", "red")}... (id is not a number or does not exist in database)`);
        return JSON.stringify({ error: "id is not a number or does not exist in database" });
    }
}

function colorText(text, color) {
    try {
        switch (color) {
            case "black": return `\u001B[30;1m${text}\u001B[0m`;
            case "red": return `\u001B[31;1m${text}\u001B[0m`;
            case "green": return `\u001B[32;1m${text}\u001B[0m`;
            case "yellow": return `\u001B[33;1m${text}\u001B[0m`;
            case "blue": return `\u001B[34;1m${text}\u001B[0m`;
            case "magenta": return `\u001B[35;1m${text}\u001B[0m`;
            case "cyan": return `\u001B[36;1m${text}\u001B[0m`;
            case "white": return `\u001B[37;1m${text}\u001B[0m`;
            default: return `\u001B[39;1m${text}\u001B[0m`;
        }
    } catch {
        return text;
    }
}

/**
 * Index all movies if the indexMap is empty.
 * Otherwise, re-count all entries and adjust the index of all movies, if necessary.
 */
function mapMovies() {
    if (indexMap.size == 0) {
        console.log(colorText("Building index...", "cyan"));
        movieMap.forEach((v, k, m) => {
            movieMap.get(k).id = indexMap.size;
            indexMap.set(indexMap.size, v.id);
        });
        console.log(colorText("Index built!", "green"));
    } else {
        console.log(colorText("Rebuilding index...", "yellow"));
        let lastK = -1;
        let auxMovie;
        indexMap.forEach((v, k, m) => {
            if (k - lastK != 1) {
                auxMovie = movieMap.get(k);
                movieMap.delete(k);
                auxMovie.id = lastK + 1;
                movieMap.set(auxMovie.id, auxMovie);
            }
            lastK++;
        });
        if (auxMovie != null) {
            indexMap.clear();
            mapMovies();
        } else {
            console.log(colorText("Index does not need rebuilding...", "green"));
        }
    }
}

/**
 * Add a movie to the movieMap and a respective index to the indexMap.
 * @param {*} movie a complete Movie object
 */
function addMovie(movie) {
    if (!noGood.includes(movie)) {
        movie.id = indexMap.size;
        indexMap.set(indexMap.size, movie.id);
        movieMap.set(movie.id, movie);
        console.log(`${colorText("Saved movie#", "green")}${movie.id}... ${toJSON(movie.id)}`);
    } else {
        console.log(`${colorText("Couldn't save new movie", "red")}... (object is null or undefined)`);
    }
}

/**
 * Edit the movie's details in the movieMap. The index in the indexMap is not modified.
 * @param {*} movie a Movie object with at least the "id" property defined
 */
function editMovie(movie) {
    if (!noGood.includes(movie.id) && movieMap.has(movie.id)) {
        if (!noGood.includes(movie.title))
            movieMap.get(movie.id).title = movie.title;
        if (!noGood.includes(movie.year))
            movieMap.get(movie.id).year = movie.year;
        if (!noGood.includes(movie.category))
            movieMap.get(movie.id).category = movie.category;
        if (!noGood.includes(movie.rating))
            movieMap.get(movie.id).rating = movie.rating;
        console.log(`${colorText("Modified movie#", "green")}${movie.id}... ${toJSON(movie.id)}`);
    } else {
        console.log(`${colorText("Couldn't edit movie#", "red")}${movie.id}... (id is null or does not exist in database)`);
    }
}

/**
 * Delete a movie from the movieMap and remove the respective index from indexMap.
 * Rebuilds the index if the operation succeeds.
 * @param {*} id the movie id
 */
function deleteMovie(id) {
    if (id != null && movieMap.has(id)) {
        console.log(`${colorText("Deleting movie#", "yellow")}${id}... ${toJSON(id)}`)
        movieMap.delete(id);
        indexMap.delete(id);
        console.log(`${colorText("Deleted movie#", "green")}${id}...`);
        mapMovies();
        return "success";
    } else {
        console.log(`${colorText("Cannot delete movie#", "red")}${id}... (id is null or does not exist in database)`);
        return "error";
    }
}

addMovie(new Movie(0, "Rick and Morty0", 2019, "Absurd, Quirky, Irreverent", "16+"));
addMovie(new Movie(0, "Rick and Morty1", 2019, "Absurd, Quirky, Irreverent", "16+"));
addMovie(new Movie(0, "Rick and Morty2", 2019, "Absurd, Quirky, Irreverent", "16+"));
addMovie(new Movie(0, "Rick and Morty3", 2019, "Absurd, Quirky, Irreverent", "16+"));
addMovie(new Movie(0, "Rick and Morty4", 2019, "Absurd, Quirky, Irreverent", "16+"));
console.log(colorText("Hardcoded movies parsed!", "cyan"));

/**
 * Redirects to "/about/web-gui" if the base URL is accessed.
 */
app.get("/", (req, res) => {
    console.log(`${colorText("GET /", "magenta")} => ${colorText("REDIRECT:/about/web-gui", "green")}`);
    res.end(res.redirect("/about/web-gui"));
});

/**
 * Provides basic information about the API in a json format.
 */
app.get("/about", (req, res) => {
    console.log(`${colorText("GET /about", "magenta")}`);
    res.end(JSON.stringify({ name: "Babbies Exercise", description: "CRUD-able REST API", actions: { GET: ["/ => /about/web", "/about", "/about/web", "/movies", "/movie?id={!}"], POST: "/movies/add?title={!}&year={!}&category={!}&rating={!}", PUT: "/movies/edit?id={!}&title={}&year={}&category={}&rating={}", DELETE: "/movies/delete?id={!}" }, about: "/about/web-gui" }));
});

/**
 * Render a view providing a GUI to allow the user to access the functionality in a browser.
 */
app.get("/about/web-gui", (req, res) => {
    console.log(`${colorText("GET /about/web-gui", "magenta")}`);
    // The render function is used in order to provide the dynamic values to the web forms.
    res.render(`${__dirname}\\views\\index.pug`, { maxID: movieMap.size - 1, maxYear: new Date().getFullYear() + 10 });
});

/**
 * Return the entire movies list as json array.
 */
app.get("/movies", (req, res) => {
    console.log(`${colorText("GET /movies", "magenta")}`);
    res.send(toJSON(-1));
});

/**
 * Return the requested movie as json object.
 */
app.get("/movie", (req, res) => {
    console.log(`${colorText("GET /movie", "magenta")}?id=${Number(req.query.id)}`);
    res.send(toJSON(Number(req.query.id)));
});

/**
 * Create a new movie object from the request data and return it as json object.
 */
app.post("/movies/add", (req, res) => {
    if (!noGood.includes(req.query.title)) {
        console.log(`${colorText("POST (query) /movies/add", "magenta")}?title=${String(req.query.title)}?year=${Number(req.query.year)}?category=${String(req.query.category)}?rating=${String(req.query.rating)}`);
        addMovie(new Movie(0, String(req.query.title), Number(req.query.year), String(req.query.category), String(req.query.rating)));
        res.send(toJSON(movieMap.size - 1));
    } else if (!noGood.includes(req.body.title)) {
        console.log(`${colorText("POST (body) /movies/add", "magenta")}?title=${String(req.body.title)}?year=${Number(req.body.year)}?category=${String(req.body.category)}?rating=${String(req.body.rating)}`);
        addMovie(new Movie(0, String(req.body.title), Number(req.body.year), String(req.body.category), String(req.body.rating)));
        res.send(toJSON(movieMap.size - 1));
    } else {
        res.end(JSON.stringify({ status: `Cannot read post data...` }));
    }
});

/**
 * Create a new movie object from the request data and compares it to existing object with the same id, applying any valid changes.
 * Send the modified movie object as json object.
 */
app.put("/movies/edit", (req, res) => {
    console.log(`${colorText("POST /movies/edit", "magenta")}?id=${Number(req.query.id)}?title=${String(req.query.title)}?year=${Number(req.query.year)}?category=${String(req.query.category)}?rating=${String(req.body.rating)}`);
    editMovie(new Movie(Number(req.query.id), String(req.query.title), Number(req.query.year), String(req.query.category), String(req.query.rating)));
    res.send(toJSON(Number(req.query.id)));
});

/**
 * Delete a movie object based on provided id.
 * Send a json object with the completion status of the request.
 */
app.delete("/movies/delete", (req, res) => {
    console.log(`${colorText("DELETE /movies/delete", "magenta")}?id=${Number(req.query.id)}`);
    switch (deleteMovie(Number(req.query.id))) {
        case "success": { res.end(JSON.stringify({ status: `Deleted movie#${Number(req.query.id)}` })); break; }
        case "error": { res.end(JSON.stringify({ status: `Cannot delete movie#${Number(req.query.id)}... (id is null or does not exist in database)` })); break; }
        default: {
            res.end(JSON.stringify({
                status: `Error occurered... If you try to DELETE a movie, check again if the id exists in database`
            }));
        }
    }
});

/**
 * Enables the app to listen for requests on a specified port. Logs this action in console.
 */
app.listen(port, () => console.log(`${colorText("Listening on port", "magenta")} ${port}...`));

const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

/**
 * Used to provide the "/about" information as a user-friendly GUI.
 * Note: "pug" needs to be defined as a dependency in "package.json" file.
*/
app.set('view engine', 'pug');

/**
 * Used to allow browser to load the favicon icon to show in the title bar or bookmark.
 * Note: this method doesn't require any extra dependencies, such as "serve-favicon".
 */
app.use(express.static(`${__dirname}\\favicon_io`));

//
app.use(express.json());

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

// Stores movie titles mapped with id's
let indexMap = new Map();
// Stores Movie objects mapped by id's
let movieMap = new Map();

/**
 * Indexes all movies if the indexMap is empty.
 * Otherwise, re-count all entries and adjust the index of all movies, if necessary.
 */
function mapMovies() {
    if (indexMap.size == 0) {
        movieMap.forEach((v, k, m) => {
            movieMap.get(k).id = indexMap.size;
            indexMap.set(indexMap.size, v.title);
        });
    } else {
        let lastK = -1;
        indexMap.forEach((v, k, m) => {
            if (k - lastK != 1) {
                let auxMovie = movieMap.get(k);
                movieMap.delete(k);
                auxMovie.id = lastK + 1;
                movieMap.set(lastK + 1, auxMovie);
            }
            lastK++;
        });
        indexMap.clear();
        mapMovies();
    }
}

/**
 * Adds a movie to the movieMap and a respective index to the indexMap.
 * @param {*} movie a complete Movie object
 */
function addMovie(movie) {
    if (movie != null) {
        movie.id = indexMap.size;
        indexMap.set(indexMap.size, movie.title);
        movieMap.set(movie.id, movie);
    } else {
        console.log(`Couldn't save ${movie}...`);
    }
}

/**
 * Deletes a movie from the movieMap and removes the respective index from indexMap.
 * Rebuilds the index if the operation succeeds.
 * @param {*} id the movie id
 */
function deleteMovie(id) {
    if (movieMap.has(id)) {
        movieMap.delete(id);
        indexMap.delete(id);
        console.log(indexMap);
        console.log(movieMap);
        mapMovies();
    }
}

addMovie(new Movie(0, "Rick and Morty0", 2019, "Absurd, Quirky, Irreverent", "16+"));
addMovie(new Movie(0, "Rick and Morty1", 2019, "Absurd, Quirky, Irreverent", "16+"));
addMovie(new Movie(0, "Rick and Morty2", 2019, "Absurd, Quirky, Irreverent", "16+"));
addMovie(new Movie(0, "Rick and Morty3", 2019, "Absurd, Quirky, Irreverent", "16+"));
addMovie(new Movie(0, "Rick and Morty4", 2019, "Absurd, Quirky, Irreverent", "16+"));
console.log(indexMap);
console.log(movieMap);
deleteMovie(3);
console.log(indexMap);
console.log(movieMap);

/**
 * Redirects to "/about" if the base URL is accessed.
 */
app.get("/", (req, res) => {
    res.end(res.redirect("/about"));
});

/**
 * Renders a view providing a GUI to allow user to access the functionality in a browser.
 */
app.get("/about", (req, res) => {
    // The render function is used in order to provide the dynamic movies count to the web forms.
    res.render(`${__dirname}\\views\\index.pug`, { maxID: movieMap.size - 1 });
});

/**
 * Returns the entire movies list as json map.
 */
app.get("/allMovies", (req, res) => {
    console.log("GET /allMovies");
    const json = JSON.stringify(Object.fromEntries(movieMap));
    console.log(json);
    const obj = JSON.parse(json);
    console.log(obj);
    res.send(json);
});

/**
 * Return the specified movie as json object.
 */
app.get("/movie", (req, res) => {
    const id = Number(req.query.id);
    console.log(`GET /movie/id=${id}`);
    const json = JSON.stringify(movieMap.get(id));
    console.log(json);
    const obj = JSON.parse(json);
    console.log(obj);
    res.send(json);
});

/**
 *
 */
app.post("/movies/add", (req, res) => {

});

/**
 *
 */
app.put("/movies/edit", (req, res) => {

});

/**
 *
 */
app.delete("/movies/delete", (req, res) => {

});

/**
 * Enables the app to listen for requests on a specified port. Logs this action in console.
 */
app.listen(port, () => console.log(`Listening on port ${port}...`));

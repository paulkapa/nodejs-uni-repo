const express = require("express");
const app = express();
const fs = require("fs");
const __fragments = `${__dirname}/public/views/fragments`;
const __content = `${__dirname}/public/views/content`;
const __index = `${__dirname}/public/views/full_pages/index.html`;


app.use(express.static(`public`));

const doc = fs.readFileSync(`${__fragments}/doc-head.html`).toString();
const nav = fs.readFileSync(`${__fragments}/body-top.html`).toString();
const footer = fs.readFileSync(`${__fragments}//body-bot.html`).toString();

const introduction = fs.readFileSync(`${__content}/introduction.html`).toString();
const express_server = fs.readFileSync(`${__content}/express-server.html`).toString();
const serving_html = fs.readFileSync(`${__content}/serving-html.html`).toString();
const ssr = fs.readFileSync(`${__content}/ssr.html`).toString();
const about = fs.readFileSync(`${__content}/about.html`).toString();
const about_me = fs.readFileSync(`${__content}/about-me.html`).toString();
const glossary = fs.readFileSync(`${__fragments}/glossary.html`).toString();
const academic = fs.readFileSync(`${__content}/academic.html`).toString();
const error = fs.readFileSync(`${__fragments}/error.html`).toString();
const copyright = fs.readFileSync(`${__fragments}/copyright.html`).toString();

let last_page = "/introduction";
let last_page_title = "Introduction";

function buildPage(title, content, next_section, next_section_title, prev_section, prev_section_title) {
    let doc_rendered = doc.replace("%%DOCUMENT_TITLE%%", title);
    let footer_rendered = footer.replace("%%NEXT_SECTION%%", next_section)
        .replace("%%NEXT_SECTION_TITLE%%", next_section_title)
        .replace("%%PREV_SECTION%%", prev_section)
        .replace("%%PREV_SECTION_TITLE%%", prev_section_title);
    return doc_rendered + nav + content + footer_rendered;
}

function buildErrorPage(error_message) {
    let doc_rendered = doc.replace("%%DOCUMENT_TITLE%%", "Error");
    let error_rendered = error_message == null ? error : error.replace("%%ERROR_MESSAGE%%", error_message);
    let footer_rendered = footer.replace("%%NEXT_SECTION%%", "/")
        .replace("%%NEXT_SECTION_TITLE%%", "Home")
        .replace("%%PREV_SECTION%%", last_page)
        .replace("%%PREV_SECTION_TITLE%%", last_page_title);
    return doc_rendered + nav + error_rendered + footer_rendered;
}

app.get("/", (req, res) => {
    try {
        res.sendFile(__index);
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get("/introduction", (req, res) => {
    try {
        res.send(buildPage("Introduction", introduction));
    } catch (e) {
        res.status(418);
        res.send(buildPage("Error", error.replace("%%ERROR_MESSAGE%%", e)));
    }
});

app.get("/express-server", (req, res) => {
    try {
        res.send(buildPage("Express-Server", express_server));
    } catch (e) {
        res.status(418);
        res.send(buildPage("Error", error.replace("%%ERROR_MESSAGE%%", e)));
    }
});

app.get("/serving-html", (req, res) => {
    try {
        res.send(buildPage("Serving HTML", serving_html));
    } catch (e) {
        res.status(418);
        res.send(buildPage("Error", error.replace("%%ERROR_MESSAGE%%", e)));
    }
});

app.get("/ssr", (req, res) => {
    try {
        res.send(buildPage("SSR", ssr));
    } catch (e) {
        res.status(418);
        res.send(buildPage("Error", error.replace("%%ERROR_MESSAGE%%", e)));
    }
});

app.get("/about", (req, res) => {
    try {
        res.send(buildPage("About", about));
    } catch (e) {
        res.status(418);
        res.send(buildPage("Error", error.replace("%%ERROR_MESSAGE%%", e)));
    }
});

app.get("/about-me", (req, res) => {
    try {
        res.send(buildPage("About Me", about_me));
    } catch (e) {
        res.status(418);
        res.send(buildPage("Error", error.replace("%%ERROR_MESSAGE%%", e)));
    }
});

app.get("/glossary", (req, res) => {
    try {
        res.send(buildPage("Glossary", glossary));
    } catch (e) {
        res.status(418);
        res.send(buildPage("Error", error.replace("%%ERROR_MESSAGE%%", e)));
    }
});

app.get("/copyright", (req, res) => {
    try {
        res.send(buildPage("Copyright", copyright));
    } catch (e) {
        res.status(418);
        res.send(buildPage("Error", error.replace("%%ERROR_MESSAGE%%", e)));
    }
});

app.get("/academic", (req, res) => {
    try {
        res.send(buildPage("Academic", academic));
    } catch (e) {
        res.status(418);
        res.send(buildPage("Error", error.replace("%%ERROR_MESSAGE%%", e)));
    }
});

app.use(function (req, res) {
    res.send(buildErrorPage(`The location: ${req.url} does not exist...`));
});

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});

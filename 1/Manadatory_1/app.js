// Express import and initialization.
const express = require("express");
const app = express();
// Fs and path import.
const path = require("path");
const fs = require("fs");

// Port declaration.
const PORT = process.env.PORT || 3000;

// Declaration of static directory.
app.use(express.static(`public`));

// Directories of HTML fragments and pages.
const __fragments = `${__dirname}/public/views/fragments`;
//app.set('fragments', 'views/fragments')
const __content = `${__dirname}/public/views/content`;
// app.set('content', 'views/content')
const __pages = `${__dirname}/public/views/full_pages`;
// app.set('full_pages', 'views/full_pages')

/**
 * The content of repeatable HTML fragments.
 */

//const doc = fs.readFileSync('fragments/doc-head').toString();
const doc = fs.readFileSync(`${__fragments}/doc-head.html`).toString();
const nav = fs.readFileSync(`${__fragments}/body-top.html`).toString();
const footer = fs.readFileSync(`${__fragments}//body-bot.html`).toString();

/**
 * Page specific content.
 */

const introduction = fs.readFileSync(`${__content}/introduction.html`).toString();
const express_server = fs.readFileSync(`${__content}/express-server.html`).toString();
const serving_html = fs.readFileSync(`${__content}/serving-html.html`).toString();
const ssr = fs.readFileSync(`${__content}/ssr.html`).toString();
const about = fs.readFileSync(`${__content}/about.html`).toString();
const about_me = fs.readFileSync(`${__content}/about-me.html`).toString();
const glossary = fs.readFileSync(`${__fragments}/glossary.html`).toString();
const academic = fs.readFileSync(`${__content}/academic.html`).toString();
const copyright = fs.readFileSync(`${__fragments}/copyright.html`).toString();
const error = fs.readFileSync(`${__fragments}/error.html`).toString();

/**
 * Title and location of each page specific content.
 */

const intro_title = "Introduction";
const intro_loc = "/introduction";
const express_title = "Express-Server";
const express_loc = "/express-server";
const serverHTML_title = "Serving HTML";
const serverHTML_loc = "/serving-html";
const ssr_title = "SSR";
const ssr_loc = "/ssr";
const about_title = "About";
const about_loc = "/about";
const aboutme_title = "About-Me";
const aboutme_loc = "/about-me";
const glossary_title = "Glossary";
const glossary_loc = "/glossary";
const academic_title = "Academic";
const academic_loc = "/academic";
const copy_title = "Copyright";
const copy_loc = "/copyright";
const error_title = "Error";

/**
 * Full pages content, titles and location.
 */

const __index = fs.readFileSync(`${__pages}/index.html`).toString();
const __ww_news = fs.readFileSync(`${__pages}/latest-world-news.html`).toString();
const __index_title = "Home";
const __index_loc = "/";
const __ww_news_title = "Latest World News";
const __ww_news_loc = "/ww-news";

// Navigation history variables.
let last_page = intro_loc;
let last_page_title = intro_title;

/**
 * Build a view by providing the main content of the page,
 * @param {*} title
 * @param {*} content
 * @param {*} next_section
 * @param {*} next_section_title
 * @param {*} prev_section
 * @param {*} prev_section_title
 * @returns
 */
function buildFragments(title, content, next_section, next_section_title, prev_section, prev_section_title) {
    let doc_rendered = doc.replace("%%DOCUMENT_TITLE%%", title);
    let footer_rendered = footer.replace("%%NEXT_SECTION%%", next_section)
        .replace("%%NEXT_SECTION_TITLE%%", next_section_title)
        .replace("%%PREV_SECTION%%", prev_section)
        .replace("%%PREV_SECTION_TITLE%%", prev_section_title)
        .replace("%%LAST_SECTION_TITLE%%", last_page_title)
        .replace("%%LAST_SECTION%%", last_page);
    return doc_rendered + nav + content + footer_rendered;
}

function buildPage(title, content, next_section, next_section_title, prev_section, prev_section_title) {
    return content.replace("%%DOCUMENT_TITLE%%", title)
        .replace("%%NEXT_SECTION%%", next_section)
        .replace("%%NEXT_SECTION_TITLE%%", next_section_title)
        .replace("%%PREV_SECTION%%", prev_section)
        .replace("%%PREV_SECTION_TITLE%%", prev_section_title)
        .replace("%%LAST_SECTION_TITLE%%", last_page_title)
        .replace("%%LAST_SECTION%%", last_page);
}

function buildErrorPage(error_message) {
    let doc_rendered = doc.replace("%%DOCUMENT_TITLE%%", error_title);
    let error_rendered = error_message == null ? error : error.replace("%%ERROR_MESSAGE%%", error_message);
    let footer_rendered = footer.replace("%%NEXT_SECTION%%", __index_loc)
        .replace("%%NEXT_SECTION_TITLE%%", __index_title)
        .replace("%%PREV_SECTION%%", last_page)
        .replace("%%PREV_SECTION_TITLE%%", last_page_title)
        .replace("%%LAST_SECTION_TITLE%%", last_page_title)
        .replace("%%LAST_SECTION%%", last_page);
    return doc_rendered + nav + error_rendered + footer_rendered;
}

app.get(__index_loc, (req, res) => {
    try {
        res.send(buildPage(__index_title, __index, intro_loc, intro_title, __ww_news_loc, __ww_news_title));
        last_page = __index_loc;
        last_page_title = __index_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get(__ww_news_loc, (req, res) => {
    try {
        res.send(buildPage(__ww_news_title, __ww_news, __index_loc, __index_title, null, null));
        last_page = __ww_news_loc;
        last_page_title = __ww_news_title;
    } catch (e) {
        /**
         * The "HTTP 418 I'm a teapot" client error response code indicates that the server refuses to brew coffee because it is, permanently, a teapot.
         * A combined coffee/tea pot that is temporarily out of coffee should instead return 503.
         * This error is a reference to Hyper Text Coffee Pot Control Protocol defined in April Fools' jokes in 1998 and 2014.
         */
        res.status(418);
        res.send(buildErrorPage(e + "418 I'm a teapot"));
    }
});

app.get(intro_loc, (req, res) => {
    try {
        res.send(buildFragments(intro_title, introduction, express_loc, express_title, __index_loc, __index_title));
        last_page = intro_loc;
        last_page_title = intro_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get(express_loc, (req, res) => {
    try {
        res.send(buildFragments(express_title, express_server, serverHTML_loc, serverHTML_title, intro_loc, intro_title));
        last_page = express_loc;
        last_page_title = express_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get(serverHTML_loc, (req, res) => {
    try {
        res.send(buildFragments(serverHTML_title, serving_html, ssr_loc, ssr_title, express_loc, express_title));
        last_page = serverHTML_loc;
        last_page_title = serverHTML_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get(ssr_loc, (req, res) => {
    try {
        res.send(buildFragments(ssr_title, ssr, about_loc, about_title, serverHTML_loc, serverHTML_title));
        last_page = ssr_loc;
        last_page_title = ssr_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get(about_loc, (req, res) => {
    try {
        res.send(buildFragments(about_title, about, aboutme_loc, aboutme_title, ssr_loc, ssr_title));
        last_page = about_loc;
        last_page_title = about_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get(aboutme_loc, (req, res) => {
    try {
        res.send(buildFragments(aboutme_title, about_me, academic_loc, academic_title, about_loc, about_title));
        last_page = aboutme_loc;
        last_page_title = about_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get(academic_loc, (req, res) => {
    try {
        res.send(buildFragments(academic_title, academic, glossary_loc, glossary_title, aboutme_loc, aboutme_title));
        last_page = academic_loc;
        last_page_title = academic_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get(glossary_loc, (req, res) => {
    try {
        res.send(buildFragments(glossary_title, glossary, copy_loc, copy_title, academic_loc, academic_title));
        last_page = glossary_loc;
        last_page_title = glossary_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.get(copy_loc, (req, res) => {
    try {
        res.send(buildFragments(copy_title, copyright, __index_loc, __index_title, glossary_loc, glossary_title));
        last_page = copy_loc;
        last_page_title = copy_title;
    } catch (e) {
        res.status(418);
        res.send(buildErrorPage(e));
    }
});

app.use(function (req, res) {
    res.send(buildErrorPage(`The location: ${req.url} does not exist...`));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});

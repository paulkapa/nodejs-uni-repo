import express from 'express'
import cors from 'cors'
import path from 'path'
const app = express()
const port = process.env.PORT || 5000

app.use( cors() )
app.use( express.json() )
app.use( express.static( path.resolve( '../client/public' ) ) )

import * as nfts from './database/nfts.js'
import * as platform from './database/platform.js'
import logMessage from './lib/logMessage.js'

/**
 * NFT's API - Base Endpoint /api/nft
 */

// all nft's
app.get( "/api/nft/all", async ( req, res ) => {
    if ( req.query.session == "valid_session" ) {
        res.json( { "nft": await nfts.getAllEmojis() } )
    } else {
        res.status( 403 ).send( { data: "not here" } )
    }
    logMessage( `Serve NFT's : GET ${ req.url } - ${ res.statusCode } - ${ res.statusMessage }`, ( res.statusCode != 403 ? "info" : "warning" ) )
} )

// all nft's based on search_string
app.get( "/api/nft/search", async ( req, res ) => {
    if ( req.query.session == "valid_session" ) {
        res.json( { "nft": await nfts.searchEmojis( req.query.search_string.toString() ) } )
    } else {
        res.status( 403 ).send( { data: "not here" } )
    }
    logMessage( `Serve NFT's : GET ${ req.url } - ${ res.statusCode } - ${ res.statusMessage }`, ( res.statusCode != 403 ? "info" : "warning" ) )
} )

// the nft based on emoji_name
app.get( "/api/nft", async ( req, res ) => {
    if ( req.query.session == "valid_session" ) {
        res.json( { "nft": await nfts.getEmoji( req.query.emoji_name.toString() ) } )
    } else {
        res.status( 403 ).send( { data: "not here" } )
    }
    logMessage( `Serve NFT's : GET ${ req.url } - ${ res.statusCode } - ${ res.statusMessage }`, ( res.statusCode != 403 ? "info" : "warning" ) )
} )

// all nft's categories
app.get( "/api/nft/categories", async ( req, res ) => {
    if ( req.query.session == "valid_session" ) {
        res.json( { "nft": await nfts.getCategories() } )
    } else {
        res.status( 403 ).send( { data: "not here" } )
    }
    logMessage( `Serve NFT's : GET ${ req.url } - ${ res.statusCode } - ${ res.statusMessage }`, ( res.statusCode != 403 ? "info" : "warning" ) )
} )

// all nft's in category_name
app.get( "/api/nft/category", async ( req, res ) => {
    if ( req.query.session == "valid_session" ) {
        res.json( { "nft": await nfts.getCategory( req.query.category_name.toString() ) } )
    } else {
        res.status( 403 ).send( { data: "not here" } )
    }
    logMessage( `Serve NFT's : GET ${ req.url } - ${ res.statusCode } - ${ res.statusMessage }`, ( res.statusCode != 403 ? "info" : "warning" ) )
} )

/**
 * Platform API
 */
app.get( "/api/platform", async ( req, res ) => {
    if ( req.query.session == "valid_session" ) {
        res.json( { "platform": await platform.query( req.query ) } )
    } else {
        res.status( 403 ).send( { data: "not here" } )
    }
    logMessage( `Platform API : GET ${ req.url } - ${ res.statusCode } - ${ res.statusMessage }`, ( res.statusCode != 403 ? "info" : "warning" ) )
} )

/**
 * Frontend API - all get requests return the same response (Svelte Client Frontend)
 */
app.get( '*', ( req, res, _next ) => {
    res.sendFile( path.resolve( path.dirname( '.' ), '../client/public/index.html' ) )
    logMessage( `Serve Frontend: GET ${ req.url } - ${ res.statusCode } - ${ res.statusMessage }`, "other" )
} )

/**
 * Listener
 */
app.listen( port, () => {
    logMessage( `Application available at \"http://localhost:${ port }\".`, "other" )
} )

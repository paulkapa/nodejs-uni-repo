import express from 'express'
const app = express()
const port = process.env.PORT || 5000

import cors from 'cors'
import path from 'path'

app.use( cors() )
app.use( express.static( path.resolve( '../client/public' ) ) )

import * as console_out from './lib/console_out.js'
import * as db from './database/db.js'

console.log( console_out.colorText( `Database connection:`, "green" ) )
console.log( console_out.colorText( `${ JSON.stringify( db.configJSON, null, 4 ) }`, "blue" ) )


/**
 * Account API
 */

app.post( "/api/session/signup", ( req, res ) => {
    db.create( { table: "account", account: {} } )
    db.create( { table: "session", session: {} } )
} )

app.post( "/api/session/login", ( req, res ) => {
    db.read( { table: "account", session: {} } )
    db.read( { table: "session", session: {} } )
} )

app.post( "/api/session/edit", ( req, res ) => {
    db.update( { table: "account", account: {} } )
} )

app.post( "/api/session/remove", ( req, res ) => {
    db.remove( { table: "account", account: {} } )
    db.remove( { table: "session", session: {} } )
} )

app.post( "/api/session/logout", ( req, res ) => {
    db.remove( { table: "session", session: {} } )
} )

/**
 * Cart API
 */

app.post( "/api/cart/add", ( req, res ) => {
    db.create( { table: "cart", item: {} } )
    db.create( { table: "session", session: {} } )
} )

app.get( "/api/cart/items", ( req, res ) => {
    db.read( { table: "cart", item: {} } )
    db.read( { table: "session", session: {} } )
} )

app.post( "/api/cart/edit", ( req, res ) => {
    db.update( { table: "cart", item: {} } )
} )

app.get( "/api/cart/remove", ( req, res ) => {
    db.remove( { table: "cart", item: {} } )
    db.remove( { table: "session", session: {} } )
} )

/**
 * Mail API
 */

app.post( "/api/mail", ( req, res ) => {
    db.read( { table: "session", session: {} } )
} )

/**
 * Frontend
 */

app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, '../client/public/index.html' ) )
} )

/**
 * Listener
 */

const server = app.listen( port, () => {
    console.log( console_out.colorText( `Server details:`, "green" ) )
    console.log( console_out.colorText( `${ JSON.stringify( server.address(), null, 4 ) }`, "blue" ) )
    console.log( console_out.colorText( `Application available at \"http://localhost:${ port }\"`, "magenta" ) )
} )

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
import colorText from './lib/colorText.js'
import generateUUID from './lib/generateUUID.js'

/**
 * NFT's API
 */
app.post( "/api/nft/all", async ( req, res ) => {
    if ( req.query.session == "valid session" ) {
        res.send( { data: "yu got the DATA" } )
    } else {
        res.status( 500 ).send( { data: "not here" } )
    }
} )

/**
 * Frontend API
 */
app.get( '*', ( _req, res, _next ) => {
    res.sendFile( path.resolve( path.dirname( '.' ), '../client/public/index.html' ) )
} )

/**
 * Listener
 */
app.listen( port, () => {
    let timestamp = colorText( new Date().toUTCString(), "green" )
    let message = colorText( `Application available at \"http://localhost:${ port }\".`, "magenta" )
    console.log( `[${ timestamp }]: ${ message }` )
} )

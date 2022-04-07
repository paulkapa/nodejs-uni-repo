const express = require( 'express' )
const app = express()
const port = process.env.PORT || 5000

const cors = require( 'cors' )
const path = require( 'path' )
const fs = require( 'fs' )

app.use( cors() )
app.use( express.static( path.resolve( '../client/public' ) ) )

app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, '../client/public/index.html' ) )
} )

app.listen( port, () => {
    console.log( `Access server at http://localhost:${ port }` )
} )

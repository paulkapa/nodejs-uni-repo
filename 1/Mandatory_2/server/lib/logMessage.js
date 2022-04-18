import fs from 'fs'
import path from 'path'
import colorText from './colorText.js'
import generateUUID from './generateUUID.js'

/**
 * Log a message.
 * @param {string} message the message
 * @param {string} level the message importance from [success, info, warning, error, other]
 */
export default async function logMessage( message, level ) {
    const date = new Date()
    let color
    switch ( level ) {
        case "success": color = "green"; break
        case "info": color = "cyan"; break
        case "warning": color = "yellow"; break
        case "error": color = "red"; break
        default: color = "magenta"; break
    }
    let timestamp = colorText( date.toUTCString(), "white" )
    let uuid = colorText( generateUUID(), "green" )
    let log_level = colorText( level.toUpperCase(), color )
    let log_message = colorText( message, color )
    const log_complete = colorText( `[${ timestamp }][${ uuid }][${ log_level }]: ${ log_message }`, color )
    const file_name = `server_log-${ date.getDay() }_${ date.getMonth() }_${ date.getFullYear() }.log`
    let file_log = log_complete
    let array = Array.from( file_log )
    array.forEach( ( v, i, a ) => {
        if ( !"abcdefghijklmnopqrstuvwxyz1234567890`~!@#$%^&*()-_=+[{]};:'\",<.>/?\\| ".includes( v.toLowerCase() ) )
            a[ i ] = ""
    } )
    file_log = String.raw( { raw: array } )
        .replace( /\[30;1m/g, "" )
        .replace( /\[31;1m/g, "" )
        .replace( /\[32;1m/g, "" )
        .replace( /\[33;1m/g, "" )
        .replace( /\[34;1m/g, "" )
        .replace( /\[35;1m/g, "" )
        .replace( /\[36;1m/g, "" )
        .replace( /\[37;1m/g, "" )
        .replace( /\[38;1m/g, "" )
        .replace( /\[39;1m/g, "" )
        .replace( /\[0m/g, "" )
    fs.appendFile( path.resolve( "file://", path.dirname( '.' ), `../logs/${ file_name }` ), `${ file_log }\n`,
        () => console.log( log_complete ) )

    fs.readdir( path.resolve( "./logs" ), ( err, files ) => {
        if ( err ) return console.log( 'Unable to scan directory for old logs: ' + err )
        files.forEach( ( v, i, a ) => {
            if ( file_name != v )
                fs.rm( path.resolve( "./logs/", v ), () => console.log( "Removed old log: " + v ) )
        } )
    } )
}

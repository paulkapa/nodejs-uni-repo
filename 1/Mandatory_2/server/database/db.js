import * as mysql from 'mysql2'
import * as fs from 'fs'
import * as path from 'path'

const configJSON = {}
let pool, promisePool

JSON.parse( fs.readFileSync( path.resolve( './config/db_config.json' ) ).toString(), ( key, value ) => {
    if ( key != null && key != "" && key != undefined )
        configJSON[ key ] = value
} )

if ( configJSON.driver === "mysql" ) {
    pool = mysql.createPool( {
        host: configJSON.host,
        user: configJSON.user,
        password: configJSON.password,
        database: configJSON.database
    } )
    promisePool = pool.promise()
} else {
    pool = mysql.createPool( {
        host: "localhost",
        user: "root",
        password: "",
        database: ""
    } )
    promisePool = pool.promise()
}

export default mysql
export { configJSON }

export async function create( params ) {
    return promisePool.query( `INSERT INTO ${ params.table } (entry) VALUES (entry)` )
}

export async function read( params ) {
    return promisePool.query( `SELECT * FROM ${ params.table } WHERE entry = entry` )
}

export function update( params ) {
    return promisePool.query( `UPDATE ${ params.table } SET entry = entry WHERE entry = entry` )
}

export function remove( params ) {
    return promisePool.query( `DELETE FROM ${ params.table } WHERE entry = entry` )
}

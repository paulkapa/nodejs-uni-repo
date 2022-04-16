import mysql from 'mysql2'

/**
 * Sensitive config file. Not Encrypted!
 */
import sensitive_config_file_1 from '../config/sensitive_config_file_1_dont_open.json' assert {type: "json"}

const promisePool = mysql.createPool( {
    host: sensitive_config_file_1.host,
    user: sensitive_config_file_1.user,
    password: sensitive_config_file_1.password,
    database: sensitive_config_file_1.database
} ).promise()

/**
 * Create entry in database.
 * @param {*} params a json
 * @returns {Promise<*>} Promise
 */
export async function create( params ) {
    return promisePool.query( `INSERT INTO ${ params.table } (${ params.where }) VALUES (${ params.values })` )
}

/**
 * Read entry(ies) from database.
 * @param {*} params a json
 * @returns {Promise<*>} Promise
 */
export async function read( params ) {
    return promisePool.query( `SELECT * FROM ${ params.table } WHERE ${ params.where } = ${ params.values }` )
}

/**
 * Update entry in database.
 * @param {*} params a json
 * @returns {Promise<*>} Promise
 */
export async function update( params ) {
    return promisePool.query( `UPDATE ${ params.table } SET ${ params.setWhere } = ${ params.setValues } WHERE ${ params.where } = ${ params.values }` )
}

/**
 * Delete entry in database.
 * @param {*} params a json
 * @returns {Promise<*>} Promise
 */
export async function remove( params ) {
    return promisePool.query( `DELETE FROM ${ params.table } WHERE ${ params.where } = ${ params.values }` )
}

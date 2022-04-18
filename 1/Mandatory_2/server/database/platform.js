import mysql from 'mysql2'
import logMessage from '../lib/logMessage.js'

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
 * Prepare a sql statement.
 * @param {*} params a json
 * @returns a prepared sql statemnt
 */
function prepareStatment( params ) {
    const table = params.table || ""
    const action = params.action || ""
    let sql = null
    switch ( table ) {
        case "account": {
            switch ( action ) {
                case "INSERT": {
                    sql = "INSERT INTO account (email, password) VALUES ('%%EMAIL%%', '%%PASSWORD%%')"
                    sql.replace( /%%EMAIL%%/g, params.email || "" )
                        .replace( /%%PASSWORD%%/g, params.password || "" )
                    break
                }
                case "SELECT_ID": {
                    sql = "SELECT * FROM account WHERE id = %%ID%%"
                    sql.replace( /%%ID%%/g, params.id || "" )
                    break
                }
                case "SELECT_ALL": {
                    sql = "SELECT * FROM account"
                    break
                }
                case "SELECT_EMAIL": {
                    sql = "SELECT * FROM account WHERE email = '%%EMAIL%%'"
                    sql.replace( /%%EMAIL%%/g, params.email || "" )
                    break
                }
                case "UPDATE_EMAIL": {
                    sql = "UPDATE account SET email = '%%NEW_EMAIL%%' WHERE email = '%%EMAIL%%'"
                    sql.replace( /%%NEW_EMAIL%%/g, params.new_email || "" )
                        .replace( /%%EMAIL%%/g, params.email || "" )
                    break
                }
                case "UPDATE_PASSWORD": {
                    sql = "UPDATE account SET password = '%%NEW_PASSWORD%%' WHERE email = '%%EMAIL%%'"
                    sql.replace( /%%NEW_PASSWORD%%/g, params.new_password || "" )
                        .replace( /%%PASSWORD%%/g, params.password || "" )
                    break
                }
                case "DELETE": {
                    sql = "DELETE FROM account WHERE email = '%%EMAIL%%'"
                    sql.replace( /%%EMAIL%%/g, params.email || "" )
                    break
                }
                default: break
            }
            break
        }
        case "session": {
            switch ( action ) {
                case "INSERT": {
                    sql = "INSERT INTO session (session, data) VALUES ('%%SESSION%%', '%%DATA%%')"
                    sql.replace( /%%SESSION%%/g, params.session || "" )
                        .replace( /%%DATA%%/g, params.data || "" )
                    break
                }
                case "SELECT_ID": {
                    sql = "SELECT * FROM session WHERE id = %%ID%%"
                    sql.replace( /%%ID%%/g, params.id || "" )
                    break
                }
                case "SELECT_ALL": {
                    sql = "SELECT * FROM session"
                    break
                }
                case "SELECT_SESSION": {
                    sql = "SELECT * FROM session WHERE session = '%%SESSION%%'"
                    sql.replace( /%%SESSION%%/g, params.session || "" )
                    break
                }
                case "UPDATE_DATA": {
                    sql = "UPDATE session SET data = '%%DATA%%' WHERE session = '%%SESSION%%'"
                    sql.replace( /%%DATA%%/g, params.data || "" )
                        .replace( /%%SESSION%%/g, params.session || "" )
                    break
                }
                case "DELETE": {
                    sql = "DELETE FROM session WHERE session = '%%SESSION%%'"
                    sql.replace( /%%SESSION%%/g, params.session || "" )
                    break
                }
            }
            break
        }
        case "account_session": {
            switch ( action ) {
                case "INSERT": {
                    sql = "INSERT INTO account_session (account_id, session_id) VALUES (%%ACCOUNT%%, %%SESSION%%)"
                    sql.replace( /%%ACCOUNT%%/g, params.account_id || "" )
                        .replace( /%%SESSION%%/g, params.session_id || "" )
                    break
                }
                case "SELECT_ID": {
                    sql = "SELECT * FROM account_session WHERE id = %%ID%%"
                    sql.replace( /%%ID%%/g, params.id || "" )
                    break
                }
                case "SELECT_ALL": {
                    sql = "SELECT * FROM account_session"
                    break
                }
                case "SELECT_ACCOUNT": {
                    sql = "SELECT * FROM account_session WHERE account_id = %%ACCOUNT%%"
                    sql.replace( /%%ACCOUNT%%/g, params.account_id || "" )
                    break
                }
                case "SELECT_SESSION": {
                    sql = "SELECT * FROM account_session WHERE session_id = %%SESSION%%"
                    sql.replace( /%%SESSION%%/g, params.session_id || "" )
                    break
                }
            }
            break
        }
        case "order": {
            switch ( action ) {
                case "INSERT": {
                    sql = "INSERT INTO order (account_session_id, price, is_placed, is_fulfilled) VALUES (%%ACCOUNT_SESSION_ID%%, %%PRICE%%, %%IS_PLACED%%, %%IF_FULFILLED%%)"
                    sql.replace( /%%ACCOUNT_SESSION_ID%%/g, params.account_session_id || "" )
                        .replace( /%%PRICE%%/g, params.price || "" )
                        .replace( /%%IS_PLACED%%/g, params.is_placed || "" )
                        .replace( /%%IS_FULFILLED%%/g, params.is_fulfilled || "" )
                    break
                }
                case "SELECT_ID": {
                    sql = "SELECT * FROM order WHERE id = %%ID%%"
                    sql.replace( /%%ID%%/g, params.id || "" )
                    break
                }
                case "SELECT_ALL": {
                    sql = "SELECT * FROM order"
                    break
                }
                case "SELECT_ACCOUNT_SESSION_ID": {
                    sql = "SELECT * FROM order WHERE account_session_id = %%ACCOUNT_SESSION_ID%%"
                    sql.replace( /%%ACCOUNT_SESSION_ID%%/g, params.account_session_id || "" )
                    break
                }
                case "UPDATE_IS_PLACED": {
                    sql = "UPDATE order SET is_placed = %%IS_PLACED%% WHERE id = %%ID%%"
                    sql.replace( /%%IS_PLACED%%/g, params.is_placed || "" )
                        .replace( /%%ID%%/g, params.id || "" )
                    break
                }
                case "UPDATE_IS_FULFILLED": {
                    sql = "UPDATE order SET is_fulfilled = %%IS_FULFILLED%% WHERE id = %%ID%%"
                    sql.replace( /%%IS_FULFILLED%%/g, params.is_fulfilled || "" )
                        .replace( /%%ID%%/g, params.id || "" )
                    break
                }
            }
            break
        }
        case "order_item": {
            switch ( action ) {
                case "INSERT": {
                    sql = "INSERT INTO order_item (order_id, item_id, count) VALUES (%%ORDER_ID%%, %%ITEM_ID%%, %%COUNT%%)"
                    sql.replace( /%%ORDER_ID%%/g, params.order_id || "" )
                        .replace( /%%ITEM_ID%%/g, params.item_id || "" )
                        .replace( /%%COUNT%%/g, params.count || "" )
                    break
                }
                case "SELECT_ID": {
                    sql = "SELECT * FROM order_item WHERE id = %%ID%%"
                    sql.replace( /%%ID%%/g, params.id || "" )
                    break
                }
                case "SELECT_ALL": {
                    sql = "SELECT * FROM order_item"
                    break
                }
                case "SELECT_ORDER_ID": {
                    sql = "SELECT * FROM order_item WHERE order_id = %%ORDER_ID%%"
                    sql.replace( /%%ORDER_ID%%/g, params.order_id || "" )
                    break
                }
                case "SELECT_ITEM_ID": {
                    sql = "SELECT * FROM order_item WHERE item_id = %%ITEM_ID%%"
                    sql.replace( /%%ITEM_ID%%/g, params.item_id || "" )
                    break
                }
                case "UPDATE_COUNT": {
                    sql = "UPDATE order_item SET count = %%COUNT%% WHERE id = %%ID%%"
                    sql.replace( /%%COUNT%%/g, params.count )
                        .replace( /%%ID%%/g, params.id || "" )
                    break
                }
                case "DELETE": {
                    sql = "DELETE FROM order_items WHERE item_id = %%ITEM_ID%%"
                    sql.replace( /%%ITEM_ID%%/g, params.item_id || "" )
                    break
                }
            }
            break
        }
        case "items": {
            switch ( action ) {
                case "INSERT": {
                    sql = "INSERT INTO items (item, value, price, stock) VALUES (%%ITEM%%, %%VALUE%%, %%PRICE%%, %%STOCK%%)"
                    sql.replace( /%%ITEM%%/g, params.item || "" )
                        .replace( /%%VALUE%%/g, params.value || "" )
                        .replace( /%%PRICE%%/g, params.price || "" )
                        .replace( /%%STOCK%%/g, params.stock || "" )
                    break
                }
                case "SELECT_ALL": {
                    sql = "SELECT * FROM items"
                    break
                }
                case "SELECT_ITEM": {
                    sql = "SELECT * FROM items WHERE item = '%%ITEM%%'"
                    sql.replace( /%%ITEM%%/g, params.item || "" )
                    break
                }
                case "UPDATE": {
                    sql = "UPDATE items SET stock = %%STOCK%%, price = %%PRICE%% WHERE item = '%%ITEM%%'"
                    sql.replace( /%%STOCK%%/g, params.stock || "" )
                        .replace( /%%PRICE%%/g, params.price || "" )
                        .replace( /%%ITEM%%/g, params.item || "" )
                    break
                }
                case "DELETE": {
                    sql = "DELETE FROM items WHERE item = '%%ITEM%%'"
                    sql.replace( /%%ITEM%%/g, params.item || "" )
                    break
                }
            }
            break
        }
        default: break
    }
    return sql
}

/**
 * Create a query in database.
 * @param {*} params a json
 * @returns {Promise<*>} Promise
 */
export async function query( params ) {
    let sql = null
    try {
        sql = prepareStatment( params )
    } catch ( err ) { }
    if ( sql ) {
        let data = null
        try {
            const response = await promisePool.query( sql )
            data = response
        } catch ( err ) { logMessage( err + "\n" + data, "error" ) }
        return data
    }
    return null
}

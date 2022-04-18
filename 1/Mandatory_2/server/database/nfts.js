import fetch from 'node-fetch'
import logMessage from '../lib/logMessage.js'

/**
 * Sensitive config file. Not Encrypted!
 */
import sensitive_config_file_2 from '../config/sensitive_config_file_2_dont_open.json' assert {type: "json"}

/**
 * Fetch a json with all emojis.
 * @returns {Promise<>} a promise
 */
export async function getAllEmojis() {
    const endpoint = sensitive_config_file_2.complete.get_emojis
    const response = await fetch( endpoint )
    let data
    try {
        data = await response.json()
    } catch ( err ) { logMessage( err + "\n" + data, "error" ) }
    return data
}

/**
 * Fetch a json with all emojis that match a given search string.
 * @param {string} search_string the search string
 * @returns {Promise<>} a promise
 */
export async function searchEmojis( search_string ) {
    const endpoint = sensitive_config_file_2.complete.search_emojis.replace( "%%SEARCH_STRING%%", search_string )
    const response = await fetch( endpoint )
    let data
    try {
        data = await response.json()
    } catch ( err ) { logMessage( err + "\n" + data, "error" ) }
    return data
}

/**
 * Fetch a json with an emoji that matches a given name.
 * @param {string} emoji_name the emoji name
 * @returns {Promise<>} a promise
 */
export async function getEmoji( emoji_name ) {
    const endpoint = sensitive_config_file_2.complete.get_emoji.replace( "%%EMOJI_NAME%%", emoji_name )
    const response = await fetch( endpoint )
    let data
    try {
        data = await response.json()
    } catch ( err ) { logMessage( err + "\n" + data, "error" ) }
    return data
}

/**
 * Fetch a json with all emoji categories.
 * @returns {Promise<>} a promise
 */
export async function getCategories() {
    const endpoint = sensitive_config_file_2.complete.get_categories
    const response = await fetch( endpoint )
    let data
    try {
        data = await response.json()
    } catch ( err ) { logMessage( err + "\n" + data, "error" ) }
    return data
}

/**
 * Fetch a json with all emojis in a given category.
 * @param {string} category_name the category name
 * @returns {Promise<>} a promise
 */
export async function getCategory( category_name ) {
    const endpoint = sensitive_config_file_2.complete.get_category.replace( "%%CATEGORY_NAME%%", category_name )
    const response = await fetch( endpoint )
    let data
    try {
        data = await response.json()
    } catch ( err ) { logMessage( err + "\n" + data, "error" ) }
    return data
}

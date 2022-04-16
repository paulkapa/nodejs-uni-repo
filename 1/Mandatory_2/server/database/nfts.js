import fetch from 'node-fetch'

/**
 * Sensitive config file. Not Encrypted!
 */
import sensitive_config_file_2 from '../config/sensitive_config_file_2_dont_open.json' assert {type: "json"}

/**
 * Fetch a json with all emojis.
 * @returns {*} a json
 */
export function getAllEmojis() {
    fetch( sensitive_config_file_2.complete.get_emojis )
        .then( ( emoji ) => emoji.json() )
        .then( ( emoji_json ) => {
            return emoji_json
        } )
    return null
}

/**
 * Fetch a json with all emojis that match a given search string.
 * @param {string} search_string the search string
 * @returns {*} a json
 */
export function searchEmojis( search_string ) {
    fetch( sensitive_config_file_2.complete.search_emojis.replace( "%%SEARCH_STRING%%", search_string ) )
        .then( ( emoji ) => emoji.json() )
        .then( ( emoji_json ) => {
            return emoji_json
        } )
    return null
}

/**
 * Fetch a json with an emoji that matches a given name.
 * @param {string} emoji_name the emoji name
 * @returns {*} a json
 */
export function getEmoji( emoji_name ) {
    fetch( sensitive_config_file_2.complete.get_emoji.replace( "%%EMOJI_NAME%%", emoji_name ) )
        .then( ( emoji ) => emoji.json() )
        .then( ( emoji_json ) => {
            return emoji_json
        } )
    return null
}

/**
 * Fetch a json with all emoji categories.
 * @returns {*} a json
 */
export function getCategories() {
    fetch( sensitive_config_file_2.complete.get_categories )
        .then( ( emoji ) => emoji.json() )
        .then( ( emoji_json ) => {
            return emoji_json
        } )
    return null
}

/**
 * Fetch a json with all emojis in a given category.
 * @param {string} category_name the category name
 * @returns {*} a json
 */
export function getCategory( category_name ) {
    fetch( sensitive_config_file_2.complete.get_category.replace( "%%CATEGORY_NAME%%", category_name ) )
        .then( ( emoji ) => emoji.json() )
        .then( ( emoji_json ) => {
            return emoji_json
        } )
    return null
}

/**
 * Format the provided text with the specified color and return the result.
 * @param {string} text any string
 * @param {string} color any color in: [black, red, green, yellow, blue, magenta, cyan, white]
 * @returns {string} a color coded text
 */
export default function colorText( text, color ) {
    try {
        switch ( color ) {
            case "black": return `\u001B[30;1m${ text }\u001B[0m`
            case "red": return `\u001B[31;1m${ text }\u001B[0m`
            case "green": return `\u001B[32;1m${ text }\u001B[0m`
            case "yellow": return `\u001B[33;1m${ text }\u001B[0m`
            case "blue": return `\u001B[34;1m${ text }\u001B[0m`
            case "magenta": return `\u001B[35;1m${ text }\u001B[0m`
            case "cyan": return `\u001B[36;1m${ text }\u001B[0m`
            case "white": return `\u001B[37;1m${ text }\u001B[0m`
            default: return `\u001B[39;1m${ text }\u001B[0m` // 39 sets color back to default
        }
    } catch {
        return text
    }
}

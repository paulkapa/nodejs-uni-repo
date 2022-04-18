/**
 * Generate a random number in interval.
 * @param {*} min min value
 * @param {*} max max value
 * @returns a random number
 */
export function getRandomNumber( min, max ) {
    return Math.round( min + Math.random() * ( max - min ) )
}

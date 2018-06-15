/**
 * Ensures a string is always a specified length by adding a specified amount of a specified character to the left (padding).
 * @param text The string to be formatted.
 * @param pad The target length of the string.
 * @param char 
 */
export default function leftPad(text: string, pad: number, char='0'): string {
    pad = pad - text.length + 1;
    return pad > 0 ? new Array(pad).join(char) + text : text;
}
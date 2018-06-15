
/**
* Prints a given message to console once per amount of frames specified.
* @param interval The amount of frames that need to pass for the text to be printed every time.
* @param text The text to be printed.
*/
let counter = 0;
export function printAtInterval(interval: number, text: string) {
    if (counter >= interval) {
        console.log(text);
        counter = 0;
    } else {
        counter ++;
    }
}
/**
* Prints a given message to console once per amount of frames specified.
* @param interval the amount of frames that need to pass for the text to be printed every time.
* @param text the text to be printed.
*/
export function printAtInterval(interval: number, text: string) {
    let counter = 0;
    if (counter >= interval) {
        console.log(text);
    }
    while(counter < interval) {
        counter ++;
    }
}
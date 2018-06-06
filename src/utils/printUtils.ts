/**
* Prints a given message to console once per amount of frames specified.
* @param interval the amount of frames that need to pass for the text to be printed every time.
* @param text the text to be printed.
*/
export function printAtInterval(interval: number, text: string) {
    let counter: number;
    if(counter == undefined) {
        counter = 0;
    } else if(counter < interval) {
        counter ++;
    } else {
        console.log(text);
        counter = 0;
    }
}
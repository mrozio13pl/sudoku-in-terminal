/**
 * Set title of the terminal window.
 * @param {string} title Title.
 */
export function setTerminalTitle(title: string): void {
    if (process.platform === 'win32') {
        process.title = title;
    } else {
        process.stdout.write('\x1B]2;' + title + '\x1B\x5C');
    }
}
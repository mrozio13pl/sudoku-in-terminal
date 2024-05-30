export function isNumeric(value: string): boolean {
    return /^-?\d+$/.test(value);
}

export function isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
}

export function randomArrEl<T>(arr: T[]): T {
    return arr[Math.random() * arr.length | 0];
}

export function mergeArrayToObject<T extends Record<string, any>>(arr: T[]): T {
    return arr.reduce((acc, obj) => ({ ...acc, ...obj }), {} as T);
}

function leftPadZeros(number: number) {
    if (number === 0) {
        return '00';
    }
    return (number < 10 ? '0' : '') + number.toFixed(3).replace(/\.000$/, '');
}

/**
 * Pretty seconds to HH:MM:SS format.
 * @param {number} seconds Time in seconds.
 *
 * @example
 * ```ts
 * prettyTime(150);
 * // => 00:02:30
 * ```
 */
export function prettyTime(seconds: number) {
    const hours = ~~(seconds / 3600);
    const minutes = ~~((seconds % 3600) / 60);
    return [leftPadZeros(hours), leftPadZeros(minutes), leftPadZeros(seconds % 60)].join(':');
}

/**
 * Capitalize first letter in a string.
 * @param {string} str String to capitalize.
 *
 * @example
 * ```ts
 * capitalize('polAnd');
 * // => Poland
 * ```
 */
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Get major version from a version string.
 * @param {string} version Version.
 * @returns {string} Major version.
 *
 * NOTE: For this project purposes, the returned value is not a number but a string for now.
 *
 * @example
 * ```ts
 * getMajorVersion('2.3.0');
 * // => 2
 * ```
 */
export function getMajorVersion(version: string) {
    const match = version.match(/^(\d+)/);
    return match ? match[1] : undefined;
}
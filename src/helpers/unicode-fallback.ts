import isUnicodeSupported from 'is-unicode-supported';

export function unicodeFallback(unicodeString: string, fallback = '') {
    return isUnicodeSupported() ? unicodeString : fallback;
}
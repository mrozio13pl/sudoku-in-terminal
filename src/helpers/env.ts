import process from 'node:process';
import hasFlag from 'has-flag';

export const isDevelopment = process.env.NODE_ENV?.toLowerCase() === 'development' || hasFlag('dev');
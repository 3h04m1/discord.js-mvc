import { readFileSync } from 'node:fs';

export function getPackageJson() {
    const path = process.cwd() + '/package.json';
    return JSON.parse(readFileSync(path, 'utf-8'));
}
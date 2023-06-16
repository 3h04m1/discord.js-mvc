import {pathToRegexp, type Key} from 'path-to-regexp'


/**
 * Extracts parameters from a given path based on a pattern.
 * @param path - The path to extract parameters from.
 * @param pattern - The pattern used to match the path.
 * @returns An object containing the extracted parameters as key-value pairs.
 */
export function extractParams(path: string, pattern: string): Record<string, any> {
    const keys: Key[] = [];
    const regex = pathToRegexp(pattern, keys);
    const match = regex.exec(path);
  
    if (match == null) {
      return {};
    }
  
    const params: Record<string, any> = {};
    for (let i = 0; i < keys.length; i++) {
      params[keys[i].name] = match[i + 1];
    }
  
    return params;
  }
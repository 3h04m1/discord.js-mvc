import { MaybeArray } from "../types";

export function toArray(value: MaybeArray) {
    return Array.isArray(value) ? value : [value];
}
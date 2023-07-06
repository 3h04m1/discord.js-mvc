import {error as formatedError} from '../ui/messages';

export function error(message: string) {
    console.error(formatedError(message));
    process.exit(1);
}
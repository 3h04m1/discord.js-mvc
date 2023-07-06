export const DEFAULTS = {
    name: 'newBot',
    typescript: true,
    // packageJsonDefaults
    author: "",
    description: "",
    license: "MIT",
    version: "0.0.1",
};

export function writeDefaults(options: any) {
    Object.entries(DEFAULTS).forEach(([key, value]) => {
        if (!options[key]) {
            options[key] = value;
        }
    });
    return options;
}
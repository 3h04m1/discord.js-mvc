import findPkg from "find-package-json";

export function getPackageJson() {
    const iterator = findPkg(process.cwd());
    for (const pkg of iterator) {
        if (pkg.__path) return pkg;
    }
}
# CLI
Discord.js MVC comes with a powerfull CLI, with it you can create 
new plugins, controllers, middlewares, and even apps.

## Installation
To install the CLI, you need to install the package globally,
you can do that by running the following command:
```bash
npm i -g @discordjs-mvc/cli
# or
yarn global add @discordjs-mvc/cli
```
Now you can use the CLI by running the following command:
```bash
djs-mvc <command> [options]
```

## Usage
Currently the CLI has 2 commands, `new` and `generate`.

### New (alias: n)
The `new` command is used to create a new Discord.js MVC bot,
you can use it by running the following command:
```bash
djs-mvc new <name> [options]
# or using the alias
djs-mvc n <name> [options]
```
The `name` argument is the name of the bot, and the `options` are
the options for the project, the available options are:
- `--language` or `-l`: The language of the bot, the available languages are:
  - `javascript`: JavaScript
  - `typescript`: TypeScript
- `--package-manager` or `-p`: The package manager to use, the available package managers are:
  - `npm`: NPM
  - `yarn`: Yarn
  - `pnpm`: PNPM
- `--no-git`: If you don't want to initialize a git repository, you can use this option.
- `--no-install`: If you don't want to install the dependencies, you can use this option.
- `-h` or `--help`: To show the help message for this command.

### Generate (alias: g)
The `generate` command is used to generate new plugins, controllers, and middlewares and apps
you can use it by running the following command:
```bash
djs-mvc generate <type> <name> [options]
# or using the alias
djs-mvc g <type> <name> [options]
```
The `type` argument is the type of the file you want to generate, the available types are:
- `plugin` or `p`: To generate a new plugin.
- `controller` or `c`: To generate a new controller.
- `middleware` or `m`: To generate a new middleware.
- `app` or `a`: To generate a new app.

All files will be generated in the `src` under the corresponding directory for the type (ex: `src/plugins` for plugins).

#### Options
The `name` argument is the name of the file, and the `options` are
the options for the file, the available options are:
- `--directory` or `-d`: The directory to generate the file in, this is usefull if you want to group controllers, middlewares, or plugins in a directory.
- `--app <app>`: The app to generate the file in, this is usefull if you want to generate a controller or a middleware in a specific app.
- `-h` or `--help`: To show the help message for this command.

### App
When your bot code grows, it can become painful to have a single router and to store all your controllers in the same directory, that's why Discord.js MVC comes with the concept of apps, an app is a directory that contains a grouped set of controllers, middlewares, and plugins, based on logic, for example, you can have an app for the moderation commands, and another app for the music commands, and another app for the fun commands, and so on. For more information for advanced usage, check the [advanced usage](/guide/advanced-usage) page.
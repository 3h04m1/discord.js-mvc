# Core Concepts
Discord.js MVC is a wrapper around [discord.js](https://discord.js.org/) that 
provides a MVC architecture to build your discord bot, it is written in typescript
and provides a lot of features to help you build your bot.

[[toc]]

## What is MVC?
MVC stands for Model-View-Controller, it is a software design pattern that is
widely used in web development. It is composed of three parts:
- **Model**: The model is the data of your application, it can be a database, a
  file, or anything that contains data.
- **View**: The view is the part that is displayed to the user, it can be a
    message, a command, a button, or anything that is displayed to the user.
- **Controller**: The controller is the part that handles the user's input,
    basically, it is the part that handles the user's interactions with the
    bot.

## How does it work?
Discord.js MVC extends the functionality of discord.js by adding a router that
handles the user's input and calls the right controller. It also provides a
context object that wraps the discord.js message or interaction object and 
provides a lot of ways to make your code cleaner,easier to read and extend.

## Why should I use it?
Discord.js MVC provides better development experience by providing some useful
features like:
- **Middlewares** to handle the user's input before calling the controller.
- **Plugins** to extend the functionality of the context object.
- **Flavors** to extend the context object.

## How to structure my bot?
Discord.js MVC encourages you to structure your bot by the MVC pattern, but it
is not mandatory, you can use it as you want.

### Project structure
We strongly recommend you to separate your bot's code into multiple files and folders
to make it easier to maintain and extend

#### Folder structure
Seprate your bot's code into multiple folders, each folder should contain a
specific part of your bot's code, for example, you can create a folder for
`controllers`, `views`, `models`, `middlewares`, `plugins`, etc.

#### File structure
In the main folder of your bot you should have the index file that will start
your bot, router file that will handle the user's input and call the right
controller.

#### How to structure my controllers, views, models, etc?
You can structure your controllers, views, models, etc. as you want, but we
recommend you to create a folder for each controller, view or model, based on
your bot's functionality, for example, you can create a folder for all the controllers 
that are related to the user's profile, another folder for all the controllers
that are related to the user's settings, etc.
You should have something like this:
```
├── controllers
│   ├── profile
│   │   ├── index.ts
│   │   ├── edit.controller.ts
│   │   └── ...
│   ├── settings
│   │   ├── index.ts
│   │   ├── edit.controller.ts
│   │   └── ...
│   └── ...
├── views
│   ├── profile
│   │   ├── index.ts
│   │   ├── edit.command.ts
│   │   └── ...
│   ├── settings
│   │   ├── index.ts
│   │   ├── edit.command.ts
│   │   └── ...
│   └── ...
└── ...
```
#### Naming conventions
We recommend you to name your files and folders based on their functionality,
and the type of the function, class, object you are exporting, for example, you
can name your controllers like this:
- `edit.controller.ts`, 
- `delete.controller.ts`,
- `create.controller.ts`, 
- etc

and your views like this:
-  `edit.command.ts`,
- `delete.button.ts`,
- `create.form.ts`, 
- etc.

For middlewares, plugins, and models you can name them like this:
- `admin.middleware.ts`,
- `database.plugin.ts`,
- `user.model.ts`, 
- etc.


# Project Structure

## Overview
The project structure will follow the standard MVC pattern. The project will be split into the following folders:
- `controllers` - This folder will contain all the controllers for the application.
- `middlewares` - This folder will contain all the middlewares for the application. This folder is optional. You can create it just if you have some custom middlewares. If you don't have any custom middlewares, you can just use the built-in middlewares.
- `views` - This folder will contain all views, in `discord.js` the views can be all visual content such as embeds, messages, buttons, selects, action rows, etc.
- `models` - This folder will contain all the models for the application. This folder is optional. You can create it just if you are using a database
- `router.ts` - This file will contain the main router for the application.

## Overall Example project structure
```
# Project tree
.
├── node_modules
├── package.json
├── src
│   ├── index.ts
│   ├── router.ts
│   ├── controllers
│   │   └── ping.ts
│   ├── middleware
│   │   └── logger.ts
│   ├──views
│       └── commands
│           └── ping.ts
│  
│   
└── tsconfig.json
```
This is how the project will look in VSCode:

[![Project Structure](/images/project-structure.png)](/images/project-structure.png)
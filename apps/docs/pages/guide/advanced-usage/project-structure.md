# Project Structure and Guideline
A good project structure is important for the maintainability of your project.
In the [`Getting Started`'s project structure'](/guide/getting-started/project-structure.)
we covered the more general approach to the project structure, in this section we will cover some more advanced topics,
as well as some best practices for structuring your project for better maintainability and scalability.

## Project structure for large bots
When building a large bot, it's important to keep your code organized and maintainable.
This is especially true for bots that have a lot of commands and events, as it can be difficult to keep track of everything.
In this section, we will cover some best practices for structuring your project to make it easier to manage.

### Use apps
The first thing you should do is split your code into multiple apps.
This will allow you to separate your code into logical units and make it easier to manage.
This approach brings modularity to your project, allowing you to selectively use the components that best suit your project.
Also, it will make it easier to reuse code across multiple bots.

::: tip
You can split your code into multiple apps in a single repository, or you can create separate repositories for each app.
For a mono-repo approach, you can use [Lerna](https://lerna.js.org/) to manage your apps.
:::

### Plugins
All your plugins should be stored in the `plugins` directory in the root of your project, and each plugin should be in its own directory. This will make it easier to manage your plugins and keep them organized.

### Controllers
Try to avoid having too many controllers in your root `controllers` directory.
You can use subdirectories to organize your controllers into logical groups or better yet, you can create an app for each group of controllers.

### Models
`Discord.js MVC` doesn't come with a built-in ORM, so you can use any ORM you want. But we strongly recommend to separate your models/entities in a root `models` directory, and each model/entity should be in its own file/directory.

### Middlewares
In general, based on the middleware's purpose, we have 3 types of middlewares:
- **Global middlewares:** These middlewares are used in all your apps, so they should be stored in the root `middlewares` directory.
- **App middlewares:** These middlewares are used in a specific app, so they should be stored in the `middlewares` directory of that app. Also they can be used in Route Groups.
- **Route middlewares:** These middlewares are used in a specific route, they can be directly used in the.

For more detailed description of middlewares, please refer to the [Middleware](/guide/advanced-usage/middleware) section.

### Services
Services are used to encapsulate business logic and keep it separate from the rest of your code.
They can be used to perform complex operations that require multiple steps, such as interacting with external APIs or databases. Also they can be used to encapsulate the logic of a specific feature.
For example, if you have a feature that requires multiple steps to complete, you can create a service for it and use it in your controllers.
This will make it easier to manage your code and keep it organized. Also, it will make it easier to reuse code across multiple controllers.

We recommend to store your services in the `services` directory in the root of your project or in your app, and each service should be in its own directory.

See the [Services](/guide/advanced-usage/services) section for more information and example.

## Project structure schema
Here is a schema of a project structure for a large bot:

```bash
├── apps (This is the root directory for all your apps)
│   ├── app1
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models (optional)
│   │   ├── services (optional)
│   │   └── index.ts
│   ├── app2
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models (optional)
│   │   ├── services (optional)
│   │   └── index.ts
│   └── app3
│       └── ...
├── plugins (This is the root directory for all your plugins)
│   ├── plugin1
│   │   ├── context.ts
│   │   └── index.ts
│   ├── plugin2
│   │   ├── context.ts
│   │   └── index.ts
│   └── plugin3
│       └── ...
├── middlewares (This is the root directory for your global middlewares)
│   ├── middleware1
│   │   └── index.ts
│   ├── middleware2
│   │   └── index.ts
│   └── middleware3
│       └── ...
├── models (optional)
│   ├── model1.ts
│   ├── model2.ts
│   └── model3.ts
├── services (optional, Here you can store the services that are not related to any app)
│   ├── service1
│   │   └── index.ts
│   ├── service2
│   │   └── index.ts
│   └── service3
│       └── ...
├── controllers
│   ├── controller1.ts
│   ├── controller2.ts
│   └── controller3.ts

├── index.ts
├── router.ts
└── context.ts
```

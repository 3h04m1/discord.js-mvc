import { SidebarConfig } from "vuepress";

export const sidebar: SidebarConfig = [
    {
        text: 'Home',
        link: '/'
    },
    {
        text: 'Getting Started',
        children: [
            '/guide/getting-started/installation',
            '/guide/getting-started/project-structure'
        ]
    },
    {
        text: 'Core Concepts',
        link: '/guide/core-concepts/',
        children: [
                '/guide/core-concepts/routing',
                '/guide/core-concepts/controllers',
                '/guide/core-concepts/middleware',
                '/guide/core-concepts/models',
                '/guide/core-concepts/plugins',
                '/guide/core-concepts/apps',
            ]
    },
    {
        text: 'Examples',
        children: [
            '/examples/ping-pong',
        ]
    },
    {
        text: "CLI",
        children: [
            {
                text: "How to use the CLI",
                link: "cli"
            }
        ]
    },
    {
        text: 'Advanced Usage',
        children: [
            '/guide/advanced-usage',
            '/guide/advanced-usage/project-structure',
            '/guide/advanced-usage/plugins',
            '/guide/advanced-usage/services',
        ]
    },
]
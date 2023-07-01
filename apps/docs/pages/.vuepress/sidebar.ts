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
            ]
    },
    {
        text: 'Examples',
        children: [
            '/examples/ping-pong',
        ]
    }
]
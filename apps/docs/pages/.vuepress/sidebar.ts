import { SidebarConfig } from "vuepress";

export const sidebar: SidebarConfig = [
    {
        text: 'Getting Started',
        children: [
            '/installation',
            '/guide/project-structure'
        ]
    },
    {
        text: 'Guide',
        children: [
                '/guide/getting-started/',
                '/guide/getting-started/routing',
                '/guide/getting-started/controllers',
                '/guide/getting-started/middleware',
                '/guide/getting-started/models',
            ]
    },
    {
        text: 'Examples',
        children: []
    }
]
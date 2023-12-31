import {defineUserConfig, defaultTheme}from 'vuepress'
import {mdEnhancePlugin} from 'vuepress-plugin-md-enhance'
import {sidebar} from './sidebar'

export default defineUserConfig({
    lang: 'en-US',
    title: 'Discord.js MVC',
    description: 'A MVC framework for discord.js',
    theme: defaultTheme({
        sidebarDepth: 2,
        navbar: [
            {
                text: 'Guide',
                link: '/guide/',
            },
            {
                text: 'Examples',
                link: '/examples/',
            },
            {
                text: 'Plugins',
                link: '/plugins/',
                children: []
            },
            {
                text: 'Contribute',
                link: '/contribute/',
            },
            {
                text: 'View on GitHub',
                link: 'https://github.com/3h04m1/discord.js-mvc'
            }
        ],
        sidebar,
        
    }),
    plugins: [
        mdEnhancePlugin({
            codetabs: true,
            container: true,
        }),
    ]
})

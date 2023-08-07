import{_ as e,o as i,c as l,a as t}from"./app-ab3f265b.js";const s="/images/project-structure.png",r={},n=t(`<h1 id="project-structure" tabindex="-1"><a class="header-anchor" href="#project-structure" aria-hidden="true">#</a> Project Structure</h1><h2 id="overview" tabindex="-1"><a class="header-anchor" href="#overview" aria-hidden="true">#</a> Overview</h2><p>The project structure will follow the standard MVC pattern. The project will be split into the following folders:</p><ul><li><code>controllers</code> - This folder will contain all the controllers for the application.</li><li><code>middlewares</code> - This folder will contain all the middlewares for the application. This folder is optional. You can create it just if you have some custom middlewares. If you don&#39;t have any custom middlewares, you can just use the built-in middlewares.</li><li><code>views</code> - This folder will contain all views, in <code>discord.js</code> the views can be all visual content such as embeds, messages, buttons, selects, action rows, etc.</li><li><code>models</code> - This folder will contain all the models for the application. This folder is optional. You can create it just if you are using a database</li><li><code>router.ts</code> - This file will contain the main router for the application.</li></ul><h2 id="overall-example-project-structure" tabindex="-1"><a class="header-anchor" href="#overall-example-project-structure" aria-hidden="true">#</a> Overall Example project structure</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># Project tree
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is how the project will look in VSCode:</p><p><a href="/images/project-structure.png"><img src="`+s+'" alt="Project Structure"></a></p>',8),a=[n];function o(c,d){return i(),l("div",null,a)}const v=e(r,[["render",o],["__file","project-structure.html.vue"]]);export{v as default};

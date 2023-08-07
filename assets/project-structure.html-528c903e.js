import{_ as i,r as t,o as r,c as o,b as e,e as s,d as l,a as n}from"./app-ab3f265b.js";const d={},c=n('<h1 id="project-structure-and-guideline" tabindex="-1"><a class="header-anchor" href="#project-structure-and-guideline" aria-hidden="true">#</a> Project Structure and Guideline</h1><p>A good project structure is important for the maintainability of your project. In the <a href="/guide/getting-started/project-structure."><code>Getting Started</code>&#39;s project structure&#39;</a> we covered the more general approach to the project structure, in this section we will cover some more advanced topics, as well as some best practices for structuring your project for better maintainability and scalability.</p><h2 id="project-structure-for-large-bots" tabindex="-1"><a class="header-anchor" href="#project-structure-for-large-bots" aria-hidden="true">#</a> Project structure for large bots</h2><p>When building a large bot, it&#39;s important to keep your code organized and maintainable. This is especially true for bots that have a lot of commands and events, as it can be difficult to keep track of everything. In this section, we will cover some best practices for structuring your project to make it easier to manage.</p><h3 id="use-apps" tabindex="-1"><a class="header-anchor" href="#use-apps" aria-hidden="true">#</a> Use apps</h3><p>The first thing you should do is split your code into multiple apps. This will allow you to separate your code into logical units and make it easier to manage. This approach brings modularity to your project, allowing you to selectively use the components that best suit your project. Also, it will make it easier to reuse code across multiple bots.</p>',6),u={class:"hint-container tip"},p=e("p",{class:"hint-container-title"},"Tips",-1),h={href:"https://lerna.js.org/",target:"_blank",rel:"noopener noreferrer"},m=n(`<h3 id="plugins" tabindex="-1"><a class="header-anchor" href="#plugins" aria-hidden="true">#</a> Plugins</h3><p>All your plugins should be stored in the <code>plugins</code> directory in the root of your project, and each plugin should be in its own directory. This will make it easier to manage your plugins and keep them organized.</p><h3 id="controllers" tabindex="-1"><a class="header-anchor" href="#controllers" aria-hidden="true">#</a> Controllers</h3><p>Try to avoid having too many controllers in your root <code>controllers</code> directory. You can use subdirectories to organize your controllers into logical groups or better yet, you can create an app for each group of controllers.</p><h3 id="models" tabindex="-1"><a class="header-anchor" href="#models" aria-hidden="true">#</a> Models</h3><p><code>Discord.js MVC</code> doesn&#39;t come with a built-in ORM, so you can use any ORM you want. But we strongly recommend to separate your models/entities in a root <code>models</code> directory, and each model/entity should be in its own file/directory.</p><h3 id="middlewares" tabindex="-1"><a class="header-anchor" href="#middlewares" aria-hidden="true">#</a> Middlewares</h3><p>In general, based on the middleware&#39;s purpose, we have 3 types of middlewares:</p><ul><li><strong>Global middlewares:</strong> These middlewares are used in all your apps, so they should be stored in the root <code>middlewares</code> directory.</li><li><strong>App middlewares:</strong> These middlewares are used in a specific app, so they should be stored in the <code>middlewares</code> directory of that app. Also they can be used in Route Groups.</li><li><strong>Route middlewares:</strong> These middlewares are used in a specific route, they can be directly used in the.</li></ul><p>For more detailed description of middlewares, please refer to the <a href="/guide/advanced-usage/middleware">Middleware</a> section.</p><h3 id="services" tabindex="-1"><a class="header-anchor" href="#services" aria-hidden="true">#</a> Services</h3><p>Services are used to encapsulate business logic and keep it separate from the rest of your code. They can be used to perform complex operations that require multiple steps, such as interacting with external APIs or databases. Also they can be used to encapsulate the logic of a specific feature. For example, if you have a feature that requires multiple steps to complete, you can create a service for it and use it in your controllers. This will make it easier to manage your code and keep it organized. Also, it will make it easier to reuse code across multiple controllers.</p><p>We recommend to store your services in the <code>services</code> directory in the root of your project or in your app, and each service should be in its own directory.</p><p>See the <a href="/guide/advanced-usage/services">Services</a> section for more information and example.</p><h2 id="project-structure-schema" tabindex="-1"><a class="header-anchor" href="#project-structure-schema" aria-hidden="true">#</a> Project structure schema</h2><p>Here is a schema of a project structure for a large bot:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>├── apps <span class="token punctuation">(</span>This is the root directory <span class="token keyword">for</span> all your apps<span class="token punctuation">)</span>
│   ├── app1
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models <span class="token punctuation">(</span>optional<span class="token punctuation">)</span>
│   │   ├── services <span class="token punctuation">(</span>optional<span class="token punctuation">)</span>
│   │   └── index.ts
│   ├── app2
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models <span class="token punctuation">(</span>optional<span class="token punctuation">)</span>
│   │   ├── services <span class="token punctuation">(</span>optional<span class="token punctuation">)</span>
│   │   └── index.ts
│   └── app3
│       └── <span class="token punctuation">..</span>.
├── plugins <span class="token punctuation">(</span>This is the root directory <span class="token keyword">for</span> all your plugins<span class="token punctuation">)</span>
│   ├── plugin1
│   │   ├── context.ts
│   │   └── index.ts
│   ├── plugin2
│   │   ├── context.ts
│   │   └── index.ts
│   └── plugin3
│       └── <span class="token punctuation">..</span>.
├── middlewares <span class="token punctuation">(</span>This is the root directory <span class="token keyword">for</span> your global middlewares<span class="token punctuation">)</span>
│   ├── middleware1
│   │   └── index.ts
│   ├── middleware2
│   │   └── index.ts
│   └── middleware3
│       └── <span class="token punctuation">..</span>.
├── models <span class="token punctuation">(</span>optional<span class="token punctuation">)</span>
│   ├── model1.ts
│   ├── model2.ts
│   └── model3.ts
├── services <span class="token punctuation">(</span>optional, Here you can store the services that are not related to any app<span class="token punctuation">)</span>
│   ├── service1
│   │   └── index.ts
│   ├── service2
│   │   └── index.ts
│   └── service3
│       └── <span class="token punctuation">..</span>.
├── controllers
│   ├── controller1.ts
│   ├── controller2.ts
│   └── controller3.ts

├── index.ts
├── router.ts
└── context.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function v(b,y){const a=t("ExternalLinkIcon");return r(),o("div",null,[c,e("div",u,[p,e("p",null,[s("You can split your code into multiple apps in a single repository, or you can create separate repositories for each app. For a mono-repo approach, you can use "),e("a",h,[s("Lerna"),l(a)]),s(" to manage your apps.")])]),m])}const f=i(d,[["render",v],["__file","project-structure.html.vue"]]);export{f as default};

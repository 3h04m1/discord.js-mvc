import{_ as n,o as s,c as a,a as t}from"./app-ab3f265b.js";const e={},p=t(`<h1 id="services" tabindex="-1"><a class="header-anchor" href="#services" aria-hidden="true">#</a> Services</h1><p>Services are used to encapsulate business logic and keep it separate from the rest of your code. They can be used to perform complex operations that require multiple steps, such as interacting with external APIs or databases. Also they can be used to encapsulate the logic of a specific feature. For example, if you have a feature that requires multiple steps to complete, you can create a service for it and use it in your controllers. This will make it easier to manage your code and keep it organized. Also, it will make it easier to reuse code across multiple controllers.</p><p>We recommend to store your services in the <code>services</code> directory in the root of your project or in your app, and each service should be in its own directory.</p><h4 id="example" tabindex="-1"><a class="header-anchor" href="#example" aria-hidden="true">#</a> Example</h4><p>For this example we will create a service for the Chuck Norris API. First, let&#39;s create a app called <code>chuckNorris</code> using the CLI:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ discordjs-mvc new app chuckNorris
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Now let&#39;s create a service for the Chuck Norris API, in the <code>chuckNorris</code> app create a directory called <code>services</code> and inside of it a file called <code>chuckNorris.service.ts</code> and add the following code:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// chuckNorris/services/chuckNorris</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">&#39;axios&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">ChuckNorrisService</span> <span class="token punctuation">{</span>
    <span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span>
    <span class="token function">categories</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span>
    <span class="token function">getbyId</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span>
    <span class="token function">search</span><span class="token punctuation">(</span>query<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span>
    <span class="token function">getByCategory</span><span class="token punctuation">(</span>category<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ChuckNorrisService</span> <span class="token keyword">implements</span> <span class="token class-name">ChuckNorrisService</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">readonly</span> baseUrl <span class="token operator">=</span> <span class="token string">&#39;https://api.chucknorris.io/jokes&#39;</span>

    <span class="token keyword">async</span> <span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/random</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> data<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span>

    <span class="token keyword">async</span> <span class="token function">categories</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/categories</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> data
    <span class="token punctuation">}</span>

    <span class="token keyword">async</span> <span class="token function">getbyId</span><span class="token punctuation">(</span>id<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/random?category=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>id<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> data<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span>

    <span class="token keyword">async</span> <span class="token function">search</span><span class="token punctuation">(</span>query<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/search?query=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>query<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> data<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span>

    <span class="token keyword">async</span> <span class="token function">getByCategory</span><span class="token punctuation">(</span>category<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>baseUrl<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/random?category=</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>category<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> data<span class="token punctuation">.</span>value
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">new</span> <span class="token class-name">ChuckNorrisService</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now we can use this service all across our app, and when there should be a change in the API, we can change it in one place. For example, we can use it in a controller like this:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// chuckNorris/controllers/randomJoke.controller.ts</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> Controller <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;discord.js-mvc&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Context <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;../../../context&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ChatInputCommandInteraction <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;discord.js&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> chuckNorrisService <span class="token keyword">from</span> <span class="token string">&quot;../services/chuckNorris.service&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> randomJoke<span class="token operator">:</span> Controller<span class="token operator">&lt;</span>Context<span class="token operator">&lt;</span>ChatInputCommandInteraction<span class="token operator">&gt;&gt;</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> joke <span class="token operator">=</span> <span class="token keyword">await</span> chuckNorrisService<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> ctx<span class="token punctuation">.</span><span class="token function">reply</span><span class="token punctuation">(</span>joke<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now let&#39;s say we want to greet the user with a random joke when they join the server, we can use the same service in the <code>guildMemberAdd</code> event:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// index.ts</span>
<span class="token keyword">import</span> chuckNorrisService <span class="token keyword">from</span> <span class="token string">&quot;apps/chuckNorris/services/chuckNorris.service&quot;</span><span class="token punctuation">;</span>

<span class="token operator">...</span>

client<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;guildMemberAdd&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>member<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> joke <span class="token operator">=</span> <span class="token keyword">await</span> chuckNorrisService<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> member<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>joke<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see, we can use the same service in multiple places, and if there should be a change in the API, we can change it in one place.</p>`,13),o=[p];function c(i,l){return s(),a("div",null,o)}const u=n(e,[["render",c],["__file","services.html.vue"]]);export{u as default};

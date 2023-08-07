import{_ as n,o as a,c as s,a as e}from"./app-ab3f265b.js";const t={},o=e(`<h1 id="middleware" tabindex="-1"><a class="header-anchor" href="#middleware" aria-hidden="true">#</a> Middleware</h1><p>The middleware is a function that will be executed before a specific route or before all routes. Middlewares can be used to do some checks before executing the route or to do some actions that are common between routes (eg. Logging the interaction).</p><p>You can add create a middleware in 2 ways:</p><ol><li>Manually create a middleware function and pass it to the <code>use</code> method.</li><li>Use the <code>generate</code> command to generate a middleware file and then export the middleware function from it.</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>djs-mvc generate middleware middleware1
<span class="token comment"># or</span>
djs-mvc g m middleware1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="creating-a-middleware" tabindex="-1"><a class="header-anchor" href="#creating-a-middleware" aria-hidden="true">#</a> Creating a middleware</h2><p>To create a middleware, you need to create a function that takes 2 parameters: <code>interaction</code> and <code>next</code>. The <code>interaction</code> parameter is the interaction that will be executed after the middleware. The <code>next</code> parameter is a function that will execute the next middleware or the route controller function.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> middleware<span class="token operator">:</span> <span class="token function-variable function">Middleware</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// Do something</span>
    <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To execute the next middleware or the route controller function, you need to call the <code>next</code> function. If you don&#39;t call the <code>next</code> function, the route controller function will not be executed. This is useful when you want to do some checks before executing the route controller function and you want to stop the execution if the checks fail. For example, you can check if the user is an admin or not and if the user is not an admin, you can stop the execution.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>
<span class="token comment">// This is an example, you should have a better way to check if the user is an admin or not</span>
<span class="token keyword">function</span> <span class="token function">isAdmin</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> user<span class="token punctuation">.</span>permissions<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span><span class="token string">&#39;ADMINISTRATOR&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> middleware<span class="token operator">:</span> <span class="token function-variable function">Middleware</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> user <span class="token operator">=</span> ctx<span class="token punctuation">.</span><span class="token function">isInteraction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> ctx<span class="token punctuation">.</span>interaction<span class="token punctuation">.</span>user <span class="token operator">:</span> ctx<span class="token punctuation">.</span>message<span class="token punctuation">.</span>author
    <span class="token function">isAdmin</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">await</span> ctx<span class="token punctuation">.</span><span class="token function">reply</span><span class="token punctuation">(</span><span class="token string">&#39;You are not an admin&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This way, if the user is not an admin, the route controller function will not be executed and you only need to write the check once instead of writing it in every route controller function. Then you can add the middleware to specific route, a group of routes, or to the entire router.</p><div class="hint-container warning"><p class="hint-container-title">Note</p><p>Keep in mind that the middleware does not know the type of context so will have to check it yourself using the <code>isInteraction</code> or <code>isMessage</code> methods.</p></div><h2 id="typing-the-middleware" tabindex="-1"><a class="header-anchor" href="#typing-the-middleware" aria-hidden="true">#</a> Typing the middleware</h2><p>You can type the middleware by adding a generic to the <code>Middleware</code> type. This can be usefull when you are creating a middleware that will be used for a specific interaction type.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> middleware<span class="token operator">:</span> Middleware<span class="token operator">&lt;</span>Context<span class="token operator">&lt;</span>ButtonInteraction<span class="token operator">&gt;&gt;</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>interaction<span class="token punctuation">.</span>customId<span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">Note</p><p>You should use a typed middleware only if you are sure that the middleware will be used only for a specific context type like in Route Groups.</p></div><p>You can add the general Interaction type to the generic to make the middleware work with all interaction types.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> middleware<span class="token operator">:</span> Middleware<span class="token operator">&lt;</span>Context<span class="token operator">&lt;</span>Interaction<span class="token operator">&gt;&gt;</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> interaction <span class="token punctuation">}</span> <span class="token operator">=</span> ctx
    <span class="token keyword">if</span> <span class="token punctuation">(</span>interaction<span class="token punctuation">.</span><span class="token function">isButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>interaction<span class="token punctuation">.</span>customId<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>interaction<span class="token punctuation">.</span><span class="token function">isCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>interaction<span class="token punctuation">.</span>commandName<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;The interaction is not a button or a command&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="adding-a-middleware" tabindex="-1"><a class="header-anchor" href="#adding-a-middleware" aria-hidden="true">#</a> Adding a middleware</h2><p>To add a middleware to a route, you can use the <code>use</code> method.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">new</span> <span class="token class-name">Route<span class="token operator">&lt;</span>ButtonInteraction<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&#39;ping&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>interaction<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> interaction<span class="token punctuation">.</span><span class="token function">reply</span><span class="token punctuation">(</span><span class="token string">&#39;pong&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>middleware1<span class="token punctuation">,</span> middleware2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can also add a middleware to a group of routes.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>Router<span class="token punctuation">.</span>manager<span class="token punctuation">.</span><span class="token function">group</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    middleware<span class="token operator">:</span> <span class="token punctuation">[</span>middleware1<span class="token punctuation">,</span> middleware2<span class="token punctuation">]</span><span class="token punctuation">,</span>
    routes<span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token keyword">new</span> <span class="token class-name">Route<span class="token operator">&lt;</span>ButtonInteraction<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&#39;route1&#39;</span><span class="token punctuation">,</span> controller1<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">Route<span class="token operator">&lt;</span>ButtonInteraction<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&#39;route2&#39;</span><span class="token punctuation">,</span> controller2<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">Route<span class="token operator">&lt;</span>ButtonInteraction<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&#39;route3&#39;</span><span class="token punctuation">,</span> controller3<span class="token punctuation">)</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="middleware-order" tabindex="-1"><a class="header-anchor" href="#middleware-order" aria-hidden="true">#</a> Middleware order</h2><p>The order of the middleware is important. The middleware will be executed in the order they are added to the route or the group.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">new</span> <span class="token class-name">Route<span class="token operator">&lt;</span>ButtonInteraction<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&#39;ping&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>interaction<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> interaction<span class="token punctuation">.</span><span class="token function">reply</span><span class="token punctuation">(</span><span class="token string">&#39;pong&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>middleware1<span class="token punctuation">,</span> middleware2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In this example, the <code>middleware1</code> will be executed before the <code>middleware2</code>. If you want to execute the <code>middleware2</code> before the <code>middleware1</code>, you need to change the order.</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">new</span> <span class="token class-name">Route<span class="token operator">&lt;</span>ButtonInteraction<span class="token operator">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&#39;ping&#39;</span><span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>interaction<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> interaction<span class="token punctuation">.</span><span class="token function">reply</span><span class="token punctuation">(</span><span class="token string">&#39;pong&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>middleware2<span class="token punctuation">,</span> middleware1<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="middleware-execution" tabindex="-1"><a class="header-anchor" href="#middleware-execution" aria-hidden="true">#</a> Middleware execution</h2><p>You can choose to execute the middleware before or after the route controller function. Just call the <code>next</code> function before or after your code.</p><p>For example, let&#39;s say you want to log the execution time of the route controller function. You can do it like this:</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">const</span> middleware<span class="token operator">:</span> <span class="token function-variable function">Middleware</span> <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> next<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> start <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> end <span class="token operator">=</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">The route took </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>end <span class="token operator">-</span> start<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">ms to execute</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="use-cases" tabindex="-1"><a class="header-anchor" href="#use-cases" aria-hidden="true">#</a> Use cases</h2><p>Middlewares are powerful and can be used in many ways. Here are some examples of what you can do with middlewares:</p><ul><li>Limit the access to a route to a specific user or a group of users</li><li>Log the interactions, messages, errors, etc...</li><li>Create guards to check if the user has the permission to execute a certain action</li><li>Check if the user is a bot or not</li><li>Make an anti-spam system</li><li>etc...</li></ul><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>If you have an implementation of a middleware that you think can be useful for other people, feel free to open a PR to add it to the <a href="#">middlewares list</a></p></div>`,36),p=[o];function c(i,l){return a(),s("div",null,p)}const r=n(t,[["render",c],["__file","middleware.html.vue"]]);export{r as default};

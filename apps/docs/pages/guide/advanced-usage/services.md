# Services

Services are used to encapsulate business logic and keep it separate from the rest of your code.
They can be used to perform complex operations that require multiple steps, such as interacting with external APIs or databases. Also they can be used to encapsulate the logic of a specific feature.
For example, if you have a feature that requires multiple steps to complete, you can create a service for it and use it in your controllers.
This will make it easier to manage your code and keep it organized. Also, it will make it easier to reuse code across multiple controllers.

We recommend to store your services in the `services` directory in the root of your project or in your app, and each service should be in its own directory.

#### Example
For this example we will create a service for the Chuck Norris API.
First, let's create a app called `chuckNorris` using the CLI:
```bash
$ discordjs-mvc new app chuckNorris
```

Now let's create a service for the Chuck Norris API, in the `chuckNorris` app create a directory called `services` and inside of it a file called `chuckNorris.service.ts` and add the following code:
```ts
// chuckNorris/services/chuckNorris
import axios from 'axios'

export interface ChuckNorrisService {
    random(): Promise<string>
    categories(): Promise<string[]>
    getbyId(id: number): Promise<string>
    search(query: string): Promise<string>
    getByCategory(category: string): Promise<string>
}

class ChuckNorrisService implements ChuckNorrisService {
    private readonly baseUrl = 'https://api.chucknorris.io/jokes'

    async random(): Promise<string> {
        const { data } = await axios.get(`${this.baseUrl}/random`)
        return data.value
    }

    async categories(): Promise<string[]> {
        const { data } = await axios.get(`${this.baseUrl}/categories`)
        return data
    }

    async getbyId(id: number): Promise<string> {
        const { data } = await axios.get(`${this.baseUrl}/random?category=${id}`)
        return data.value
    }

    async search(query: string): Promise<string> {
        const { data } = await axios.get(`${this.baseUrl}/search?query=${query}`)
        return data.value
    }

    async getByCategory(category: string): Promise<string> {
        const { data } = await axios.get(`${this.baseUrl}/random?category=${category}`)
        return data.value
    }
}

export default new ChuckNorrisService()
```

Now we can use this service all across our app, and when there should be a change in the API, we can change it in one place.
For example, we can use it in a controller like this:
```ts
// chuckNorris/controllers/randomJoke.controller.ts

import { Controller } from "discord.js-mvc";
import { Context } from "../../../context";
import { ChatInputCommandInteraction } from "discord.js";
import chuckNorrisService from "../services/chuckNorris.service";

export const randomJoke: Controller<Context<ChatInputCommandInteraction>> = async (ctx) => {
    const joke = await chuckNorrisService.random()
    await ctx.reply(joke)
}
```

Now let's say we want to greet the user with a random joke when they join the server, we can use the same service in the `guildMemberAdd` event:
```ts
// index.ts
import chuckNorrisService from "apps/chuckNorris/services/chuckNorris.service";

...

client.on('guildMemberAdd', async (member) => {
    const joke = await chuckNorrisService.random()
    await member.send(joke)
})
```

As you can see, we can use the same service in multiple places, and if there should be a change in the API, we can change it in one place.
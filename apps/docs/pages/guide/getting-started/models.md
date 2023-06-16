# Models / Databases / ORMs
This package does not include any database or ORM. You can use any database or ORM you want. Here are some examples:
- [Mongoose](https://mongoosejs.com/)
- [Sequelize](https://sequelize.org/)
- [TypeORM](https://typeorm.io/)
- [Prisma](https://www.prisma.io/)

Here you can find a few examples of how to use some of these ORMs with this package:

## [Prisma](https://www.prisma.io/)

First, install the Prisma CLI globally:

```bash
# npm
npm install -g prisma

# yarn
yarn global add prisma

# pnpm
pnpm add -g prisma
```

Then, initialize Prisma in your project:

```bash
prisma init
```

This will create a `prisma` folder with a `schema.prisma` file inside. Replace the content of this file with the following:

```prisma
// provide the connection URL to your database as the `url` value
datasource db {
  provider = "sqlite" // your database driver
  url      = env("DATABASE_URL") // your database connection string
}
```
    
Then, create a `.env` file in the root of your project with the following content:

```bash
DATABASE_URL="file:./dev.db"
```

Finally, run the following command to generate the Prisma client:

```bash
prisma generate
```

### Create a database provider
To not create a new Prisma client instance every time you need to access the database, you can create a database provider,
in this case, a Prisma provider. This provider will be a singleton, so you can import it anywhere in your project and use it.
Create a new file called `db.ts` in the `src` folder with the following content:

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Prevent multiple instances of Prisma Client in development
prisma.$on('beforeExit', () => {
  prisma.$disconnect()
})

export default prisma
```
Now, you can import this provider anywhere in your project and use it:

```ts
import prisma from './db'

const tasks = await prisma.task.findMany()
```

### Create a database model
In prisma, you don't need to create a model in the project files, you can create it directly in the `schema.prisma` file.

```prisma
model Task {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
After creating a new model, you need to run the following command to update the database schema:

```bash
prisma migrate dev --name init
```

### Use the database model
Now, you can use the model in your project:

```ts
import prisma from './db'

const tasks = await prisma.task.findMany()
```

::: tip
For more information about Prisma, check the [official documentation](https://www.prisma.io/docs/).
:::

## TypeORM

First, install TypeORM globally:

```bash
# npm
npm install -g typeorm

# yarn
yarn global add typeorm

# pnpm
pnpm add -g typeorm
```

Then, initialize TypeORM in your project:

```bash
typeorm init --database sqlite
```





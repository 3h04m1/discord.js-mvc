export const DEPENDENCIES = [
    'discord.js',
    'discord.js-mvc',
]

export const DEV_DEPENDENCIES = [
    'prettier',
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
]

export const DB_DEPENDENCIES = {
    typeorm: [
        'typeorm',
        'pg',
    ],
    sequelize: [
        'sequelize',
        'pg',
    ],
    mongoose: [
        'mongoose',
    ],
    prisma: [
        'prisma',
    ],
}
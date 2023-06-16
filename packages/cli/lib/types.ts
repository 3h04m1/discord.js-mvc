export interface OrmListChoice {
    name: string;
    value: OrmType;
}

export type OrmType = 'typeorm' | 'sequelize' | 'mongoose' | 'prisma';

export type PackageManager = "npm" | "yarn" | "pnpm";

export interface BaseNewBotData {
    name: string;
    typescript: boolean;
    orm: boolean;
    packageManager: PackageManager;
}

export interface NewBotDataWithOrm extends BaseNewBotData {
    orm: true;
    ormType: OrmType;
}

export type NewBotData = BaseNewBotData | NewBotDataWithOrm;

export const hasOrm = (data: NewBotData): data is NewBotDataWithOrm => {
    return data.orm;
}

export interface PackageManagerFunctions {
    init: string[];
    install: string[];
    installDev: string[];
}
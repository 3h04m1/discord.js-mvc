import { DataSource } from "typeorm";

const db = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    entities: [
        __dirname + "/models/*.ts"
    ]
})

db.initialize();

export default db;

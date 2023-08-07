"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const db = new typeorm_1.DataSource({
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    entities: [
        __dirname + "/models/*.ts"
    ]
});
db.initialize();
exports.default = db;

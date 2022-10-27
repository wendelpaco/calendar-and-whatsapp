"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor() {
        this.connect();
    }
    connect() {
        var _a;
        mongoose_1.default.connect((_a = process.env.MONGODB_URL) !== null && _a !== void 0 ? _a : 'mongodb://localhost/test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        }).then(db => console.log('⚡️ Database is connected ⚡️')).catch(err => console.log(err));
    }
}
exports.Database = Database;

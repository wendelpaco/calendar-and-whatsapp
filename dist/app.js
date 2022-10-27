"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const i18n_1 = __importDefault(require("i18n"));
const router_1 = require("./App/routes/router");
const index_1 = require("./database/index");
const WhatsappServiceBot_1 = require("./service/WhatsappServiceBot");
const Initialization_1 = __importDefault(require("./libs/Initialization"));
class App {
    constructor() {
        var _a;
        this.express = (0, express_1.default)();
        i18n_1.default.configure(Initialization_1.default);
        this.express.use(i18n_1.default.init);
        this.express.set('port', (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3333);
        this.middlewares();
        this.database();
        this.routes();
        this.whatsappService();
    }
    middlewares() {
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, cors_1.default)());
        this.express.use((0, morgan_1.default)("dev"));
    }
    database() {
        new index_1.Database();
    }
    routes() {
        this.express.use('/v1', router_1.router);
    }
    whatsappService() {
        this.whatsappServiceBot = new WhatsappServiceBot_1.WhatsappServiceBot();
        this.whatsappServiceBot.botInitialize();
    }
}
exports.App = App;

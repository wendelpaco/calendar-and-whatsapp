"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// function auto-run() 
(() => {
    const app = new app_1.App().express;
    app.listen(app.get('port'));
    console.log(`⚡️ Server listening on ${process.env.SCHEMA}://${process.env.HOST_NAME}:${process.env.PORT} ⚡️`);
})();

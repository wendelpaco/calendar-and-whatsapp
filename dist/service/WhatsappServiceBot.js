"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappServiceBot = void 0;
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const UserModel_1 = __importDefault(require("../App/model/User/UserModel"));
const i18n_1 = require("i18n");
class WhatsappServiceBot {
    constructor() {
        this.start = "🤖🤖🤖 Bot Is On! 🤖🤖🤖";
        this.clientConnected = "🟢 Whatsapp web connected to bot 🟢";
        this.bot = new whatsapp_web_js_1.Client({ authStrategy: new whatsapp_web_js_1.LocalAuth() });
        this.bot.initialize();
        console.log(this.start);
    }
    async botInitialize() {
        try {
            this.bot.on('qr', qr => qrcode_terminal_1.default.generate(qr, { small: true }));
            this.bot.on('ready', () => console.log(this.clientConnected));
            this.bot.on('message', async (msg) => {
                if (msg.body.toUpperCase().includes("CPF")) {
                    const cpf = msg.body.split(" ")[1];
                    const user = await UserModel_1.default.findOne({ cpf });
                    console.log(user);
                    if (!user)
                        return await this.sendMessageFrom(msg.from, (0, i18n_1.__)("user_not_found"));
                    const messageId = await this.sendMessageFrom(msg.from, user.cpf);
                }
            });
        }
        catch (error) {
            console.log("Error in connection of API!");
        }
    }
    async sendMessageFrom(from, message) {
        try {
            const messageId = await this.bot.sendMessage(from, message);
            return messageId.id;
        }
        catch (error) {
            console.log("Error send message!");
        }
    }
    async deleteMessageWithId(messageID) {
        try {
        }
        catch (error) {
            console.log("Error in delete message!");
        }
    }
}
exports.WhatsappServiceBot = WhatsappServiceBot;

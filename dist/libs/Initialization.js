"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
exports.default = {
    locales: ['en', 'pt-BR'],
    directory: path_1.default.join(__dirname, '../locales'),
    defaultLocale: 'pt-BR',
    header: 'accept-language',
    queryParameter: 'lang',
    autoReload: true,
};

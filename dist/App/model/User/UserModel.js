"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        require: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        min: 6,
        select: false,
    },
    name: {
        type: String,
        require: true,
        min: 4,
        lowercase: true,
    },
    cpf: {
        type: String,
        require: true,
        min: 11,
    },
    image: {
        data: Buffer,
        contentType: String,
    }
}, { timestamps: true });
UserSchema.methods.encrypPassword = async (candidatePassword) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    return await bcryptjs_1.default.hash(candidatePassword, salt);
};
UserSchema.methods.comparePasswords = async function (candidatePassword) {
    return await bcryptjs_1.default.compare(candidatePassword, this.password);
};
exports.default = (0, mongoose_1.model)('user', UserSchema);

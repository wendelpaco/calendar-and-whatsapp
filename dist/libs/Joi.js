"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidation = exports.signupValidation = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
const signupValidation = (data) => {
    const UserSchema = joi_1.default.object({
        email: joi_1.default.string().min(6).required().email(),
        password: joi_1.default.string().min(6).required(),
        name: joi_1.default.string().min(4).required(),
        cpf: joi_1.default.string().min(11).max(11).required(),
    });
    return UserSchema.validate(data);
};
exports.signupValidation = signupValidation;
const signinValidation = (data) => {
    const UserSchema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().min(6).required()
    });
    return UserSchema.validate(data);
};
exports.signinValidation = signinValidation;

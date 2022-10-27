"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const Joi_1 = require("../../../libs/Joi");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../../model/User/UserModel"));
class UserController {
    async CreateUserSignup(req, res) {
        var _a;
        const { email, password, name, cpf, image } = req.body;
        // validate user data
        const { error } = (0, Joi_1.signupValidation)(req.body);
        if (error)
            return res.status(400).json({ statusCode: 400, message: error.details[0].message });
        // email already exists
        const userEmail = await UserModel_1.default.findOne({ email: req.body.email });
        if (userEmail)
            return res.status(400).json({ statusCode: 400, message: req.__('email_already') });
        // cpf already exists
        const userCpf = await UserModel_1.default.findOne({ cpf: req.body.cpf });
        if (userCpf)
            return res.status(400).json({ statusCode: 400, message: req.__('cpf_already') });
        try {
            // create user
            const user = new UserModel_1.default({
                email,
                password,
                name,
                cpf,
            });
            user.password = await user.encrypPassword(user.password);
            const userSaved = await user.save();
            // create token
            const tokenGenerate = jsonwebtoken_1.default.sign({ _id: userSaved._id }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'secret', { expiresIn: 60 * 60 * 24 });
            return res.header('authorization', tokenGenerate).status(201).json({ statusCode: 201, message: req.__('user_create'), tokenGenerate });
        }
        catch (err) {
            return res.status(400).json(err);
        }
    }
    async UserSignin(req, res) {
        var _a;
        const { email, password } = req.body;
        const { error } = (0, Joi_1.signinValidation)(req.body);
        if (error)
            return res.status(400).json({ statusCode: 400, message: error.details[0].message });
        const user = await UserModel_1.default.findOne({ email }).select('+password');
        if (!user)
            return res.status(400).json({ statusCode: 400, message: req.__('email_password_wrong') });
        const candidatePassword = await user.comparePasswords(password);
        if (!candidatePassword)
            return res.status(400).json({ statusCode: 400, message: req.__('email_password_wrong') });
        // create a token
        const tokenGenerate = jsonwebtoken_1.default.sign({ _id: user._id }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'secret', { expiresIn: 60 * 60 * 24 });
        return res.header('authorization', tokenGenerate).status(200).json({ statusCode: 200, message: req.__('user_signed'), token: tokenGenerate });
    }
    async UpdateUser(req, res) {
        return res.status(201).json();
    }
    async DeleteUser(req, res) {
        return res.status(201).json();
    }
    async GetUserAll(req, res) {
        try {
            const users = await UserModel_1.default.find();
            return res.status(200).json({ statusCode: 200, users });
        }
        catch (err) {
            return res.status(400).json();
        }
    }
    async GetUserById(req, res) {
        try {
            return res.status(200).json();
        }
        catch (err) {
            return res.status(400).json();
        }
    }
}
exports.UserController = UserController;

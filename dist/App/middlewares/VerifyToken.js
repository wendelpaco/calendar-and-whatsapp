"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Middleware {
    verifyToken(req, res, next) {
        var _a, _b;
        try {
            const token = (_a = req.headers.authorization) !== null && _a !== void 0 ? _a : '';
            if (!token)
                res.status(401).send({ message: 'No token was provided' });
            const parts = token.split(' ');
            if (parts.length < 2)
                res.status(401).send({ message: 'Token error' });
            const [scheme, credentials] = parts;
            if (!/^Bearer$/i.test(scheme))
                res.status(401).send({ message: 'Badly formatted token' });
            const payload = jsonwebtoken_1.default.verify(credentials, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : 'secret');
            req.userId = payload._id;
            next();
        }
        catch (err) {
            res.status(400).send({ message: 'Invalid token' });
        }
    }
}
exports.Middleware = Middleware;

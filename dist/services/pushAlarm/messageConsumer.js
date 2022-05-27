"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFunc = void 0;
const firebase_1 = require("../../loaders/firebase");
const logger_1 = __importDefault(require("../../loaders/logger"));
const messageFunc = (job, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fcmtoken, content } = job.data;
        let message = {
            notification: {
                title: '왈소리 와써💛',
                body: content,
            },
            token: fcmtoken,
        };
        firebase_1.firebaseApp
            .messaging()
            .send(message)
            .then(function (response) {
            logger_1.default.appLogger.log({
                level: 'info',
                message: `Successfully sent message: : ${response} ${content}`
            });
        })
            .catch(function (err) {
            console.log('Error Sending message!!! : ', err);
            logger_1.default.appLogger.log({
                level: 'error',
                message: err.message
            });
        });
        done();
    }
    catch (err) {
        logger_1.default.appLogger.log({ level: "error", message: err.message });
    }
});
exports.messageFunc = messageFunc;
//# sourceMappingURL=messageConsumer.js.map
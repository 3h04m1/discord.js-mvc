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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
class Session {
    constructor(storage, initialValue = {}, userID) {
        this.storage = storage;
        this.initialValue = initialValue;
        this.userID = userID;
        Object.keys(initialValue).forEach(key => {
            this.set(key, initialValue[key]);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.storage.get(this.userID);
            return data[key];
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.storage.set(this.userID, Object.assign(Object.assign({}, yield this.storage.get(this.userID)), { [key]: value }));
        });
    }
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.storage.get(this.userID);
            delete data[key];
            this.storage.set(this.userID, data);
        });
    }
}
exports.Session = Session;

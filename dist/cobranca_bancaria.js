"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const citi_1 = __importDefault(require("./arquivos_retorno/citi"));
class CobrancaBancaria {
    constructor() {
        this.RetornoCNAB400 = async (cnab400) => {
            if (cnab400.bank === 'CITI') {
                return this.retornoCNABCiti.RetornoCNAB400(Object.assign({}, cnab400));
            }
        };
        this.retornoCNABCiti = new citi_1.default();
    }
}
exports.default = CobrancaBancaria;

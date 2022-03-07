"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lerArquivo = exports.gerarStringSequencial = exports.formatarNumero = exports.formatarHoraHHMMSS = exports.formatarDataDDMMAAA = exports.formatarData = exports.addZeroEsquerda = exports.addEspacoDireita = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const lerArquivo = async (fileName, dir) => {
    const fileContent = await fs_1.promises.readFile(path_1.default.join(dir, fileName));
    return fileContent.toString().replace(/(\r\n|\n|\r)/gm, '');
};
exports.lerArquivo = lerArquivo;
const addZeroEsquerda = (num, places = 8) => {
    if (num.toString().length > places) {
        throw new Error('Some field is in incorrect format.');
    }
    return String(num).padStart(places, '0');
};
exports.addZeroEsquerda = addZeroEsquerda;
const addEspacoDireita = (text, places = 8) => {
    if (text.toString().length > places) {
        throw new Error('Some field is in incorrect format.');
    }
    return String(text).padEnd(places, ' ');
};
exports.addEspacoDireita = addEspacoDireita;
const formatarNumero = (num) => (parseInt(num, 10) / 100).toFixed(2);
exports.formatarNumero = formatarNumero;
const formatarData = (date) => {
    if (date.trim() === '') {
        return '';
    }
    const dia = date.slice(0, 2);
    const mes = date.slice(2, 4);
    const ano = date.slice(4, 6);
    return `20${ano}-${mes}-${dia}`;
};
exports.formatarData = formatarData;
const formatarDataDDMMAAA = (date) => {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    return `${day}${month}${date.getFullYear()}`;
};
exports.formatarDataDDMMAAA = formatarDataDDMMAAA;
const formatarHoraHHMMSS = (date) => `${addZeroEsquerda(date.getHours(), 2)}${addZeroEsquerda(date.getMinutes(), 2)}${addZeroEsquerda(date.getSeconds(), 2)}`;
exports.formatarHoraHHMMSS = formatarHoraHHMMSS;
const gerarStringSequencial = (num, char) => {
    let str = '';
    for (let i = 0; i < num; i += 1) {
        str += char;
    }
    return str;
};
exports.gerarStringSequencial = gerarStringSequencial;

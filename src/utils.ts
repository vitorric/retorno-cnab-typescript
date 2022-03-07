import {promises as fs} from 'fs';
import path from 'path';
import readline from 'readline';

const lerArquivo = async (fileName: string, dir: string): Promise<string> => {
  const fileContent = await fs.readFile(path.join(dir, fileName));

  return fileContent.toString().replace(/(\r\n|\n|\r)/gm, '');
};

const addZeroEsquerda = (num: number, places = 8) => {
  if (num.toString().length > places) {
    throw new Error('Some field is in incorrect format.');
  }
  return String(num).padStart(places, '0');
};

const addEspacoDireita = (text: string, places = 8) => {
  if (text.toString().length > places) {
    throw new Error('Some field is in incorrect format.');
  }
  return String(text).padEnd(places, ' ');
};

const formatarNumero = (num: string) => (parseInt(num, 10) / 100).toFixed(2);

const formatarData = (date: string) => {
  if (date.trim() === '') {
    return '';
  }

  const dia = date.slice(0, 2);
  const mes = date.slice(2, 4);
  const ano = date.slice(4, 6);
  return `20${ano}-${mes}-${dia}`;
};

const formatarDataDDMMAAA = (date: Date) => {
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month: any = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  return `${day}${month}${date.getFullYear()}`;
};

const formatarHoraHHMMSS = (date: Date): string => `${addZeroEsquerda(date.getHours(), 2)}${addZeroEsquerda(date.getMinutes(), 2)}${addZeroEsquerda(date.getSeconds(), 2)}`;

const gerarStringSequencial = (num: number, char: string) => {
  let str = '';
  for (let i = 0; i < num; i += 1) {
    str += char;
  }
  return str;
};

export {
  addEspacoDireita,
  addZeroEsquerda,
  formatarData,
  formatarDataDDMMAAA,
  formatarHoraHHMMSS,
  formatarNumero,
  gerarStringSequencial,
  lerArquivo,
};

declare const lerArquivo: (fileName: string, dir: string) => Promise<string>;
declare const addZeroEsquerda: (num: number, places?: number) => string;
declare const addEspacoDireita: (text: string, places?: number) => string;
declare const formatarNumero: (num: string) => string;
declare const formatarData: (date: string) => string;
declare const formatarDataDDMMAAA: (date: Date) => string;
declare const formatarHoraHHMMSS: (date: Date) => string;
declare const gerarStringSequencial: (num: number, char: string) => string;
export { addEspacoDireita, addZeroEsquerda, formatarData, formatarDataDDMMAAA, formatarHoraHHMMSS, formatarNumero, gerarStringSequencial, lerArquivo, };

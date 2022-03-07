export declare type TCNAB400 = {
    fileName: string;
    dir: string;
    retornoTratado: boolean;
};
export declare type TBank = {
    bank: 'CITI';
};
export default class CobrancaBancaria {
    private retornoCNABCiti;
    constructor();
    RetornoCNAB400: (cnab400: TCNAB400 & TBank) => Promise<any>;
}

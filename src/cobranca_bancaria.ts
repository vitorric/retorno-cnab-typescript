import RetornoCNABCiti from './arquivos_retorno/citi';

export type TCNAB400 = {
  fileName: string;
  dir: string;
  retornoTratado: boolean;
}

export type TBank = {
  bank: 'CITI';
};

export default class CobrancaBancaria {
  private retornoCNABCiti: RetornoCNABCiti;

  constructor() {
    this.retornoCNABCiti = new RetornoCNABCiti();
  }

  RetornoCNAB400 = async (cnab400: TCNAB400 & TBank ) => {
    if (cnab400.bank === 'CITI') {
      return this.retornoCNABCiti.RetornoCNAB400({...cnab400})
    }
  };

}
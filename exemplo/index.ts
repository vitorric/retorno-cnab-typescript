import CobrancaBancaria from '../src/index';

const exemploCNAB = async () => {
  const arquivo = await new CobrancaBancaria().RetornoCNAB400({
    dir: './exemplo',
    fileName: 'arquivo_cnab.txt',
    retornoTratado: false,
    bank: 'CITI'
  });
  console.log(arquivo);
};

exemploCNAB();

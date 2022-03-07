import CobrancaBancaria from '../src/index';

const exemploCNAB = async () => {
  const arquivo = await new CobrancaBancaria().RetornoCNAB400({
    dir: './exemplo',
    fileName: 'ret_cob_04032022130528.txt',
    retornoTratado: true,
    bank: 'CITI'
  });
  console.log(arquivo);
};

exemploCNAB();

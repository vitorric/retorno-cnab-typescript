import { TCNAB400 } from 'src/cobranca_bancaria';
export default class ArquivoRetornoCiti {
    #private;
    RetornoCNAB400: (cnab400: TCNAB400) => Promise<any>;
    private codigosOcorrencia;
    private motivosRejeicao;
    private lerCabecalho;
    private lerBoletos;
    private lerRodape;
    private retornoTratado;
}

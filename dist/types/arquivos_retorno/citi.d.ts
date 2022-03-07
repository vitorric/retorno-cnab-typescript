import { TCNAB400 } from 'src/cobranca_bancaria';
import { TRetornoCNAB } from './type';
export default class ArquivoRetornoCiti {
    #private;
    RetornoCNAB400: (cnab400: TCNAB400) => Promise<TRetornoCNAB | {
        cabecalho: {
            tipoRegistro: string;
            codigoRetorno: string;
            literalRetorno: string;
            codigoServico: string;
            literalServico: string;
            citiBankId: string;
            nomeEmpresa: string;
            codigoCitiBank: string;
            nomeBanco: string;
            dataCriacaoArquivo: string;
            densidadeGravacao: string;
            unidadeDensidadeGravacao: string;
            brancos: string;
            numeroSeqArquivo: string;
            brancos2: string;
            dataCredito: string;
            complementoRegistro: string;
            numeroSeqRegistradoArquivo: string;
        };
        boletos: any[];
        rodape: any;
    }>;
    private codigosOcorrencia;
    private motivosRejeicao;
    private lerCabecalho;
    private lerBoletos;
    private lerRodape;
    private retornoTratado;
}

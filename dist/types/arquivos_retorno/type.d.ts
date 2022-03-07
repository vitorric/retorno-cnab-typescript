export declare type TCabecalhoCNAB = {
    dataCriacaoArquivo: string;
};
export declare type TBoletoCNAB = {
    identificacaoTitulo: string;
    nossoNumero: string;
    codigoOcorrencia: string;
    msgOcorrencia: string;
    dataOcorrencia: string;
    codigoRejeicao: string;
    msgRejeicao: string;
    dataVencimento: string;
    valorTitulo: string;
    valorLiquidoRecebido: string;
    valorDescontoConcedido: string;
    valorJurosAcrescimo: string;
    numeroSequecialRegistro: number;
};
export declare type TRodapeCNAB = {
    qtdeTitulos: number;
    valorTitulos: string;
};
export declare type TRetornoCNAB = {
    cabecalho: TCabecalhoCNAB;
    boletos: TBoletoCNAB[];
    rodape: TRodapeCNAB;
};

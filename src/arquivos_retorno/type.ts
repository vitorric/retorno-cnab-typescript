export type TCabecalhoCNAB = {
    dataCriacaoArquivo: string;
}

export type TBoletoCNAB = {
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
}

export type TRodapeCNAB = {
    qtdeTitulos: number;
    valorTitulos: string;
}

export type TRetornoCNAB = {
    cabecalho: TCabecalhoCNAB;
    boletos: TBoletoCNAB[];
    rodape: TRodapeCNAB;
}
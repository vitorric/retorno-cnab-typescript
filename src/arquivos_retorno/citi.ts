import { TCNAB400 } from 'src/cobranca_bancaria';
import { lerArquivo, formatarNumero, formatarData } from '../utils';
import { TRetornoCNAB } from './type';

export default class ArquivoRetornoCiti {
  RetornoCNAB400 = async (cnab400: TCNAB400) => {
    const { fileName, dir, retornoTratado } = cnab400;

    if (!fileName) {
      throw Error('File name invalid!');
    }

    if (!dir) {
      throw Error('Directory path invalid!');
    }

    const arquivo = await lerArquivo(fileName, dir);

    const cnab = this.#lerArquivoCNAB(arquivo);

    if (retornoTratado) {
      return this.retornoTratado(cnab);
    }

    return cnab;
  };

  private codigosOcorrencia = {
    '02': 'Entrada confirmada',
    '03': 'Transação rejeitada',
    '06': 'Liquidação/pagamento',
    '07': 'Desconto Concedido',
    '10': 'Baixa/Devolução',
    '11': 'Em ser (a vencer)',
    '12': 'Abatimento concedido',
    '14': 'Vencimento e/ou valor alterado',
    '15': 'Pago em cartório',
    '17': 'Liquidação após baixa / Liquidação de Título não registrado',
    '18': 'Devolução por Decurso de Prazo',
    '19': 'Confirmação recebimento da instrução de protesto',
    '20': 'Confirmação recebimento da instrução de sustação/cancelamento de protesto',
    '21': 'Confirmação de Pedido de Exclusão da Serasa',
    '22': 'Título enviado para negativação',
    '23': 'Título enviado a cartório',
    '26': 'Instrução Rejeitada',
    '29': 'Alegação do Sacado',
    '31': 'Título negativado na Serasa',
    '34': 'Título retirado de cartório',
    '51': 'Custa de distribuição',
    '52': 'Custa de sustação',
    '53': 'Custa de protesto',
    '95': 'Instrução Negativação Cumprida',
    '96': 'Intenção de Pagamento',
    '97': 'Cancelamento da Intenção de Pagamento',
  }

  private motivosRejeicao = (codigoOcorrencia: string, motivoRejeicao: string): string => {
    const codigoOcorrenciasEspecifico = ['06', '10', '15', '17'];
    let novoCodigoOcorrencia = codigoOcorrencia;
    if (!codigoOcorrenciasEspecifico.includes(codigoOcorrencia)) {
      novoCodigoOcorrencia = '';
    }

    const motivos = {
      '': {
        '09': 'Nosso Número duplicado',
        '11': 'Forma de cadastro do título inválida',
        '15': 'Característica da cobrança incompleta',
        '16': 'Id. registro de dados diferente de 1',
        '18': 'Vencimento fora do prazo de operação',
        '19': 'Rejeitado por processo de crédito',
        '20': 'Valor de Juros invalido',
        '21': 'Espécie de Título Inválida',
        '22': 'Número bancário inválido',
        '23': 'Nosso Número já validado anteriormente',
        '24': 'Código de carteira inválido',
        '25': 'Id. Ocorrência inválido',
        '26': 'Seu número inválido',
        '27': 'Data de vencimento inválida',
        '28': 'Valor do título inválido',
        '29': 'Banco cobrador inválido',
        '30': 'Desconto a conceder não confere',
        '31': 'Tipo de emissão inválida',
        '32': 'Código de aceite diferente de N',
        '33': 'Data de emissão inválida',
        '34': 'Cod. Instrução inválido',
        '38': 'Prazo para instrução inválido (título à vencer)',
        '39': 'Pedido de protesto não permitido para o título',
        '41': 'Tipo ou n.º inscrição sacado inválida',
        '43': 'Falta nome do sacado',
        '44': 'Falta endereço do sacado',
        '46': 'Cep inválido ou praça não coberta',
        '47': 'Falta Cidade do sacado',
        '48': 'Falta Sigla da UF do sacado',
        '49': 'Sigla UF incompatível com o CEP',
        '50': 'Número de seq. de dados inválida',
        '52': 'Id.de trailler diferente de 9',
        '53': 'Erro de sequência do trailler',
        '56': 'Portfólio destino inexistente',
        '57': 'Carteira incompatível',
        '58': 'Dias de instrução inválidos',
        '62': 'Valor do desconto / IOF maior que o valor do título ou zerado',
        '63': 'Data do desconto inválida na inclusão.',
        '67': 'Alteração de dados do Pagador/Sacado Inválida',
        '68': 'Alteração inválida (título caucionado).',
        '69': 'Data desconto inválida na alteração',
        '71': 'Alteração para título não cadastrado.',
        '74': 'Alteração para título já baixado.',
        '75': 'Alteração para título já pago.',
        '76': 'Instrução para protesto de título já em cartório.',
        '78': 'Alteração de vencimento inválida.',
        '79': 'Alteração para desconto por antecipação inválida.',
        '80': 'Data de instrução de desconto inválida.',
        '81': 'Inclusão de título já cadastrado.',
        '82': 'mensagem não tratada – sacado não é eletrônico',
        '83': 'mensagem não tratada – registro de mensagem sem registro detalhe de título',
        '84': 'Conta informada inválida ou não implementada',
        '86': 'E-mail inválido',
        '87': 'Título eletrônico',
        '88': 'Título não eletrônico',
        '89': 'Tipo de moeda inválida',
        '90': 'Prorrogação não permitida.',
        '91': 'Data para pagto. sem juros inválida/ Data de Juros Inválida',
        '92': 'Pedido sustação p/ título s/ instrução protesto',
        '93': 'Alteração para título já protestado ou em cartório.',
        '94': 'Abatimento maior que o valor líquido.',
        '95': 'Vencimento não informado na alteração.',
        '96': 'Alteração com vencimento menor que o atual.',
        '97': 'Falta data de desconto em alteração desta data. Mantendo o vencimento original.',
        '98': 'Juros de títulos contra apresentação',
        '99': 'Instrução de protesto não efetivada por falta de carta de provimento.',
        'U0': 'mínimo inválido',
        'U1': 'máximo inválido',
        'U2': 'Valor da multa inválido',
        'U3': 'Aceita pagamento divergente',
        'U5': 'Código da Multa Inválido',
        'U6': 'Data da Multa Inválida',
        'U7': 'Código de Juro inválido',
        'U8': 'Condição de Pagamento inválida',
        'U9': 'Tipo de código de barras invalido',
        'UA': 'Indicador de apresentação vlr mínimo invalido',
        'X1': 'Alteração para título com instrução de negativação.',
        'X2': 'Título sem instrução de negativação na Serasa',
        'X3': 'Pedido de negativação na Serasa não aceito para o título',
        'X4': 'Serviço de Negativação na Serasa não contratado ou condição não passível de aceitação',
        'X5': 'Pedido de negativação agendado, sujeito a análise de existência de contrato/cumprimento de condição contratual, na data de efetivação'
      },
      '06': { // CODIGO OCORRENCIA = 6
        '01': 'Por saldo',
        '02': 'Por conta',
        '03': 'No próprio Banco',
        '04': 'Compensação Eletrônica (CEL)',
        '05': 'Compensação Convencional',
        '07': 'Após feriado local',
        '08': 'Liquidação Parcial Flex',
        '38': 'Liquidação Interbancária STR',
      },
      '10': { // CODIGO OCORRENCIA = 10
        '09': 'Comandada pelo Banco',
        '10': 'Comandada Cliente/CNAB',
        '11': 'Comandada Cliente On-line',
        '12': 'Decurso de Prazo Cliente',
        '13': 'Decurso de Prazo Banco',
        '14': 'Protestado',
        '15': 'Transferido de carteira',

      },
      '15': { // CODIGO OCORRENCIA = 15
        '08': 'Em cartório',
      },
      '17': { // CODIGO OCORRENCIA = 17
        '01': 'Por saldo',
        '02': 'Por conta',
        '03': 'No próprio Banco',
        '04': 'Compensação Eletrônica (CEL)',
      },
      '90': { // CODIGO OCORRENCIA = 90
        '01': 'Sacado Aceitou o título',
        '02': 'Recusado pelo Sacado',
        '03': 'Decurso de Prazo CIP',
      }
    }

    const motivo = motivos[novoCodigoOcorrencia];
    return motivo[motivoRejeicao.trim()];
  }

  #lerArquivoCNAB = (arquivo: string) => {
    const tamanhoArquivo = arquivo.length;

    // 400 = cabecalho
    // 400 = rodape
    // cada boleto tem 400 posições
    // (1200 - 800) / 400 = 1 boleto
    const qtdBoletos = (tamanhoArquivo - 800) / 400;
    const inicioRodape = (tamanhoArquivo - 400);

    const cabecalho = this.lerCabecalho(arquivo);
    const boletos = [];
    for (let i = 0; i < qtdBoletos; i += 1) {
      boletos.push(this.lerBoletos(arquivo, i + 1));
    }

    const rodape = this.lerRodape(arquivo, inicioRodape);

    return {
      cabecalho,
      boletos,
      rodape,
    };
  };

  private lerCabecalho(arquivo: string) {
    const tipoRegistro = arquivo.slice(0, 1);
    const codigoRetorno = arquivo.slice(1, 2);
    const literalRetorno = arquivo.slice(2, 9);
    const codigoServico = arquivo.slice(9, 11);
    const literalServico = arquivo.slice(11, 26);
    const citiBankId = arquivo.slice(26, 46);
    const nomeEmpresa = arquivo.slice(46, 76);
    const codigoCitiBank = arquivo.slice(76, 79);
    const nomeBanco = arquivo.slice(79, 94);
    const dataCriacaoArquivo = arquivo.slice(94, 100);
    const densidadeGravacao = arquivo.slice(100, 105);
    const unidadeDensidadeGravacao = arquivo.slice(105, 108);
    const brancos = arquivo.slice(108, 114);
    const numeroSeqArquivo = arquivo.slice(114, 117);
    const brancos2 = arquivo.slice(117, 119);
    const dataCredito = arquivo.slice(119, 125);
    const complementoRegistro = arquivo.slice(125, 394);
    const numeroSeqRegistradoArquivo = arquivo.slice(394, 400);

    return {
      tipoRegistro,
      codigoRetorno,
      literalRetorno,
      codigoServico,
      literalServico,
      citiBankId,
      nomeEmpresa,
      codigoCitiBank,
      nomeBanco,
      dataCriacaoArquivo,
      densidadeGravacao,
      unidadeDensidadeGravacao,
      brancos,
      numeroSeqArquivo,
      brancos2,
      dataCredito,
      complementoRegistro,
      numeroSeqRegistradoArquivo
    };
  }

  private lerBoletos(arquivo: string, index = 1): any {
    const linhaInicial = 400 * index;

    const tipoRegistro = arquivo.slice(linhaInicial + 0, linhaInicial + 1);
    const cpfCNPJ = arquivo.slice(linhaInicial + 1, linhaInicial + 3);
    const numeroInscricaoEmpresa = arquivo.slice(linhaInicial + 3, linhaInicial + 17);
    const identificacaoEmpresa = arquivo.slice(linhaInicial + 17, linhaInicial + 37);
    const identificacaoTitulo = arquivo.slice(linhaInicial + 37, linhaInicial + 62);
    const identificacaoEspecieTitulo = arquivo.slice(linhaInicial + 62, linhaInicial + 64);
    const nossoNumero = arquivo.slice(linhaInicial + 64, linhaInicial + 76);
    const brancos = arquivo.slice(linhaInicial + 76, linhaInicial + 82);
    const identificacaoOperacaoCitiBank = arquivo.slice(linhaInicial + 82, linhaInicial + 107);
    const codigoCarteira = arquivo.slice(linhaInicial + 107, linhaInicial + 108);
    const codigoOcorrencia = arquivo.slice(linhaInicial + 108, linhaInicial + 110);
    const dataOcorrencia = arquivo.slice(linhaInicial + 110, linhaInicial + 116);
    const seuNumero = arquivo.slice(linhaInicial + 116, linhaInicial + 126);
    const usoBanco = arquivo.slice(linhaInicial + 126, linhaInicial + 128);
    const nossoNumeroCitiBank = arquivo.slice(linhaInicial + 128, linhaInicial + 140);
    const brancos2 = arquivo.slice(linhaInicial + 140, linhaInicial + 146);
    const dataVencimento = arquivo.slice(linhaInicial + 146, linhaInicial + 152);
    const valorNominalTitulo = arquivo.slice(linhaInicial + 152, linhaInicial + 165);
    const numeroCitibankCompensacao = arquivo.slice(linhaInicial + 165, linhaInicial + 168);
    const prefixoAgenciaCobradora = arquivo.slice(linhaInicial + 168, linhaInicial + 173);
    const emissaoTitulo = arquivo.slice(linhaInicial + 173, linhaInicial + 175);
    const valorDespesasCobranca = arquivo.slice(linhaInicial + 175, linhaInicial + 188);
    const valorDespesasCartorio = arquivo.slice(linhaInicial + 188, linhaInicial + 201);
    const valorJurosDescontado = arquivo.slice(linhaInicial + 201, linhaInicial + 214);
    const valorIOFRetido = arquivo.slice(linhaInicial + 214, linhaInicial + 227);
    const valorAbatimentoConcedido = arquivo.slice(linhaInicial + 227, linhaInicial + 240);
    const valorDescontoConcedido = arquivo.slice(linhaInicial + 240, linhaInicial + 253);
    const valorLiquidoRecebido = arquivo.slice(linhaInicial + 253, linhaInicial + 266);
    const valorJurosAcrescimo = arquivo.slice(linhaInicial + 266, linhaInicial + 279);
    const valorISPBBancoRecebedor = arquivo.slice(linhaInicial + 279, linhaInicial + 287);
    const brancos3 = arquivo.slice(linhaInicial + 287, linhaInicial + 295);
    const dataCredito = arquivo.slice(linhaInicial + 295, linhaInicial + 301);
    const motivoRejeicao = arquivo.slice(linhaInicial + 301, linhaInicial + 321);
    const numeroOperacao = arquivo.slice(linhaInicial + 321, linhaInicial + 334);
    const codigoAlegacao = arquivo.slice(linhaInicial + 334, linhaInicial + 337);
    const numeroCartorio = arquivo.slice(linhaInicial + 337, linhaInicial + 339);
    const numeroProtocolo = arquivo.slice(linhaInicial + 339, linhaInicial + 359);
    const dataProtocolo = arquivo.slice(linhaInicial + 359, linhaInicial + 365);
    const bancoRecebedor = arquivo.slice(linhaInicial + 365, linhaInicial + 368);
    const tipoInscricaoPagador = arquivo.slice(linhaInicial + 368, linhaInicial + 369);
    const numeroInscricaoPagador = arquivo.slice(linhaInicial + 369, linhaInicial + 383);
    const meioPagamento = arquivo.slice(linhaInicial + 383, linhaInicial + 384);
    const canalPagamento = arquivo.slice(linhaInicial + 384, linhaInicial + 385);
    const dataGravacaoArquivo = arquivo.slice(linhaInicial + 385, linhaInicial + 391);
    const brancos4 = arquivo.slice(linhaInicial + 391, linhaInicial + 394);
    const numeroSequecialRegistro = arquivo.slice(linhaInicial + 394, linhaInicial + 400);



    return {
      tipoRegistro,
      cpfCNPJ,
      numeroInscricaoEmpresa,
      identificacaoEmpresa,
      identificacaoTitulo,
      identificacaoEspecieTitulo,
      nossoNumero,
      brancos,
      identificacaoOperacaoCitiBank,
      codigoCarteira,
      codigoOcorrencia,
      dataOcorrencia,
      seuNumero,
      usoBanco,
      nossoNumeroCitiBank,
      brancos2,
      dataVencimento,
      valorNominalTitulo,
      numeroCitibankCompensacao,
      prefixoAgenciaCobradora,
      emissaoTitulo,
      valorDespesasCobranca,
      valorDespesasCartorio,
      valorJurosDescontado,
      valorIOFRetido,
      valorAbatimentoConcedido,
      valorDescontoConcedido,
      valorLiquidoRecebido,
      valorJurosAcrescimo,
      valorISPBBancoRecebedor,
      brancos3,
      dataCredito,
      motivoRejeicao,
      numeroOperacao,
      codigoAlegacao,
      numeroCartorio,
      numeroProtocolo,
      dataProtocolo,
      bancoRecebedor,
      tipoInscricaoPagador,
      numeroInscricaoPagador,
      meioPagamento,
      canalPagamento,
      dataGravacaoArquivo,
      brancos4,
      numeroSequecialRegistro,
    };
  };

  private lerRodape(arquivo: string, linhaInicial: number): any {
    const tipoRegistro = arquivo.slice(linhaInicial + 0, linhaInicial + 1);
    const brancos = arquivo.slice(linhaInicial + 1, linhaInicial + 4);
    const numeroCitibankCompensacao = arquivo.slice(linhaInicial + 4, linhaInicial + 7);
    const brancos2 = arquivo.slice(linhaInicial + 7, linhaInicial + 17);
    const qtdeTitulos = arquivo.slice(linhaInicial + 17, linhaInicial + 25);
    const valorTitulos = arquivo.slice(linhaInicial + 25, linhaInicial + 39);
    const brancos3 = arquivo.slice(linhaInicial + 39, linhaInicial + 394);
    const numeroSequecialRegistro = arquivo.slice(linhaInicial + 394, linhaInicial + 400);

    return {
      tipoRegistro,
      brancos,
      numeroCitibankCompensacao,
      brancos2,
      qtdeTitulos,
      valorTitulos,
      brancos3,
      numeroSequecialRegistro,
    };
  };

  private retornoTratado(arquivo): TRetornoCNAB {
    const { cabecalho, boletos, rodape } = arquivo;

    const boletosSimples = boletos.map((b) => ({
      identificacaoTitulo: b.identificacaoTitulo,
      nossoNumero: b.nossoNumero,
      codigoOcorrencia: b.codigoOcorrencia,
      msgOcorrencia: this.codigosOcorrencia[b.codigoOcorrencia],
      dataOcorrencia: formatarData(b.dataOcorrencia),
      codigoRejeicao: this.motivosRejeicao(b.codigoOcorrencia, b.motivoRejeicao),
      msgRejeicao: this.motivosRejeicao(b.codigoOcorrencia, b.motivoRejeicao),
      dataVencimento: formatarData(b.dataVencimento),
      valorTitulo: formatarNumero(b.valorNominalTitulo),
      valorLiquidoRecebido: formatarNumero(b.valorLiquidoRecebido),
      valorDescontoConcedido: formatarNumero(b.valorDescontoConcedido),
      valorJurosAcrescimo: formatarNumero(b.valorJurosAcrescimo),
      numeroSequecialRegistro: parseInt(b.numeroSequecialRegistro, 10)
    }));

    return {
      cabecalho: {
        dataCriacaoArquivo: formatarData(cabecalho.dataCriacaoArquivo),
      },
      boletos: boletosSimples,
      rodape: {
        qtdeTitulos: parseInt(rodape.qtdeTitulos, 10),
        valorTitulos: formatarNumero(rodape.valorTitulos),
      },
    };
  };
}

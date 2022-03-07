
# Retorno CNAB

  

#### NPM badges

  

<!-- [START badges] -->

[![NPM retorno-cnab-typescript package](https://img.shields.io/npm/v/retorno-cnab-typescript.svg)](https://npmjs.org/package/retorno-cnab-typescript)

[![npm downloads](https://img.shields.io/npm/dm/retorno-cnab-typescript.svg?maxAge=604800)](https://npm-stat.com/charts.html?package=retorno-cnab-typescript&from=2017-01-1)

[![npm downloads](https://img.shields.io/npm/dt/retorno-cnab-typescript.svg?maxAge=604800)](https://npm-stat.com/charts.html?package=retorno-cnab-typescript&from=2017-01-1)

<!-- [END badges] -->

  

# Descrição

  

Biblioteca em NodeJS/TypeScript para ler arquivo retorno CNAB400.

  

Bancos implementados:

  

- [X] Citibank

  
  

# Install

  

```javascript

npm  i  retorno-cnab-typescript

```

  

```javacript

yarn add retorno-cnab-typescript

```

  

# Exemplo de uso

  Para iniciar o projeto, utilize:

```javascript

npm  run  start

```

ou 


```javascript

yarn start

```

Utilizando via código:

```javascript

import CobrancaBancaria from 'retorno-cnab-typescript';

const  exemploCNAB = async () => {
	const  arquivo = await  new  CobrancaBancaria().RetornoCNAB400({
		dir:  './exemplo',
		fileName:  'arquivo_cnab.txt',
		retornoTratado:  false,
		bank:  'CITI'
	});

	console.log(arquivo);
};

exemploCNAB();

```

Altere a tag `retornoTratado` para `true` caso deseja receber os dados resumidos e tratados.
  

# Contribuição

  

Sinta-se livre pra adicionar novas features, criar issues e abrir pull requests.

  

# License

Released under the MIT License.
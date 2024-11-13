# Server

Server contém arquivos que facilitam a execução da extensão offline.

`/site` tem uma cópia do portal do Tesouro Direto, com valores mockados

## Setup

Estando no diretório `server/site`

```
npm install
```

## Executar o portal offline

Estando no diretório `server/site`

```
node index.js
```

## Manutenção

- Abra o site do TD e faça download da página principal
- Mova a página html para `server/site/public/index.html`
- Mova os arquivos para `server/site/public/assets`
- Abra a página de algum título e faça download
- Mova a página para `server/site/public/Title.html`
- Salve o json de resposta de LoadDetalhe em `server/site/public/LoadDetalhe.json`

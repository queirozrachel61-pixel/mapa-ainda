# MAPA AINDA — quiz interativo

Este é o quiz "MAPA AINDA": 8 perguntas, um resultado personalizado, captura de
WhatsApp e uma pergunta final sobre o interesse nos Círculos (Mulheres / Homens).

## Como abrir e testar

Basta abrir o arquivo `index.html` em qualquer navegador (duplo clique nele).
Não precisa de internet, exceto para carregar as fontes (Bodoni Moda e Manrope).

## Estrutura dos arquivos

```
mapa-ainda/
├── index.html        → estrutura de todas as telas do quiz
├── css/
│   └── style.css      → cores, fontes e layout
├── js/
│   └── script.js       → perguntas, pontuação, resultados e formulário
└── README.md          → este arquivo
```

## As 4 coisas que vocês provavelmente vão querer mudar

### 1. O link do grupo/comunidade do WhatsApp (o mais importante)

Este é o link para onde a pessoa vai depois de terminar o quiz — é a "isca"
para o pré-lançamento. Abra `js/script.js` e procure por:

```js
const WHATSAPP_GROUPS = {
  geral: "https://chat.whatsapp.com/COLE-SEU-LINK-AQUI",
  mulheres: "",
  homens: ""
};
```

Troquem `geral` pelo link de convite do grupo ou Comunidade do WhatsApp
(o link que aparece em "Convidar por link", dentro do grupo). Enquanto
`mulheres` e `homens` estiverem em branco, todo mundo vai para o link
`geral`. No dia em que vocês criarem grupos separados por Círculo, basta
colar os links específicos ali — o quiz já está programado para usar o
link certo de acordo com a resposta da pessoa na pergunta de segmentação.

**Dica:** como essa lista deve crescer além das ~10 pessoas de um Círculo,
um Grupo comum do WhatsApp tem limite de 1024 participantes e todo mundo
pode conversar com todo mundo — pode virar bagunça numa lista grande. Uma
**Comunidade do WhatsApp** (com um canal de avisos dentro) costuma ser
melhor para esse tipo de aquecimento pré-lançamento: cresce sem limite de
1024 e só vocês publicam no canal principal.

### 2. Para onde vai o botão menor "Conhecer o AINDA no Instagram"

Logo abaixo, no mesmo arquivo:

```js
const AINDA_URL = "https://www.instagram.com/somosainda";
```

Troque pelo link que preferirem (Instagram, a landing page principal do
AINDA quando estiver publicada, etc.). Esse botão aparece só como opção
secundária, abaixo do botão do grupo.

### 3. Para onde vão os dados de cada participante

Hoje, cada pessoa que termina o quiz tem seus dados salvos automaticamente
no navegador dela (isso serve para testes, não é um banco de dados central).

Quando vocês tiverem uma ferramenta de automação (Google Sheets, CRM,
Zapier, Make, etc.), peçam o "endereço de webhook" dela e cole aqui, também
em `js/script.js`:

```js
const SUBMIT_WEBHOOK_URL = "";
```

Por exemplo: `const SUBMIT_WEBHOOK_URL = "https://hooks.zapier.com/...";`

Assim que esse endereço estiver preenchido, todo resultado passa a ser
enviado automaticamente para lá — nome, WhatsApp, pontuação nos 5 perfis,
resultado predominante e secundário, interesse no Círculo, data e
consentimento.

**Como exportar o que já foi testado:** com o quiz aberto no navegador,
aperte F12 para abrir o console e digite `exportMapaAindaData()` e aperte
Enter. Um arquivo `.csv` com os dados salvos naquele navegador será baixado.

### 4. Textos e perguntas

Todas as perguntas, alternativas e textos dos 5 resultados estão em
`js/script.js`, dentro de `QUESTIONS` (as perguntas) e `PROFILES` (os
resultados). Dá para editar o texto ali sem mexer em mais nada — é tudo
texto simples entre aspas.

## Como funciona a pontuação (caso alguém pergunte)

- Cada uma das 8 perguntas tem 5 alternativas (A a E).
- Cada alternativa escolhida soma 1 ponto ao perfil correspondente.
- No final, o perfil com mais pontos é o "predominante".
- Se dois perfis empatarem em primeiro lugar, os dois aparecem juntos.
- Se três ou mais empatarem, o quiz mostra uma mensagem mais aberta,
  sem apontar um padrão único (isso já está programado e não precisa
  de nenhum ajuste).

## Sobre o link do formulário na landing page

Esse README é só do MAPA AINDA. A landing page principal do AINDA (com o
`FORM_URL`) continua sendo o outro projeto que já entreguei antes — são
duas coisas separadas, que podem se conectar depois (por exemplo, o botão
final do quiz pode apontar para a landing page).

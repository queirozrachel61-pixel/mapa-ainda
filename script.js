/* ==========================================================
   MAPA AINDA — lógica do quiz
   ========================================================== */

/* ----------------------------------------------------------
   CONFIGURAÇÃO — edite aqui quando precisar
   ---------------------------------------------------------- */

// Link de convite do grupo/comunidade do WhatsApp para onde a pessoa vai
// depois do quiz — é a "isca" para pré-lançamento. Cole aqui o link que
// aparece quando vocês tocam em "Convidar por link" na Comunidade (ou
// Grupo) do WhatsApp. Formato: https://chat.whatsapp.com/XXXXXXXXXXXXX
// ou, se for Comunidade: https://chat.whatsapp.com/invite/XXXXXXXXXXXXX
const WHATSAPP_GROUPS = {
  // usado para todo mundo enquanto não houver grupos separados
  geral: "https://chat.whatsapp.com/HsxN6RUNvtU0y9fAWa0c1N",

  // preencha estes dois quando (e se) vocês criarem grupos/sub-grupos
  // separados por Círculo. Deixe em branco ("") para continuar usando
  // o link "geral" acima.
  mulheres: "",
  homens: ""
};

// Link secundário — usado no botão menor "Conhecer o AINDA" no final.
// Troque pelo link da página principal do AINDA quando ela estiver pronta.
const AINDA_URL = "https://www.instagram.com/somosainda";

// Endereço (webhook) para onde os dados de cada participante podem ser
// enviados automaticamente — por exemplo, um Google Apps Script, Zapier,
// Make ou o seu CRM. Deixe em branco ("") para não enviar para lugar
// nenhum ainda: os dados continuam sendo guardados no navegador e podem
// ser exportados (veja o README).
const SUBMIT_WEBHOOK_URL = "";

/* ----------------------------------------------------------
   DADOS DO QUIZ
   ---------------------------------------------------------- */

const QUESTIONS = [
  {
    text: "Quando você começa a gostar de alguém, o que costuma acontecer?",
    options: [
      { letter: "A", text: "Fico muito atento(a) aos sinais da pessoa e preciso sentir que ela também está interessada." },
      { letter: "B", text: "Fico animado(a), mas começo a pensar nos riscos de me machucar." },
      { letter: "C", text: "Me envolvo bastante e tento fazer a relação dar certo." },
      { letter: "D", text: "Gosto, mas preservo bastante meu espaço e minha liberdade." },
      { letter: "E", text: "Observo com calma e tento perceber se existe reciprocidade." }
    ]
  },
  {
    text: "Quando a outra pessoa começa a se afastar, você tende a:",
    options: [
      { letter: "A", text: "Procurar entender o que aconteceu e buscar uma resposta." },
      { letter: "B", text: "Fingir que não me importo e me afastar também." },
      { letter: "C", text: "Tentar mais, conversar mais ou fazer algo para recuperar a proximidade." },
      { letter: "D", text: "Pensar que talvez seja melhor não depender de ninguém." },
      { letter: "E", text: "Observar se aquilo é algo pontual ou se existe um padrão." }
    ]
  },
  {
    text: "Você percebe que costuma se envolver com pessoas que:",
    options: [
      { letter: "A", text: "Demonstram interesse, mas nem sempre conseguem sustentar a proximidade." },
      { letter: "B", text: "Despertam sentimentos fortes, mas também despertam insegurança." },
      { letter: "C", text: "Precisam muito de você ou acabam recebendo muito mais do que você recebe." },
      { letter: "D", text: "São difíceis de acessar emocionalmente." },
      { letter: "E", text: "Não necessariamente são iguais, mas algumas histórias acabam terminando de formas parecidas." }
    ]
  },
  {
    text: "Quando alguma coisa incomoda você em uma relação, o que costuma fazer?",
    options: [
      { letter: "A", text: "Falo, mas antes penso muito em como a outra pessoa vai reagir." },
      { letter: "B", text: "Guardo por um tempo e depois me afasto." },
      { letter: "C", text: "Tento resolver logo e posso insistir bastante na conversa." },
      { letter: "D", text: "Prefiro resolver sozinho(a)." },
      { letter: "E", text: "Procuro falar sobre o que aconteceu e também ouvir o outro lado." }
    ]
  },
  {
    text: "Qual dessas frases mais se aproxima de você?",
    options: [
      { letter: "A", text: "“Eu preciso saber onde estou pisando.”" },
      { letter: "B", text: "“Quando percebo que estou ficando vulnerável, fico com vontade de recuar.”" },
      { letter: "C", text: "“Eu faço muito pela relação e às vezes percebo que recebo pouco.”" },
      { letter: "D", text: "“Eu gosto de ter alguém, mas não quero perder minha liberdade.”" },
      { letter: "E", text: "“Hoje consigo perceber coisas que antes eu demorava muito para perceber.”" }
    ]
  },
  {
    text: "Quando uma relação termina, qual pensamento aparece com mais facilidade?",
    options: [
      { letter: "A", text: "“O que eu fiz de errado?”" },
      { letter: "B", text: "“Eu sabia que não deveria ter me envolvido tanto.”" },
      { letter: "C", text: "“Eu tentei tudo o que podia.”" },
      { letter: "D", text: "“É melhor ficar sozinho(a) do que depender de alguém.”" },
      { letter: "E", text: "“O que essa história pode me ensinar sobre minhas escolhas?”" }
    ]
  },
  {
    text: "Quando você conhece alguém que parece muito disponível emocionalmente, você:",
    options: [
      { letter: "A", text: "Gosto, mas preciso de algum tempo para confiar." },
      { letter: "B", text: "Posso sentir que está rápido ou intenso demais." },
      { letter: "C", text: "Me envolvo e começo a imaginar o futuro." },
      { letter: "D", text: "Posso perder um pouco do interesse." },
      { letter: "E", text: "Observo se as atitudes combinam com as palavras." }
    ]
  },
  {
    text: "Se você pudesse mudar uma coisa na sua vida amorosa hoje, seria:",
    options: [
      { letter: "A", text: "Conseguir confiar sem precisar de tantas garantias." },
      { letter: "B", text: "Conseguir me permitir viver a relação sem fugir quando fico vulnerável." },
      { letter: "C", text: "Aprender a não insistir onde não existe reciprocidade." },
      { letter: "D", text: "Conseguir me abrir sem sentir que estou perdendo minha autonomia." },
      { letter: "E", text: "Fazer escolhas mais conscientes desde o começo." }
    ]
  }
];

const PROFILES = {
  A: {
    shortName: "Precisa de segurança",
    comboPhrase: "buscar segurança",
    title: "O(A) que precisa de segurança",
    highlight: "Você pode buscar sinais, garantias e explicações para conseguir se sentir seguro(a).",
    paragraphs: [
      "Você parece funcionar melhor quando sente que sabe onde está pisando.",
      "Quando existe dúvida, distância ou mudança no comportamento do outro, sua cabeça pode começar a procurar respostas. “Será que aconteceu alguma coisa?” “Será que ele perdeu o interesse?” “Será que fiz alguma coisa?”"
    ],
    behind: "Uma necessidade importante de segurança e previsibilidade. Isso não significa ser carente. Significa que ficar sem saber o que o outro sente pode ser difícil para você.",
    observe: "Nem toda dúvida precisa ser resolvida imediatamente.",
    finalQuestion: "Estou tentando conhecer essa pessoa ou tentando ter certeza de que ela não vai me deixar?",
    synthesis: "Você costuma precisar sentir que sabe onde está pisando — e a dúvida pode disparar uma busca por sinais e garantias."
  },
  B: {
    shortName: "Se protege",
    comboPhrase: "se proteger",
    title: "O(A) que se protege",
    highlight: "Quando se afastar parece mais seguro do que correr o risco de se machucar, a distância pode virar uma maneira de se proteger.",
    paragraphs: [
      "Você quer viver uma relação. Mas quando percebe que está ficando vulnerável, alguma coisa pode mudar.",
      "Pode surgir vontade de se afastar, necessidade de mais espaço ou a sensação de que é melhor não se envolver tanto."
    ],
    behind: "Uma forma de proteção diante da vulnerabilidade. Quando se afastar parece mais seguro do que correr o risco de se machucar, a distância pode virar uma maneira de se proteger.",
    observe: "Nem toda vontade de ir embora significa que você realmente não quer aquela relação.",
    finalQuestion: "Eu realmente não quero essa relação ou estou com medo do que pode acontecer se eu quiser?",
    synthesis: "Diante da vulnerabilidade, a distância pode aparecer como forma de se proteger — mesmo quando parte de você quer ficar."
  },
  C: {
    shortName: "Insiste",
    comboPhrase: "insistir",
    title: "O(A) que insiste",
    highlight: "Você conversa. Tenta entender. Perdoa. Espera. Dá novas chances.",
    paragraphs: [
      "Você costuma acreditar na relação e fazer a sua parte. E às vezes mais do que a sua parte.",
      "Até perceber que está cansado(a) de tentar sustentar algo que deveria ser construído por duas pessoas."
    ],
    behind: "A ideia de que, se você fizer o suficiente, a relação vai dar certo. Mas relação não é uma obra feita por uma pessoa só.",
    observe: "Reciprocidade precisa aparecer nas atitudes, não apenas no que a pessoa diz.",
    finalQuestion: "Estou construindo uma relação com alguém ou tentando construir uma relação por alguém?",
    synthesis: "Você tende a acreditar na relação e fazer mais do que a sua parte, até perceber o cansaço de sustentar sozinho(a)."
  },
  D: {
    shortName: "Preserva demais a própria liberdade",
    comboPhrase: "preservar demais a própria liberdade",
    title: "O(A) que preserva demais a própria liberdade",
    highlight: "Existe uma diferença entre independência e não permitir que ninguém chegue perto demais.",
    paragraphs: [
      "Você valoriza sua autonomia. E isso é importante. Mas existe uma diferença entre independência e não permitir que ninguém chegue perto demais.",
      "Você pode gostar de alguém e ainda ter dificuldade para mostrar necessidades, pedir ajuda, falar sobre sentimentos ou permitir que o outro participe da sua vida."
    ],
    behind: "Uma necessidade forte de manter controle e autonomia.",
    observe: "Intimidade não significa perder a própria liberdade.",
    finalQuestion: "Estou preservando minha liberdade ou evitando a intimidade?",
    synthesis: "Sua autonomia é importante para você — mas às vezes ela pode acabar funcionando como uma distância da intimidade."
  },
  E: {
    shortName: "Está reaprendendo",
    comboPhrase: "reaprender",
    title: "O(A) que está reaprendendo",
    highlight: "Você já começou a olhar para suas histórias de outra maneira.",
    paragraphs: [
      "Em vez de pensar apenas no que o outro fez, consegue perguntar: “O que eu não percebi?” “O que eu aceitei?” “O que eu também preciso aprender?”",
      "Isso não significa que você tenha todas as respostas. Significa que começou a transformar experiência em consciência."
    ],
    behind: "Uma virada de olhar: de pensar apenas no que o outro fez para perceber a própria parte na história.",
    observe: "Perceber um padrão é importante. Fazer diferente é o próximo passo.",
    finalQuestion: "Que escolha diferente eu posso fazer na próxima vez?",
    synthesis: "Você já consegue olhar para suas histórias perguntando o que também é seu nelas — e não só o que o outro fez."
  }
};

const SEGMENTATION_OPTIONS = [
  "Círculo de Mulheres",
  "Círculo de Homens",
  "Quero conhecer os dois",
  "Ainda não sei"
];

/* ----------------------------------------------------------
   ESTADO
   ---------------------------------------------------------- */

const state = {
  currentQuestion: 0,
  answers: [],                       // array de letras, uma por pergunta
  scores: { A: 0, B: 0, C: 0, D: 0, E: 0 },
  resultado: null,                   // objeto calculado ao final do quiz
  nome: "",
  whatsapp: "",
  consentimento_whatsapp: false,
  interesse_circulo: ""
};

/* ----------------------------------------------------------
   NAVEGAÇÃO ENTRE TELAS
   ---------------------------------------------------------- */

function showScreen(id){
  document.querySelectorAll(".screen").forEach(function(el){
    el.classList.remove("is-active");
  });
  document.getElementById(id).classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ----------------------------------------------------------
   FLUXO DO QUIZ
   ---------------------------------------------------------- */

function startQuiz(){
  state.currentQuestion = 0;
  state.answers = [];
  state.scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  document.getElementById("progressWrap").hidden = false;
  renderQuestion();
  showScreen("screen-question");
}

function renderQuestion(){
  const q = QUESTIONS[state.currentQuestion];
  document.getElementById("questionText").textContent = q.text;

  document.getElementById("progressLabel").textContent =
    "Pergunta " + (state.currentQuestion + 1) + " de " + QUESTIONS.length;
  document.getElementById("progressFill").style.width =
    (((state.currentQuestion) / QUESTIONS.length) * 100) + "%";

  const list = document.getElementById("optionsList");
  list.innerHTML = "";

  q.options.forEach(function(opt){
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-card";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.textContent = opt.text;
    btn.addEventListener("click", function(){ selectAnswer(opt.letter, btn); });
    list.appendChild(btn);
  });
}

function selectAnswer(letter, btnEl){
  // trava múltiplos cliques durante a transição
  document.querySelectorAll(".option-card").forEach(function(b){ b.disabled = true; });
  btnEl.classList.add("is-selected");
  btnEl.setAttribute("aria-checked", "true");

  state.answers[state.currentQuestion] = letter;
  state.scores[letter] += 1;

  document.getElementById("progressFill").style.width =
    (((state.currentQuestion + 1) / QUESTIONS.length) * 100) + "%";

  setTimeout(function(){
    document.querySelectorAll(".option-card").forEach(function(b){ b.disabled = false; });

    if (state.currentQuestion < QUESTIONS.length - 1){
      state.currentQuestion += 1;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 320);
}

function finishQuiz(){
  document.getElementById("progressWrap").hidden = true;
  showScreen("screen-transition");

  state.resultado = computeResult(state.scores);

  setTimeout(function(){
    renderResult(state.resultado);
    showScreen("screen-result");
  }, 1100);
}

/* ----------------------------------------------------------
   CÁLCULO DO RESULTADO (com regras de empate)
   ---------------------------------------------------------- */

function computeResult(scores){
  const letters = ["A", "B", "C", "D", "E"];
  const maxScore = Math.max.apply(null, letters.map(function(l){ return scores[l]; }));
  const topProfiles = letters.filter(function(l){ return scores[l] === maxScore; });

  if (topProfiles.length >= 3){
    return { type: "multi_tie", scores: scores };
  }

  if (topProfiles.length === 2){
    return { type: "pair_tie", profiles: topProfiles, score: maxScore, scores: scores };
  }

  // um único perfil predominante — calcular secundário
  const predominant = topProfiles[0];
  const remaining = letters.filter(function(l){ return l !== predominant; });
  const secondScore = Math.max.apply(null, remaining.map(function(l){ return scores[l]; }));
  const secondCandidates = remaining.filter(function(l){ return scores[l] === secondScore; });

  if (secondScore === 0 || secondCandidates.length > 1){
    return {
      type: "single_tied_secondary",
      predominant: predominant,
      score: maxScore,
      scores: scores
    };
  }

  return {
    type: "single_clear_secondary",
    predominant: predominant,
    secondary: secondCandidates[0],
    score: maxScore,
    secondScore: secondScore,
    scores: scores
  };
}

function intensityLabel(score){
  if (score <= 1) return "Esse movimento aparece pouco nas suas respostas.";
  if (score <= 3) return "Esse movimento aparece em algumas situações.";
  if (score <= 5) return "Esse movimento aparece com bastante frequência.";
  return "Esse movimento aparece como uma tendência forte nas suas respostas.";
}

/* ----------------------------------------------------------
   RENDERIZAÇÃO DO RESULTADO
   ---------------------------------------------------------- */

function buildProfileSection(letter, scores){
  const p = PROFILES[letter];
  const section = document.createElement("div");
  section.className = "result-section";
  section.innerHTML =
    '<h3>O que pode estar por trás</h3>' +
    p.paragraphs.map(function(t){ return "<p>" + t + "</p>"; }).join("") +
    "<p>" + p.behind + "</p>" +
    '<h3 style="margin-top:22px;">Um ponto para observar</h3>' +
    "<p>" + p.observe + "</p>";
  return section;
}

function renderResult(result){
  const leadEl = document.getElementById("resultLead");
  const bodyEl = document.getElementById("resultBody");
  const barsEl = document.getElementById("scoreBars");
  leadEl.innerHTML = "";
  bodyEl.innerHTML = "";
  barsEl.innerHTML = "";

  if (result.type === "multi_tie"){
    leadEl.innerHTML =
      '<h2 class="result-lead-title">Seu mapa mostra movimentos diferentes.</h2>' +
      '<p class="result-highlight">Nesse momento, seu resultado não aponta um único padrão — e isso também é uma informação sobre onde você está.</p>';

    const note = document.createElement("div");
    note.className = "result-section";
    note.innerHTML =
      "<p>Diferentes movimentos apareceram com força parecida nas suas respostas. Em vez de um padrão único, isso pode indicar que você reage de formas distintas dependendo da relação, da pessoa ou do momento que está vivendo.</p>" +
      "<p>Vale observar, nas próximas relações, qual desses movimentos aparece primeiro — e em qual contexto.</p>";
    bodyEl.appendChild(note);

  } else if (result.type === "pair_tie"){
    const p1 = PROFILES[result.profiles[0]];
    const p2 = PROFILES[result.profiles[1]];

    leadEl.innerHTML =
      '<h2 class="result-lead-title">Entre ' + p1.comboPhrase + " e " + p2.comboPhrase + '</h2>' +
      '<p class="result-highlight">Seu mapa aponta dois movimentos que aparecem com força.</p>' +
      '<p class="result-band">' + intensityLabel(result.score) + '</p>';

    [p1, p2].forEach(function(p){
      const block = document.createElement("div");
      block.className = "result-pair-block";
      block.innerHTML = "<h4>" + p.title + "</h4><p>" + p.synthesis + "</p>";
      bodyEl.appendChild(block);
    });

  } else if (result.type === "single_tied_secondary"){
    const p = PROFILES[result.predominant];
    leadEl.innerHTML =
      '<h2 class="result-lead-title">' + p.title + '</h2>' +
      '<p class="result-highlight">' + p.highlight + '</p>' +
      '<p class="result-band">' + intensityLabel(result.score) + '</p>';

    bodyEl.appendChild(buildProfileSection(result.predominant, result.scores));

    const note = document.createElement("div");
    note.className = "result-section";
    note.innerHTML =
      "<p>Seu resultado mostra uma tendência principal. Outros movimentos também podem aparecer dependendo da relação e do momento que você está vivendo.</p>" +
      '<p class="result-question">' + p.finalQuestion + '</p>';
    bodyEl.appendChild(note);

  } else { // single_clear_secondary
    const p = PROFILES[result.predominant];
    const p2 = PROFILES[result.secondary];

    leadEl.innerHTML =
      '<h2 class="result-lead-title">' + p.title + '</h2>' +
      '<p class="result-highlight">' + p.highlight + '</p>' +
      '<p class="result-band">' + intensityLabel(result.score) + '</p>';

    bodyEl.appendChild(buildProfileSection(result.predominant, result.scores));

    const finalQ = document.createElement("p");
    finalQ.className = "result-question";
    finalQ.textContent = p.finalQuestion;
    bodyEl.appendChild(finalQ);

    const secNote = document.createElement("div");
    secNote.className = "result-section";
    secNote.style.marginTop = "26px";
    secNote.innerHTML =
      "<h3>Também apareceu no seu mapa</h3>" +
      "<p><strong>" + p2.shortName + ".</strong> " + p2.synthesis + " " + intensityLabel(result.secondScore) + "</p>";
    bodyEl.appendChild(secNote);
  }

  // barras horizontais minimalistas — sem cores diferentes por perfil
  const barsTitle = document.createElement("p");
  barsTitle.className = "score-bars-title";
  barsTitle.textContent = "Como isso apareceu no seu mapa";
  barsEl.appendChild(barsTitle);

  const order = ["A", "B", "C", "D", "E"];
  order.forEach(function(letter){
    const score = result.scores[letter];
    const row = document.createElement("div");
    row.className = "score-bar-row";
    row.innerHTML =
      '<span class="score-bar-label">' + PROFILES[letter].shortName + '</span>' +
      '<span class="score-bar-track"><span class="score-bar-fill" style="width:' + (score / 8 * 100) + '%"></span></span>' +
      '<span class="score-bar-value">' + score + '/8</span>';
    barsEl.appendChild(row);
  });
}

/* ----------------------------------------------------------
   CAPTURA DE WHATSAPP
   ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function(){

  document.getElementById("btnStart").addEventListener("click", startQuiz);

  document.getElementById("btnToWhatsapp").addEventListener("click", function(){
    showScreen("screen-whatsapp");
  });

  document.getElementById("whatsappForm").addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("fieldName").value.trim();
    const whatsapp = document.getElementById("fieldWhatsapp").value.trim();
    const consent = document.getElementById("fieldConsent").checked;
    const errorEl = document.getElementById("formError");

    if (!name || !whatsapp || !consent){
      errorEl.textContent = "Preencha nome, WhatsApp e aceite para continuar.";
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;

    state.nome = name;
    state.whatsapp = whatsapp;
    state.consentimento_whatsapp = true;

    renderSegmentationOptions();
    showScreen("screen-segmentation");
  });

  document.getElementById("btnFinal").setAttribute("href", AINDA_URL);
});

function resolveGroupLink(interesse){
  if (interesse === "Círculo de Mulheres" && WHATSAPP_GROUPS.mulheres){
    return WHATSAPP_GROUPS.mulheres;
  }
  if (interesse === "Círculo de Homens" && WHATSAPP_GROUPS.homens){
    return WHATSAPP_GROUPS.homens;
  }
  return WHATSAPP_GROUPS.geral;
}

function renderSegmentationOptions(){
  const list = document.getElementById("segmentationOptions");
  list.innerHTML = "";

  SEGMENTATION_OPTIONS.forEach(function(label){
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-card";
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", "false");
    btn.textContent = label;
    btn.addEventListener("click", function(){
      state.interesse_circulo = label;
      submitParticipant();
      document.getElementById("btnGroup").setAttribute("href", resolveGroupLink(label));
      showScreen("screen-final");
    });
    list.appendChild(btn);
  });
}

/* ----------------------------------------------------------
   ENVIO / ARMAZENAMENTO DOS DADOS
   ---------------------------------------------------------- */

function submitParticipant(){
  const record = {
    nome: state.nome,
    whatsapp: state.whatsapp,
    perfil_A: state.scores.A,
    perfil_B: state.scores.B,
    perfil_C: state.scores.C,
    perfil_D: state.scores.D,
    perfil_E: state.scores.E,
    perfil_predominante: resolvePredominantLabel(state.resultado),
    perfil_secundario: resolveSecondaryLabel(state.resultado),
    interesse_circulo: state.interesse_circulo,
    data: new Date().toISOString(),
    consentimento_whatsapp: state.consentimento_whatsapp
  };

  // guarda localmente no navegador (útil para testes e para exportar depois)
  try {
    const key = "mapaAindaSubmissions";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(record);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (err) {
    console.warn("Não foi possível salvar localmente:", err);
  }

  // envia para o webhook configurado, se houver
  if (SUBMIT_WEBHOOK_URL){
    fetch(SUBMIT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record)
    }).catch(function(err){
      console.warn("Não foi possível enviar para o webhook:", err);
    });
  }
}

function resolvePredominantLabel(result){
  if (!result) return "";
  if (result.type === "multi_tie") return "empate múltiplo";
  if (result.type === "pair_tie") return result.profiles.join(" + ");
  return result.predominant;
}

function resolveSecondaryLabel(result){
  if (!result) return "";
  if (result.type === "single_clear_secondary") return result.secondary;
  if (result.type === "single_tied_secondary") return "empate";
  return "";
}

/* ----------------------------------------------------------
   EXPORTAÇÃO MANUAL (uso pelo administrador do projeto)
   Abra o navegador, pressione F12 (console) e digite:
   exportMapaAindaData()
   Isso baixa um arquivo .csv com todos os participantes
   salvos neste navegador.
   ---------------------------------------------------------- */

window.exportMapaAindaData = function(){
  const data = JSON.parse(localStorage.getItem("mapaAindaSubmissions") || "[]");
  if (!data.length){
    console.log("Nenhum dado salvo neste navegador ainda.");
    return;
  }

  const headers = Object.keys(data[0]);
  const rows = data.map(function(row){
    return headers.map(function(h){
      const val = String(row[h] === undefined ? "" : row[h]).replace(/"/g, '""');
      return '"' + val + '"';
    }).join(",");
  });
  const csv = headers.join(",") + "\n" + rows.join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "mapa-ainda-dados.csv";
  a.click();
  URL.revokeObjectURL(url);
};

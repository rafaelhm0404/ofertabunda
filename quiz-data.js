// QUIZ DATA CONSOLIDADO PARA DESINFLAME JÃ / TRUQUE DA CAVALA v4
// QUIZ PERSONALIZADO do desinflameja.site — FUNNEL_VARIANT QUIZ_SF_B,
// flow_version "quiz-sf-v3", funnel= "quiz-sf-b". E o braco novo do teste
// A/B do /page2 contra o quiz preto (quiz-sf-data.js, quiz-sf-v2, que segue
// intacto: e o controle). Motor proprio (quiz-sf-b.js), copia do da
// referencia docs/truquedacavala-site (a versao B de
// truquedacavala-site.vercel.app/b, 01/10/2026). O dado de origem e o
// docs/truquedacavala-site/quiz-sf-b-data.js; o que mudou aqui:
//   - identidade: funnelTag 'quiz-sf-b' e a saida /oferta-especial-sf com
//     funnel=quiz-sf-b, pro painel e a venda de saida saberem que e a B;
//   - checkouts: os que o dono guardou pro proximo teste (R$ 27 4a4bea40,
//     saida com o R$ 13,50 6131b05a). O quiz preto vende pelos do quiz atual;
//   - videos reais no lugar dos mockups (images/mock/* saiu inteiro): a
//     elevacao pelvica no bloco C da Pagina do Tipo e o app por dentro no
//     "Como funciona";
//   - "A sua primeira semana" montada pelas respostas (comoFunciona.semana1);
//   - acesso/garantia sem os valores entre colchetes e com o WhatsApp da
//     Jacque; "15 anos" de aula da Brenda (a referencia dizia "mais de 8");
//   - 07/10/2026 (respostas do dono): "mais de 3 mil alunas" no lugar das
//     17 mil e sem os "50 mil seguidores"; a garantia e a regra real (30
//     dias da compra, 100%, sem justificar) no lugar da "Garantia do Toque".
//     A duracao do treino segue a resposta da aluna (08/10/2026, dono: ela
//     pode fazer mais rapido, encurtando os descansos).
//   - 08/10/2026 (dono): cartao do Instagram @sejafitapp no fim do "Quem
//     montou o seu plano" (ver a tela; no /ga ele esta em teste A/B).
//
// Comentario de origem:
// VERSAO B do quiz do Truque da Cavala — "quiz-sf-v3" (spec atualizada em
// 01/10/2026, v4 das 13:41). E o braco B do teste A/B contra a cara nova
// v2 (quiz-sf-data.js, que segue intacta em /). Mesmo motor (quiz-sf.js); o
// que muda e so o dado.
//
// O QUE MUDA em relacao a v2 (22/23 telas -> 19 telas):
//   - tela 1 e a pergunta visual do formato (sai a pergunta de genero e os
//     comentarios, que migram pra oferta);
//   - a tela 2 (satisfacao) sai; a spec trocava por "ha quanto tempo te
//     incomoda", mas o dono pediu pra remover essa etapa (01/10) — 19 telas;
//   - telas 4, 5 e 16 com perguntas/opcoes novas (roupa, tentou, horario);
//     saem "se existisse um metodo" e "o quanto esta pronta";
//   - telas 11, 12, 13 e 17 montadas pelas respostas (curiosidade por tipo e
//     faixa, dois carregamentos, pre-diagnostico); tela 19 com titulo novo;
//   - `duracao` derivada de minutos: menos de 20 min vira treino de 15 min;
//   - Pagina do Tipo com B2 abrindo por roupa, B3 por
//     tentou, B4 por flag, clipe do exercicio no C e a ponte com duracao e
//     horario;
//   - oferta: headline, linha do horario, beneficios por tipo, depoimento do
//     tipo primeiro, bloco "Como funciona", 4 bonus novos com selo por
//     variavel, linha das receitas, Garantia do Toque, comentarios abaixo da
//     garantia, rodape, timer persistido; a linha de soma so entra quando os
//     valores dos bonus forem definidos;
//   - design: um so componente de opcao (sem skins, sem emoji, sem a nota),
//     selecao restaurada ao voltar, barra proporcional as 20 telas, vermelho
//     so no botao, na barra e em um destaque por headline.
//
// Todo texto e configuracao: nada fixo no motor. Os codigos (value) sao os
// que o painel ja usa; o texto exibido de cada codigo esta em `textos` e as
// variaveis derivadas em `derivadas`.
//
// Medidor: sem meterGain nos passos — a barra e proporcional a posicao real
// entre as 19 telas (meterAuto), partindo de 5 e fechando 100 na oferta.

window.QUIZ_DATA = {
  meterInitial: 5,
  meterMax: 100,
  meterLabel: '',
  meterAuto: true,
  sounds: false,
  toasts: false,
  optionStyle: 'radio',
  // v3: sai "(Seleciona uma das opcoes abaixo)".
  optionsNote: '',
  // v3: ao voltar, a resposta de antes aparece marcada e pode ser trocada.
  restaurarSelecao: true,
  // R$ 27 proprio da B (o "voltar" dele na Payt ja aponta pra
  // desinflameja.site/oferta-especial-sf?bkr=payt#back). funnelTag e o
  // funnel= do checkout: e por ele que a venda chega etiquetada como B.
  checkoutUrl: 'https://checkout.payt.com.br/4a4bea40dea96c1b7ffe1aee1168d8ca?payment=pix',
  funnelTag: 'quiz-sf-b',
  sendSid: true,
  // Saida propria (R$ 13,50 6131b05a); o funnel= diz pra LP de que braco veio.
  backredirectUrl: '/oferta-especial-sf?funnel=quiz-sf-b',

  gateTeamName: 'Brenda',
  gateTeamAvatar: 'https://desinflameja.site/images/brenda-avatar.webp',

  // Rodape legal (v3: entra no fim da oferta).
  gateFooter: {
    links: [
      { label: 'Política de Privacidade', href: '/politicas-de-privacidade' },
      { label: 'Termos de Uso', href: '/termos-de-uso' },
      { label: 'Contato', href: '/contato' },
      { label: 'Aviso legal', href: '/aviso-legal' },
    ],
    note: 'Os treinos e protocolos mencionados nesta página têm caráter educativo e de condicionamento físico geral. ' +
      'Eles não constituem consulta, diagnóstico, prescrição ou tratamento médico e não substituem avaliação e liberação ' +
      'por profissional de saúde. Consulte um médico antes de iniciar, especialmente se estiver gestante, tiver alguma ' +
      'condição de saúde pré-existente ou fizer uso de medicamentos.',
    // Sem o CNPJ (pedido do dono, 01/10/2026): ele fica so na tela 1 do /ga.
    // 13/10/2026: a empresa e o MEI 60.094.956 MATEUS DAVI MELO PEREIRA DA
    // COSTA (o nome empresarial e o do MEI); Seja Fit fica so como marca.
    company: 'Seja Fit · 60.094.956 MATEUS DAVI MELO PEREIRA DA COSTA · contato@sejafit.site · (11) 92681-0324',
  },

  // ==========================================================================
  // PERSONALIZACAO (v3). O motor deriva:
  //   {nome} {nome_prep} {apelido} {linha_apelido}   <- tipos[tipo]
  //   {obstaculo_texto}                               <- obstaculos[obstaculo]
  //   {minutos_txt} {frequencia_txt} {objetivo_txt}   <- textos[...]
  //   e as de `derivadas` abaixo (duracao, idade_txt, faixa, horario_txt,
  //   apelido_cap, frase_* e os blocos da tela 11).
  // ==========================================================================
  varDefaults: { nome_prep: '', nome: 'seu tipo', apelido: '', linha_apelido: '', obstaculo_texto: 'o seu maior obstáculo', horario_txt: 'no horário que você escolheu', duracao: '20 a 30 minutos' },

  tipos: {
    reto: {
      nome: 'Síndrome do Glúteo Adormecido',
      apelido: 'reto',
      linha_apelido: 'O famoso bumbum reto.',
      nome_prep: 'pra Síndrome do Glúteo Adormecido',
      botao: 'ACESSAR MEU PLANO PARA GLÚTEO ADORMECIDO',
      b1: 'De lado, quase nenhuma curva. O cós da calça sobra atrás, e a roupa veste diferente na frente e atrás: marca a cintura e some no bumbum.',
      b3: '{frase_tentou} O glúteo adormecido não responde ao esforço comum porque o corpo pula ele: coxa e lombar fazem o movimento no lugar dele. Quando você se esforça, ele não participa. É por isso que ele aparece rápido quando o estímulo é o certo.',
      c: 'Acordar o músculo antes de carregar. Primeiro uma ativação curta, depois exercícios que recrutam o glúteo máximo e o médio ao mesmo tempo: ponte de glúteos, pulsos de ponte, ponte marchando, chutes de glúteo e avanço reverso. Todos cabem na sala de casa, sem nenhum equipamento. O que separa estímulo de desperdício é a ordem e a dose, e isso está no plano.',
      d: 'Fazer mais agachamento. Agachamento é exercício de coxa. Pra glúteo adormecido, ele atrapalha mais do que ajuda.',
      // Clipe em loop, mudo, abaixo do texto do C (bloco 'O que funciona pro
      // seu tipo'). Por enquanto a elevacao pelvica nos tres tipos (pedido do
      // dono, 01/10/2026); um clipe por tipo e so trocar o src/poster aqui.
      // Os outros exercicios que o dono mandou ja estao convertidos em
      // /videos/<nome>-loop.mp4 + .jpg (elevacao de calcanhares, avancos
      // laterais, arco-iris de gluteo, avanco reverso, circulos com a perna
      // na ponte); falta o dono dizer qual vai em qual tipo. A legenda e
      // neutra de proposito: serve pra qualquer tipo e nao diz 'exercicio 1'.
      clipe: { src: 'https://desinflameja.site/videos/elevacao-pelvica-loop.mp4', poster: 'https://desinflameja.site/videos/elevacao-pelvica-loop.jpg', legenda: 'Um dos exercícios do seu plano, na sala de casa.' },
      // B4 (prova do tipo): preencher src/caption quando o par existir.
      prova: { src: '', caption: '', rotulos: true },
    },
    quadrado: {
      nome: 'Perfil Gota Invertida',
      apelido: 'quadrado',
      linha_apelido: 'O famoso bumbum quadrado.',
      nome_prep: 'pro Perfil Gota Invertida',
      botao: 'ACESSAR MEU PLANO PARA GOTA INVERTIDA',
      b1: 'De costas, ele é mais largo em cima, no osso do quadril, e vazio embaixo. Tem aquela quebra na lateral que a calça marca em vez de arredondar. Tem volume, mas não tem formato.',
      b3: '{frase_tentou} A Gota Invertida não é falta de glúteo, é glúteo médio e mínimo apagados. São eles que preenchem a lateral e fazem o arredondado. Como quase ninguém treina esses dois (agachamento e elevação pélvica mal encostam neles), a lateral continua vazia por mais que você se esforce.',
      c: 'Trabalho lateral e de abdução, que é o que preenche a quebra, mais a porção inferior do glúteo máximo, que dá a curva de baixo: abdução de quadril em agachamento, avanços laterais, arco-íris, avanço curtsy e agachamento plié. Nenhum precisa de academia nem de equipamento. A ordem e a dose, que é o que faz a lateral responder, estão no plano.',
      d: 'Treinar só pra "bumbum grande". Volume sem lateral deixa o formato ainda mais quadrado. Aqui, a lateral vem antes do volume.',
      // Clipe: ver o comentario do reto.
      clipe: { src: 'https://desinflameja.site/videos/avancos-laterais-loop.mp4', poster: 'https://desinflameja.site/videos/avancos-laterais-loop.jpg', legenda: 'Um dos exercícios do seu plano, na sala de casa.' },
      prova: { src: '', caption: '', rotulos: true },
    },
    caido: {
      nome: 'Perfil Baixa Sustentação',
      apelido: 'caído',
      linha_apelido: 'O famoso bumbum caído.',
      nome_prep: 'pro Perfil Baixa Sustentação',
      botao: 'ACESSAR MEU PLANO PARA BAIXA SUSTENTAÇÃO',
      b1: 'Tem volume, mas ele não fica no lugar: dobra embaixo, balança quando você anda, o short corta na dobra e a celulite aparece mais na luz de cima.',
      b3: '{frase_tentou} A Baixa Sustentação não é falta de bumbum, é falta de tensão. Músculo sem tônus não segura o próprio volume, e a gravidade ganha. A parte boa: firmeza responde mais rápido do que volume, porque a base já existe.',
      c: 'Tensão contínua e descida lenta, que é o que cria densidade, mais frequência alta: pulsos de ponte, plié com pulsos, agachamentos com descida lenta, avanço reverso e elevação de calcanhares, todos sem equipamento. E o antirretenção, porque inchaço faz a celulite parecer o dobro do que é. A ordem e a dose estão no plano.',
      d: 'Treinar pra "crescer". Volume em cima de um músculo sem tônus desce junto. Primeiro firma, depois cresce.',
      // Clipe: ver o comentario do reto.
      clipe: { src: 'https://desinflameja.site/videos/avanco-reverso-loop.mp4', poster: 'https://desinflameja.site/videos/avanco-reverso-loop.jpg', legenda: 'Um dos exercícios do seu plano, na sala de casa.' },
      prova: { src: '', caption: '', rotulos: true },
    },
  },

  obstaculos: {
    motivacao: { texto: 'falta de motivação', titulo: 'A sua saída pra falta de motivação', paragrafo: 'Motivação não se encontra, se fabrica. O plano é feito pra você sentir o glúteo mais firme ao toque na primeira semana, e cada dia já vem com o treino pronto e marcado no app: você só precisa aparecer, e o resultado da primeira semana faz o resto.' },
    comecar: { texto: 'não saber por onde começar', titulo: 'A sua saída pra quem não sabe por onde começar', paragrafo: 'Você não decide nada: dia 1, exercício 1, vídeo mostrando. Só apertar o play.' },
    tempo: { texto: 'rotina corrida', titulo: 'A sua saída pra rotina corrida', paragrafo: 'Treinos de {duracao}, sem deslocamento, sem roupa de academia, sem equipamento. Cabe antes do banho.' },
    compulsao: { texto: 'ansiedade e compulsão alimentar', titulo: 'A sua saída pra ansiedade e compulsão alimentar', paragrafo: 'O plano não é dieta restritiva, e restrição é o que alimenta a compulsão. As 51 receitas proteicas mostram o que comer, não o que cortar.' },
    autoestima: { texto: 'baixa autoestima', titulo: 'A sua saída pra baixa autoestima', paragrafo: 'A primeira vitória é física e vem rápido. Autoestima é o que acontece quando você vê o corpo responder.' },
  },

  // Texto exibido dos codigos (fixos do motor).
  textos: {
    minutos: { menos_20: 'menos de 20 minutos', '20_30': '20 a 30 minutos', mais_30: 'mais de 30 minutos' },
    frequencia: { '3x': '3 vezes por semana', '4_5x': '4 a 5 vezes por semana', todos: 'todos os dias' },
    objetivo: { levantado: 'levantado', esculpido: 'esculpido', musculoso: 'musculoso', redondinho: 'redondinho' },
  },

  // Derivadas genericas: { chave: { de: <resposta ou derivada>, textos: { codigo: texto }, padrao, html } }.
  // A ordem importa: faixa vem de idade, e a linha da faixa (tela 11) vem de faixa.
  // Quando entra o primeiro treino (dono, 01/10/2026): antes das 18h no
  // relogio do aparelho dela, ainda hoje; depois, amanha. Vira {dia_inicio}.
  diaInicio: { corteHora: 18, antes: 'hoje', depois: 'amanhã' },

  derivadas: {
    // Regra da duracao: menos de 20 min vira treino de 15 min (existe no
    // produto); nos outros casos, 20 a 30 minutos.
    duracao: { de: 'tempo_dia', textos: { menos_20: '15 minutos', '20_30': '20 a 30 minutos', mais_30: '20 a 30 minutos' }, padrao: '20 a 30 minutos' },
    idade_txt: { de: 'idade', textos: { '18_24': '18 a 24 anos', '25_34': '25 a 34 anos', '35_44': '35 a 44 anos', '45_mais': '45 anos ou mais' } },
    faixa: { de: 'idade', textos: { '18_24': 'sub25', '25_34': '25_34', '35_44': '35mais', '45_mais': '35mais' } },
    horario_txt: { de: 'horario', textos: { manha: 'de manhã', almoco: 'na hora do almoço', noite: 'à noite' } },
    refeicoes_texto: { de: 'refeicoes', textos: { '1_2': '1 a 2 refeições por dia', '3': '3 refeições por dia', '4_5': '4 a 5 refeições por dia', sem_hora: 'várias refeições sem hora certa' } },
    // Apelido com inicial maiuscula (headline da tela 11).
    apelido_cap: { de: 'tipo', textos: { reto: 'Reto', quadrado: 'Quadrado', caido: 'Caído' } },
    // O que mais incomoda (a "dor" da tela 2) entra na ponte da analise:
    // e o foco que o plano assume pra ela (pedido do dono: a dor muda a
    // analise final).
    frase_incomodo: { de: 'incomodo', textos: {
      sem_volume: 'Como o que mais te incomoda é a falta de volume, os primeiros treinos acordam o glúteo pra ele voltar a responder e ganhar forma.',
      sem_firmeza: 'Como o que mais te incomoda é a falta de firmeza, o plano prioriza tensão contínua e descida lenta, que é o que deixa o glúteo firme.',
      so_melhorar: 'Como você já gosta do que vê e só quer melhorar, o plano vai direto pro ajuste fino do formato.',
    } },
    // Tela "ha quanto tempo te incomoda" REMOVIDA a pedido do dono em
    // 01/10/2026; os textos ficam aqui caso ela volte (hoje nada alimenta).
    frase_tempo: { de: 'tempo_incomodo', textos: {
      menos_1: 'Isso começou a te incomodar há menos de um ano, e é a melhor hora pra agir: quanto antes o estímulo certo entra, mais rápido o músculo responde.',
      '1_3': 'Faz entre um e três anos que isso te incomoda, e nesse tempo foi a roupa que se ajustou ao bumbum, não o contrário.',
      mais_3: 'Faz mais de três anos que isso te incomoda. Em três anos, qualquer músculo que recebesse o estímulo certo teria mudado; o seu não recebeu.',
      sempre: 'Isso te acompanha desde que você se lembra, e a essa altura parece parte de quem você é. Não é: é um músculo que nunca recebeu o estímulo certo.',
    } },
    frase_roupa: { de: 'roupa', textos: {
      short: 'Você provavelmente já deixou o short jeans guardado pra "quando eu melhorar".',
      vestido: 'Você provavelmente já deixou o vestido justo guardado pra "quando eu melhorar".',
      biquini: 'Você provavelmente já deixou o biquíni guardado pra "quando eu melhorar".',
      nenhuma: '',
    } },
    frase_tentou: { de: 'tentou', textos: {
      internet: 'Você já tentou agachamento e treinos da internet, e o bumbum foi a última coisa a mudar.',
      academia: 'Você já tentou academia, e o bumbum foi a última coisa a mudar.',
      dieta: 'Você já tentou dieta, e o bumbum foi o lugar que menos respondeu.',
      nada: 'Você nunca começou de verdade, e essa é a melhor notícia: músculo que nunca recebeu o estímulo certo é o que responde mais rápido.',
    } },
    // Tela 13 (pre-diagnostico): pills, imagem do tipo e frase do tipo.
    apelido_pill: { de: 'tipo', textos: { reto: 'Bumbum reto', quadrado: 'Bumbum quadrado', caido: 'Bumbum caído' } },
    tentou_pill: { de: 'tentou', textos: { internet: 'Já tentou treinos da internet', academia: 'Já tentou academia', dieta: 'Já tentou dieta', nada: 'Começando agora' } },
    // Silhueta da tela 1 ampliada com a zona do ponto de travamento marcada.
    // Placeholders em SVG ate os PNGs do designer (DIAG_RETO/QUADRADO/CAIDO,
    // 800x800, fundo transparente): e so trocar o caminho aqui.
    diag_img: { de: 'tipo', textos: { reto: 'https://desinflameja.site/images/diag-reto.svg', quadrado: 'https://desinflameja.site/images/diag-quadrado.svg', caido: 'https://desinflameja.site/images/diag-caido.svg' } },
    frase_tipo_13: { de: 'tipo', html: true, textos: {
      reto: 'Quem tem esse perfil trava no mesmo ponto: <b>o treino chega na coxa e não chega no glúteo.</b>',
      quadrado: 'Quem tem esse perfil trava no mesmo ponto: <b>o treino enche o centro e esquece a lateral.</b>',
      caido: 'Quem tem esse perfil trava no mesmo ponto: <b>o treino busca volume num músculo que ainda não tem tensão.</b>',
    } },
    // Tela 11 (Curiosidade): blocos curtos, a primeira linha de cada bloco em
    // negrito, nenhuma linha com mais de 14 palavras. html: true = entra
    // como HTML no card.
    bloco_tipo_11: { de: 'tipo', html: true, textos: {
      reto: '<p><b>A maioria dos exercícios "de bumbum" nem acorda o glúteo de quem tem o formato reto.</b></p>' +
        '<p>Coxa e lombar assumem o movimento. O glúteo fica de fora.</p>',
      quadrado: '<p><b>O formato quadrado não é falta de glúteo.</b></p>' +
        '<p>É falta de dois músculos que quase ninguém treina: o médio e o mínimo.</p>' +
        '<p>São eles que preenchem a lateral.</p>',
      caido: '<p><b>Quem tem o formato caído tem a base. O que falta é tensão.</b></p>' +
        '<p>Firmeza responde mais rápido do que volume quando a base já existe.</p>',
    } },
    bloco_fixo_11: { de: '_sempre', html: true, textos: {}, padrao:
      '<p><b>Existe um protocolo que força o glúteo a voltar ao estado de resposta máxima.</b></p>' +
      '<p>Sem academia. Sem carga pesada.</p>' +
      '<p>Eu chamo de Truque da Cavala.</p>' },
    linha_faixa_11: { de: 'faixa', textos: {
      sub25: 'Antes dos 25, ele responde mais rápido do que em qualquer outra fase. Mas só se for ativado do jeito certo.',
      '25_34': 'Dos 25 aos 34 é a última fase em que ele responde rápido sem esforço extra. Depois disso, o protocolo muda.',
      '35mais': 'Depois dos 35, ele perde resposta mais rápido se não for ativado do jeito certo. Por isso o protocolo muda com a idade.',
    } },
  },

  // Pagina do Tipo (tela 18).
  paginaTipo: {
    rotulo: 'Resultado da sua Análise',
    mostrar_tipo_comum: false,
    linha_tipo_comum: 'Esse é o tipo mais comum entre as alunas da Brenda.',
    // B4 so aparece com a flag ligada E o par do tipo preenchido em tipos[*].prova.
    mostrar_prova_tipo: false,
    titulos: {
      b1: 'O que você vê no espelho',
      b2: 'O que você provavelmente já viveu',
      b3: 'Por que nada funcionou até agora',
      b4: 'Prova do tipo',
      c: 'O que funciona pro seu tipo',
      d: 'O erro mais comum do seu tipo',
    },
    // {frase_roupa} vazia quando roupa = nenhuma: o bloco comeca em "Ja se comparou".
    b2: '{frase_roupa} Já se comparou com outra mulher e pensou que no seu caso é genética. Não é genética, e não é falta de força de vontade.',
    // Pendente (spec): confirmar se o cronograma de 21 dias aceita 3x por
    // semana antes de manter {frequencia_txt}; se o desafio for diario,
    // trocar por "todos os dias" pra todas.
    ponte: 'O seu plano de 21 dias pro seu tipo, <b>{nome}</b>, já está montado: treinos de <b>{duracao}</b>, <b>{frequencia_txt}</b>, <b>{horario_txt}</b>, com objetivo <b>{objetivo_txt}</b> e a saída pro seu maior obstáculo, <b>{obstaculo_texto}</b>, já incluída. {frase_incomodo} {frase_idade}',
    frase_idade: 'Mulheres de {idade_txt} com esse perfil costumam sentir o glúteo mais firme ao toque dentro da primeira semana.',
    frase_sem_idade: 'Mulheres com esse perfil costumam sentir o glúteo mais firme ao toque dentro da primeira semana.',
    grafico_titulo: 'Projeção da sua evolução nos 21 dias do desafio',
  },

  // Recuperacao de abandono (WhatsApp/e-mail), com as mesmas variaveis.
  recuperacao: 'Seu plano {nome_prep} ainda está reservado. O primeiro treino cabe {horario_txt}, em {duracao}, e a saída pro seu maior obstáculo, {obstaculo_texto}, já está dentro. {link}',

  steps: [
    // 1 — FORMATO DO BUMBUM (no lugar da pergunta de genero). A tela mais
    // leve do quiz: selo, headline, as tres silhuetas e nada embaixo.
    {
      type: 'question',
      stepName: 'formato',
      eventoAoResponder: 'tipo_definido',
      eyebrow: 'TESTE DE 1 MINUTO',
      title: 'Qual desses é o seu bumbum hoje?',
      body: 'Olhe de lado e de costas no espelho e escolha o mais próximo. Você vai descobrir o que o seu tipo precisa pra empinar em 21 dias, sem academia.' +
        '<div><span class="selo-mini">Exclusivo para mulheres</span></div>',
      options: [
        { image: 'https://desinflameja.site/images/formato-reto.svg', label: 'Reto', sub: 'Quase sem curva de lado, "chapado"', value: 'reto' },
        { image: 'https://desinflameja.site/images/formato-quadrado.svg', label: 'Quadrado', sub: 'Mais largo em cima, com uma quebra na lateral do quadril', value: 'quadrado' },
        { image: 'https://desinflameja.site/images/formato-caido.svg', label: 'Caído', sub: 'Tem volume, mas sem sustentação, com dobra embaixo', value: 'caido' },
      ],
      variableToSave: 'tipo',
    },

    // 3 — INCOMODO
    {
      type: 'question',
      stepName: 'incomodo',
      title: 'O que mais te incomoda ao olhar no espelho?',
      options: [
        { label: 'Bumbum pequeno ou sem volume', value: 'sem_volume' },
        { label: 'Falta de firmeza ou definição', value: 'sem_firmeza' },
        { label: 'Está tudo bem, só quero melhorar', value: 'so_melhorar' },
      ],
      variableToSave: 'incomodo',
    },

    // 4 — ROUPA QUE FICOU GUARDADA (opcoes viram as pecas)
    {
      type: 'question',
      stepName: 'roupa',
      title: 'Você já desistiu de usar uma roupa por não se sentir confiante?',
      body: 'Vestido justo, short jeans, biquíni.',
      options: [
        { label: 'O short jeans', value: 'short' },
        { label: 'O vestido justo', value: 'vestido' },
        { label: 'O biquíni', value: 'biquini' },
        { label: 'Nenhuma, isso não me incomoda', value: 'nenhuma' },
      ],
      variableToSave: 'roupa',
    },

    // 5 — O QUE JA TENTOU (nova)
    {
      type: 'question',
      stepName: 'tentou',
      title: 'O que você já tentou pra mudar o bumbum?',
      body: 'Vale qualquer coisa, até o que durou uma semana.',
      options: [
        { label: 'Agachamento e treinos da internet', value: 'internet' },
        { label: 'Academia', value: 'academia' },
        { label: 'Dieta ou emagrecer', value: 'dieta' },
        { label: 'Nada ainda, essa é a primeira vez', value: 'nada' },
      ],
      variableToSave: 'tentou',
    },

    // 6 — PROVA SOCIAL: 4 pares curados, um por linha, rotulo DIA 1 / DIA 21.
    // Curadoria de 01/10: sai o par com texto de meme; o par com o "+8 cm"
    // fica por enquanto (spec). Nome e faixa etaria de cada aluna entram na
    // legenda quando o conteudo passar (campo caption).
    {
      type: 'message',
      stepName: 'prova_social',
      title: 'Veja o resultado de quem seguiu esses exercícios em casa',
      pares: [
        { src: 'https://desinflameja.site/images/antes-depois-set-3.webp', rotulos: true, caption: 'Aluna do desafio · em casa' },
        { src: 'https://desinflameja.site/images/antes-depois-5-web.webp', rotulos: true, caption: 'Aluna do desafio · em casa' },
        { src: 'https://desinflameja.site/images/prova-9.webp', rotulos: true, caption: 'Aluna do desafio · em casa' },
        { src: 'https://desinflameja.site/images/antes-e-depois-presell-2.jpeg', rotulos: true, caption: 'Aluna do desafio · em casa' },
      ],
      cta: 'Estou pronta!',
    },

    // 7 — TEMPO POR DIA (menos de 20 min vira treino de 15 min via duracao)
    {
      type: 'question',
      stepName: 'tempo_dia',
      title: 'Quantos minutos por dia você consegue dedicar ao treino?',
      options: [
        { label: 'Menos de 20 minutos', value: 'menos_20' },
        { label: 'Entre 20 e 30 minutos', value: '20_30' },
        { label: 'Mais de 30 minutos', value: 'mais_30' },
      ],
      variableToSave: 'tempo_dia',
    },

    // 8 — FREQUENCIA
    {
      type: 'question',
      stepName: 'frequencia',
      title: 'Com que frequência você conseguiria treinar por semana?',
      options: [
        { label: '3 vezes por semana', value: '3x' },
        { label: '4 a 5 vezes por semana', value: '4_5x' },
        { label: 'Todos os dias', value: 'todos' },
      ],
      variableToSave: 'frequencia',
    },

    // 9 — REFEICOES (agora usada na oferta)
    {
      type: 'question',
      stepName: 'refeicoes',
      title: 'Quantas refeições você faz por dia normalmente?',
      // "15 anos", como no quiz preto (a referencia trocou por "mais de 8
      // anos"; o dono manteve os 15 nos dois quizzes, 01/10/2026).
      body: 'Isso muda o seu metabolismo. Em <b>15 anos dando aula</b>, a Brenda viu que é aqui que a maioria trava — e nem desconfia.',
      options: [
        { label: '1 a 2 refeições', value: '1_2' },
        { label: '3 refeições por dia', value: '3' },
        { label: '4 a 5 refeições', value: '4_5' },
        { label: 'Como várias vezes, sem hora certa', value: 'sem_hora' },
      ],
      variableToSave: 'refeicoes',
    },

    // 10 — IDADE (value por codigo; o texto sai de derivadas.idade_txt)
    {
      type: 'question',
      stepName: 'idade',
      title: 'Qual é a sua idade?',
      body: 'O protocolo muda conforme a faixa etária — é isso que faz o plano ser seu, e não um treino genérico.',
      options: [
        { label: '18 a 24 anos', value: '18_24' },
        { label: '25 a 34 anos', value: '25_34' },
        { label: '35 a 44 anos', value: '35_44' },
        { label: '45 anos ou mais', value: '45_mais' },
      ],
      variableToSave: 'idade',
    },

    // 11 — CURIOSIDADE (por tipo e faixa; card sem titulo, avatar e nome da
    // Brenda pequenos como assinatura; texto em blocos curtos; a linha da
    // faixa em fonte menor; sai o card de noticia e a frase do metabolismo)
    {
      type: 'question',
      stepName: 'mecanismo',
      title: 'Curiosidade sobre o Bumbum {apelido_cap}',
      body: '<div class="nota-brenda nota-assinada">' +
        '<div class="nota-assinatura"><img src="https://desinflameja.site/images/brenda-avatar.webp" alt="Brenda" /><span>Brenda · Seja Fit</span></div>' +
        '<div class="nota-blocos">{bloco_tipo_11}{bloco_fixo_11}<p class="nota-faixa">{linha_faixa_11}</p></div>' +
        '</div>',
      options: [
        { label: 'Já conhecia essa informação', value: 'conhecia' },
        { label: 'É a primeira vez que ouço isso', value: 'primeira_vez' },
      ],
      variableToSave: 'mecanismo',
    },

    // 12 — PROCESSANDO 1 (mensagens com tipo e idade; sem grid de fotos)
    {
      type: 'processing',
      stepName: 'processando_1',
      durationMs: 6000,
      title: 'Processando as suas respostas...',
      body: 'Estamos montando o seu plano personalizado.',
      messages: [
        'Lendo o que você respondeu...',
        'Separando o que funciona pro bumbum {apelido}...',
        'Comparando com alunas de {idade_txt}...',
        'Definindo o seu ponto de partida...',
      ],
    },

    // 13 — PRE-DIAGNOSTICO (v4): tres pills, a silhueta do tipo com a zona
    // marcada e a frase do tipo com o fechamento fixo. Saem as barras.
    {
      type: 'message',
      stepName: 'pre_diagnostico',
      title: 'Achei o padrão nas suas respostas.',
      body: '<div class="pills"><span class="pill">{apelido_pill}</span><span class="pill">{idade_txt}</span><span class="pill">{tentou_pill}</span></div>' +
        '<img class="diag-img" src="{diag_img}" alt="Silhueta do seu tipo com o ponto de travamento marcado" />' +
        '<p class="diag-frase">{frase_tipo_13}</p>' +
        '<p class="diag-fecho">Isso tem nome. E tem um protocolo específico. Faltam 3 perguntas pra eu confirmar o seu tipo e fechar o seu plano.</p>',
      cta: 'CONFIRMAR O MEU TIPO',
    },

    // 14 — BUMBUM DOS SONHOS
    {
      type: 'question',
      stepName: 'bumbum_sonhos',
      title: 'Qual é o seu <b>bumbum dos sonhos?</b>',
      body: '<div class="step-sub">Escolhe o seu objetivo: é ele que define a intensidade do seu plano.</div>',
      options: [
        { label: 'Levantado', sub: 'Pra chamar atenção à distância', value: 'levantado' },
        { label: 'Esculpido', sub: 'Com curvas marcadas', value: 'esculpido' },
        { label: 'Musculoso', sub: 'Definido e forte', value: 'musculoso' },
        { label: 'Redondinho', sub: 'Com volume e forma', value: 'redondinho' },
      ],
      variableToSave: 'bumbum_sonhos',
    },

    // 15 — OBSTACULO
    {
      type: 'question',
      stepName: 'obstaculo',
      title: 'Qual é o seu maior obstáculo hoje?',
      body: 'A Brenda montou uma saída específica pra cada um deles.',
      options: [
        { label: 'Falta de motivação constante', value: 'motivacao' },
        { label: 'Ansiedade e compulsão alimentar', value: 'compulsao' },
        { label: 'Rotina corrida, sem tempo', value: 'tempo' },
        { label: 'Não sei por onde começar', value: 'comecar' },
        { label: 'Baixa autoestima me sabota', value: 'autoestima' },
      ],
      variableToSave: 'obstaculo',
    },

    // 16 — HORARIO DO TREINO (nova, no lugar do compromisso)
    {
      type: 'question',
      stepName: 'horario',
      title: 'Que horas o seu treino vai entrar?',
      body: 'Quem define a hora antes de começar é quem chega no dia 21.',
      options: [
        { label: 'De manhã, antes de tudo', value: 'manha' },
        { label: 'Na hora do almoço', value: 'almoco' },
        { label: 'À noite, depois do dia', value: 'noite' },
      ],
      variableToSave: 'horario',
    },

    // 17 — PROCESSANDO 2 (mensagens com minutos, duracao, horario e obstaculo)
    {
      type: 'processing',
      stepName: 'processando_2',
      durationMs: 5000,
      title: 'Analisando as suas respostas...',
      body: 'Falta pouco pro seu plano ficar pronto.',
      messages: [
        'Ajustando o volume de treino pro seu tempo: {minutos_txt}...',
        'Encaixando {duracao} {horario_txt} na sua rotina...',
        'Montando a saída pra {obstaculo_texto}...',
        'Fechando o seu cronograma de 21 dias...',
      ],
      images: ['https://desinflameja.site/images/prova-7.webp', 'https://desinflameja.site/images/prova-8.webp', 'https://desinflameja.site/images/antes-depois-3-web.webp', 'https://desinflameja.site/images/antes-depois-4-web.webp'],
    },

    // 18 — PAGINA DO TIPO
    {
      type: 'tipo',
      stepName: 'pagina_tipo',
      eyebrow: 'Resultado da sua Análise',
      title: '{nome}',
      body: '<div class="tipo-apelido">{linha_apelido}</div>',
      // Pagina que precisa ser lida inteira (pedido do dono): 1,5 s depois
      // de abrir, se ela nao rolou nem tocou, a tela desce 120 px bem de leve
      // pra mostrar que tem mais embaixo. Ver dicaDeRolagem no motor.
      scrollDica: { aposMs: 1500, px: 120 },
      chart: {
        points: [
          { x: 'DIA 1', y: 5, label: 'Ponto de partida' },
          { x: 'DIA 3', y: 18, label: 'Primeira evolução' },
          { x: 'DIA 8', y: 42, label: 'Adaptação' },
          { x: 'DIA 14', y: 68, label: 'Aceleração' },
          { x: 'DIA 21', y: 96, label: 'Resultado' },
        ],
      },
      cta: 'ACESSAR MEU PLANO PERSONALIZADO!',
    },

    // 19 — QUEM MONTOU O SEU PLANO (arma o backredirect). Foto real da
    // Brenda (images/brenda-real.jpg, mandada pelo dono em 01/10/2026; desde
    // 08/10/2026 a foto nova brenda-real-2, pedido do dono).
    // 07/10/2026 (dono): "mais de 3 mil alunas" (eram 17 mil) e sem os "50
    // mil seguidores"; os 15 anos ficam.
    // 08/10/2026 (dono): cartao do Instagram @sejafitapp no fim da tela (o
    // mesmo do Tchauzinho, na pele da Cavala), pra responder o "e golpe?" sem
    // tirar a lead do quiz. A imagem (print do topo do perfil: "Mais de 3 mil
    // alunas", bate com o texto da Brenda) NAO e link; so o link discreto
    // embaixo abre o perfil em OUTRA aba (target=_blank: o quiz fica onde
    // estava, sem popstate, entao o backredirect que esta tela arma nao
    // dispara) e grava o evento 'instagram_click'. No Meta o cartao vai pros
    // dois lados do teste v3 x v4 (o b4-data nao mexe nesta tela). No /ga ele
    // esta em teste (QUIZ_GA_IG_AB): o quiz-sf-ga-b.html tira o cartao do
    // controle cortando o body no '<div class="qb-insta"' — o cartao precisa
    // continuar sendo a ULTIMA coisa do body.
    {
      type: 'message',
      stepName: 'plano_gerado',
      armBackredirect: true,
      title: 'Quem montou o seu plano',
      body: '<img src="https://desinflameja.site/images/brenda-real-2.webp" alt="Brenda, educadora física" width="720" height="900" style="width:100%;height:auto;margin:10px 0" />' +
        '<b>Brenda, fundadora do Seja Fit App</b>, educadora física há <b>mais de 15 anos</b>, com ' +
        '<b>mais de 3 mil alunas</b> no Brasil e no mundo.\n\n' +
        'Referência em <b>treino feminino focado em glúteo</b>, especializada em ativação, firmeza e projeção do bumbum <b>sem academia</b>.' +
        '<div class="qb-insta" style="margin-top:20px">' +
          '<div style="font-size:15px;font-weight:700;line-height:1.4;color:var(--bone);margin-bottom:10px">Confira o nosso Instagram: alunas, depoimentos e o dia a dia do app 👇</div>' +
          '<img src="https://desinflameja.site/images/instagram-sejafitapp.webp" width="720" height="710" alt="Perfil @sejafitapp no Instagram: Seja Fit, treino em casa, mais de 3 mil alunas no Brasil" loading="lazy" style="width:100%;height:auto;border:1px solid var(--line);border-radius:var(--radius)" />' +
          // 09/10/2026 (dono): dentro do app do Instagram o link sai (abriria o
          // perfil na mesma tela e a lead perderia o quiz); o print continua.
          ((typeof navigator !== 'undefined' && /Instagram/i.test(navigator.userAgent || '')) ? '' : '<a href="https://www.instagram.com/sejafitapp/" target="_blank" rel="noopener" onclick="if(!window.QUIZ_PREVIEW&&window.trackEvent)window.trackEvent(\'instagram_click\',{step:\'plano_gerado\'})" style="display:inline-block;margin-top:8px;padding:6px 0;font-size:14px;color:var(--steel);text-decoration:underline">Ver o @sejafitapp no Instagram ↗</a>') +
        '</div>',
      cta: 'VER O MEU PLANO',
    },

    // 20 — OFERTA
    {
      type: 'pitch',
      stepName: 'pitch',
      title: 'O seu plano {nome_prep} está pronto. Olha o que você leva 👇',
      pitch: {
        subline: 'Seu primeiro treino de {duracao} entra {dia_inicio}, e os próximos {horario_txt}.',
        reframe: 'O <b>Desafio de 21 Dias</b> é o mesmo protocolo que a Brenda aplica com as alunas dela: ' +
          'treinos de <b>{duracao}</b>, na sala de casa, sem academia e sem equipamento caro.',

        // Os prints do grupo (pedido do dono, 01/10/2026). 09/10/2026 (dono):
        // os 9 prints novos da v4 (telefone/sobrenome tarjados) no lugar dos 4
        // antigos (3 deles sao as mesmas mensagens); mesma ordem da v4, sem a
        // troca do 1o pelo obstaculo, que fica so na v4. Titulo igual.
        printsTitle: 'O que as alunas estão mandando no grupo',
        // A linha de baixo liga a classe prints-v4 do motor (altura limitada e
        // centralizada), que os prints novos precisam: as alturas variam muito.
        printsSub: 'Prints reais. Telefones escondidos pra proteger as alunas.',
        prints: [
          { src: 'https://desinflameja.site/images/whats-cavala-01.webp', w: 720, h: 1145, alt: 'Print de aluna: já comprou vários treinos em casa e este é o melhor que está fazendo' },
          { src: 'https://desinflameja.site/images/whats-cavala-02.webp', w: 720, h: 459, alt: 'Print de aluna: pernas com músculos acentuados e o bumbum ficando redondinho' },
          { src: 'https://desinflameja.site/images/whats-cavala-03.webp', w: 720, h: 582, alt: 'Print de aluna: sem tempo pra academia, treina quando tem tempo e já sente diferença' },
          { src: 'https://desinflameja.site/images/whats-cavala-04.webp', w: 720, h: 860, alt: 'Print de aluna: pós-parto, treina antes do bebê acordar e tinha medo de não ter constância' },
          { src: 'https://desinflameja.site/images/whats-cavala-05.webp', w: 720, h: 388, alt: 'Print de aluna: treinos eficazes, fáceis de fazer e bem explicativos' },
          { src: 'https://desinflameja.site/images/whats-cavala-06.webp', w: 720, h: 560, alt: 'Print de aluna: no terceiro dia, muito mais disposição' },
          { src: 'https://desinflameja.site/images/whats-cavala-07.webp', w: 720, h: 634, alt: 'Print de aluna: fazia só musculação e, treinando em casa junto, notou mais desenvolvimento no glúteo' },
          { src: 'https://desinflameja.site/images/whats-cavala-08.webp', w: 720, h: 756, alt: 'Print de aluna: a vovó do grupo conta que o grupo está levantando o astral dela' },
          { src: 'https://desinflameja.site/images/whats-cavala-09.webp', w: 720, h: 487, alt: 'Print de aluna: sentindo as pernas melhorarem, estavam com muitas celulites' },
        ],

        testimonialsTitle: 'Alunas que fizeram o Truque da Cavala',
        testimonials: [
          { id: 'fernanda', name: 'Fernanda', image: 'https://desinflameja.site/images/depo-1.jpeg', text: 'Já tinha tentado academia e nada mudava. Com o Truque da Cavala meu bumbum ganhou volume e empinou de verdade — hoje o short veste do jeito que eu sempre quis.' },
          { id: 'isabella', name: 'Isabella', image: 'https://desinflameja.site/images/depoimento-2.jpg', text: 'Eu não tinha bumbum nenhum. Fiz o Truque da Cavala em casa e ganhei forma: ficou redondo, firme e no lugar. Foi a primeira coisa que funcionou pra mim.' },
        ],
        testimonialsPorTipo: {
          reto: ['fernanda', 'isabella'],
          quadrado: ['isabella', 'fernanda'],
          caido: ['fernanda', 'isabella'],
        },

        benefitsTitle: 'O que você conquista no desafio',
        benefitsPorTipo: {
          reto: [
            '<b>Volume e formato</b> — glúteo maior e mais redondo',
            '<b>Firmeza</b> — adeus flacidez e sustentação frouxa',
            '<b>Menos celulite</b> — pele mais lisa na região',
            '<b>Resultado rápido</b> — mudança visível dentro dos 21 dias',
            '<b>Treino prático</b> — treinos de {duracao}, em casa, com vídeo de cada exercício',
            '<b>Autoestima</b> — vestir o que quiser sem pensar duas vezes',
          ],
          quadrado: [
            '<b>Volume e formato</b> — formato, lateral preenchida e bumbum redondo',
            '<b>Firmeza</b> — adeus flacidez e sustentação frouxa',
            '<b>Menos celulite</b> — pele mais lisa na região',
            '<b>Resultado rápido</b> — mudança visível dentro dos 21 dias',
            '<b>Treino prático</b> — treinos de {duracao}, em casa, com vídeo de cada exercício',
            '<b>Autoestima</b> — vestir o que quiser sem pensar duas vezes',
          ],
          caido: [
            '<b>Firmeza</b> — adeus flacidez e sustentação frouxa',
            '<b>Menos celulite</b> — pele mais lisa na região',
            '<b>Volume e formato</b> — glúteo maior e mais redondo',
            '<b>Resultado rápido</b> — mudança visível dentro dos 21 dias',
            '<b>Treino prático</b> — treinos de {duracao}, em casa, com vídeo de cada exercício',
            '<b>Autoestima</b> — vestir o que quiser sem pensar duas vezes',
          ],
        },
        benefits: [
          '<b>Volume e formato</b> — glúteo maior e mais redondo',
          '<b>Firmeza</b> — adeus flacidez e sustentação frouxa',
          '<b>Menos celulite</b> — pele mais lisa na região',
          '<b>Resultado rápido</b> — mudança visível dentro dos 21 dias',
          '<b>Treino prático</b> — treinos de {duracao}, em casa, com vídeo de cada exercício',
          '<b>Autoestima</b> — vestir o que quiser sem pensar duas vezes',
        ],

        // "Como funciona" (entre os beneficios e os bonus).
        comoFunciona: {
          titulo: 'Como funciona',
          // O app Seja Fit por dentro (video do dono, 01/10/2026), em loop e
          // mudo, no lugar do video-aula e do print do app, que eram mockups.
          // som: false = sem o botao "Ativar som" (o arquivo nao tem audio).
          video: { src: 'https://desinflameja.site/videos/app-por-dentro-loop.mp4', poster: 'https://desinflameja.site/videos/app-por-dentro-loop.jpg', som: false, legenda: 'O app Seja Fit por dentro: cada exercício com vídeo e as repetições do dia.' },
          passos: [
            'Pagamento aprovado.',
            'Login no e-mail e no WhatsApp.',
            'Abre o app e confirma o seu tipo.',
            'Dia 1 {dia_inicio} mesmo, em {duracao}.',
          ],

          // "A sua primeira semana" MONTADA PELAS RESPOSTAS (pedido do dono,
          // 01/10/2026). O motor (semanaDaLead) so organiza; TODO texto e
          // numero esta aqui e e EDITAVEL — e precisa do ok da Brenda antes
          // de ir pro ar (nomes dos treinos, minutos, notas). Nada de conselho
          // medico nem promessa nova: so a ordem dos treinos que o bloco C de
          // cada tipo ja promete.
          semana1: {
            // Com horario respondido; sem ele, o titulo de baixo.
            titulo: 'A sua primeira semana, {horario_txt}',
            tituloSemHorario: 'A sua primeira semana',
            // Dias 1 a 7 pela frequencia. Numero = treino N da lista do tipo
            // (treinos, abaixo); 'D' e 'A' = os dias sem treino de `folga`.
            // 3x: 3 treinos com descanso entre eles; 4 a 5x: 5 treinos;
            // todos os dias: 6 treinos e 1 descanso ativo.
            dias: {
              '3x': [1, 'D', 2, 'D', 6, 'D', 'D'],
              '4_5x': [1, 2, 3, 'D', 5, 6, 'D'],
              todos: [1, 2, 3, 4, 5, 6, 'A'],
            },
            folga: {
              D: { treino: 'Descanso', duracao: 'sem treino' },
              A: { treino: 'Descanso ativo', duracao: '10 min' },
            },
            // Minutos de cada treino (treino 1 a 6) pela resposta do tempo:
            // menos de 20 -> 15 (o treino de 15 que existe no produto); 20 a
            // 30 -> 20 a 25; mais de 30 -> 25 (o teto que o app mostra na
            // tela de entrada: 15-25 min por dia).
            minutos: {
              menos_20: [15, 15, 15, 15, 15, 15],
              '20_30': [20, 20, 22, 25, 22, 25],
              mais_30: [25, 25, 25, 25, 25, 25],
            },
            unidade: 'min',
            // Obstaculo "rotina corrida": todo treino no menor tempo da faixa.
            obstaculoMinimo: 'tempo',
            // Nome de cada treino por tipo, tirado dos exercicios do bloco C
            // (tipos[*].c), numa sequencia que progride: ativa primeiro,
            // combina no fim.
            treinos: {
              // reto: acordar o gluteo antes de carregar.
              // So exercicios que existem no app (lista do dono, 01/10/2026) e
              // nada com elastico ou outro equipamento. Reto sem agachamento:
              // o bloco D dele diz que agachamento atrapalha.
              reto: ['Ponte de glúteos', 'Pulsos de ponte', 'Chutes de glúteo (direita e esquerda)', 'Ponte marchando', 'Avanço reverso', 'Combinado: ponte, chutes e avanço'],
              // quadrado: lateral e abducao, depois a curva de baixo.
              quadrado: ['Abdução de quadril em agachamento', 'Avanços laterais', 'Arco-íris (direita e esquerda)', 'Avanço curtsy', 'Agachamento plié', 'Combinado: lateral e curva de baixo'],
              // caido: tensao continua e isometria, descida lenta.
              caido: ['Pulsos de ponte', 'Plié com pulsos', 'Agachamentos com descida lenta', 'Elevação de calcanhares', 'Avanço reverso', 'Combinado: tensão contínua'],
            },
            // 35 anos ou mais: o 1o treino e de adaptacao, mais leve (minutos
            // por resposta do tempo), com a etiqueta e a nota.
            adaptacao: {
              idades: ['35_44', '45_mais'],
              minutos: { menos_20: 15, '20_30': 20, mais_30: 20 },
              tag: 'adaptação',
              nota: 'Na sua faixa de idade, o dia 1 é de adaptação, num ritmo mais leve. Comece cada treino com um aquecimento leve.',
            },
            // Obstaculo "nao sei por onde comecar": o 1o treino e guiado.
            guiado: {
              obstaculo: 'comecar',
              tag: 'guiado',
              nota: 'Dia 1 guiado: é só apertar o play e seguir o vídeo.',
            },
          },
          // RESERVA: a semana fixa de antes, pra quem chega na oferta sem as
          // respostas que montam a semana (QA, deep link).
          programacaoTitulo: 'A sua primeira semana',
          programacao: [
            { dia: '1', treino: 'Ativação do glúteo', duracao: '15 min' },
            { dia: '2', treino: 'Glúteo máximo', duracao: '20 min' },
            { dia: '3', treino: 'Lateral e médio', duracao: '18 min' },
            { dia: '4', treino: 'Descanso ativo', duracao: '10 min' },
            { dia: '5', treino: 'Tensão contínua', duracao: '22 min' },
            { dia: '6', treino: 'Combinado', duracao: '25 min' },
            { dia: '7', treino: 'Descanso', duracao: 'sem treino' },
          ],
          // Sem os prazos entre colchetes da spec ([12 meses], [5 minutos],
          // [7] dias uteis): nenhum foi confirmado, e prazo inventado na
          // pagina de venda vira promessa. Pagamento unico e 30 dias de
          // garantia sao os de hoje (resposta do dono, 01/10/2026).
          acessoTitulo: 'Acesso',
          acesso: 'Pagamento único, sem mensalidade. O acesso ao app Seja Fit (Android e iPhone) é liberado depois do pagamento, e o login chega por e-mail e WhatsApp.',
          garantiaTitulo: 'Como pedir a garantia',
          // Contato da garantia = o WhatsApp da Jacque (atendimento) e o e-mail.
          garantia: 'Dentro dos 30 dias, mande "quero a garantia" pro e-mail contato@sejafit.site ou pro WhatsApp da Jacque, (31) 99277-8823. Sem perguntas.',
        },

        // Os 4 bonus novos (textos provisorios, a aprovar; valores a definir
        // antes do deploy — sem price o card mostra so "AGORA GRATIS").
        bonusesTitle: 'E ainda leva 4 bônus de graça',
        bonuses: [
          { id: 'quad', name: 'Protocolo Quadríceps Proporcional', description: 'Pra coxa acompanhar o bumbum sem roubar o treino: a sequência que equilibra quadríceps e glúteo.', price: '' },
          { id: 'coxa', name: 'Protocolo de Coxa Anticelulite', description: 'Sequência específica pra firmeza da coxa e pra pele ficar mais lisa onde a celulite mais aparece.', price: '' },
          { id: 'superiores', name: 'Dois Treinos Completos de Superiores', description: 'Braço, costas e ombro em dois treinos prontos, pro resultado ser do corpo inteiro.', price: '' },
          { id: 'receitas', name: '51 Receitas Proteicas', description: 'Proteína fácil e barata pro músculo responder ao treino, sem dieta maluca e sem passar fome.', price: '',
            notaDepois: 'Você marcou {refeicoes_texto}: é por isso que as 51 receitas proteicas entram no seu plano.' },
        ],
        // Um selo por pessoa: primeiro a regra do obstaculo (compulsao ->
        // receitas), depois a do tipo (reto/quadrado -> quadriceps; caido ->
        // coxa). Superiores nunca.
        bonusDestaque: {
          selo: 'Feito pro seu caso',
          porObstaculo: { compulsao: 'receitas' },
          porTipo: { reto: 'quad', quadrado: 'quad', caido: 'coxa' },
          padrao: '',
        },

        scarcity: 'Vagas com bônus liberadas <b>somente hoje</b>',

        // Linha de soma: so entra com os valores reais dos 4 bonus
        // (somaLine: 'Desafio <s>R$ 147,00</s> + 4 bônus <s>R$ [soma]</s> = <s>R$ [total]</s>. Hoje: <b>R$ 27,00</b>.').
        priceLine: 'De <s>R$ 147,00</s> por apenas <b>R$ 27,00</b>',
        priceSub: 'Pagamento único de R$ 27,00 — menos de R$ 1,00 por dia no desafio',

        // Timer de 10 min gravado na sessao: nunca reinicia ao voltar ou recarregar.
        timerMinutes: 10,
        timerPersistente: true,
        timerNote: 'Esse valor com os bônus expira quando o tempo acabar',

        seals: [
          { title: 'Pagamento único', sub: 'Sem mensalidade nenhuma' },
          { title: 'Acesso imediato', sub: 'O app abre na hora do pagamento' },
        ],

        // 07/10/2026 (dono): a regra real da garantia (a que esta na Payt e
        // nos termos), no lugar da "Garantia do Toque", que prometia gluteo
        // mais firme na 1a semana e era mais estreita que os termos.
        guaranteeLine: '<b>Garantia de 30 dias:</b> não gostou, peça o reembolso em até 30 dias depois da compra e devolvemos 100%, sem precisar justificar.',

        // Os 11 comentarios da abertura, abaixo da garantia. A reescrita
        // (falar de resultado, nao do quiz; horarios variados nas respostas)
        // e de conteudo: trocar os textos aqui quando vierem.
        commentsTitle: 'O que as alunas comentaram',
        comments: [
          { id: 'c1', name: 'Camila', avatar: 'https://desinflameja.site/images/comentarios%20q1/1.jpg', text: 'É rapidinho mesmo? Quero descobrir por onde começar.', time: '12 min', likes: 8, replies: [{ name: 'Brenda', time: '9 min', text: 'Sim, Camila. Leva cerca de 2 minutos e o resultado considera as suas respostas.' }] },
          { id: 'c2', name: 'Patrícia', avatar: 'https://desinflameja.site/images/comentarios%20q1/2.jpg', text: 'Gostei porque as perguntas são bem diretas', time: '26 min', likes: 11, replies: [] },
          { id: 'c3', name: 'Mariana', avatar: 'https://desinflameja.site/images/comentarios%20q1/3.jpg', text: 'Dá pra responder mesmo treinando em casa?', time: '41 min', likes: 5, replies: [{ name: 'Brenda', time: '30 min', text: 'Dá sim. O questionário considera a sua rotina e o seu ponto de partida.' }] },
          { id: 'c4', name: 'Bruna', avatar: 'https://desinflameja.site/images/comentarios%20q1/4.jpg', text: 'Começando agora', time: '1 h', likes: 3, replies: [] },
          { id: 'c5', name: 'Fernanda', avatar: 'https://desinflameja.site/images/comentarios%20q1/5.jpg', text: 'O resultado aparece assim que eu terminar?', time: '1 h', likes: 6, replies: [{ name: 'Brenda', time: '52 min', text: 'Sim. Ao final você recebe a recomendação baseada nas suas respostas.' }] },
          { id: 'c6', name: 'Larissa', avatar: 'https://desinflameja.site/images/comentarios%20q1/6.jpg', text: 'Precisa ter academia ou equipamentos?', time: '2 h', likes: 4, replies: [{ name: 'Brenda', time: '1 h', text: 'Não. Há opções pensadas para quem treina em casa e com pouco tempo.' }] },
          { id: 'c7', name: 'Juliana', avatar: 'https://desinflameja.site/images/comentarios%20q1/7.jpg', text: 'Quero entender qual é o meu ponto de partida', time: '2 h', likes: 9, replies: [] },
          { id: 'c8', name: 'Ana Paula', avatar: 'https://desinflameja.site/images/comentarios%20q1/8.jpg', text: 'Terminei agora, as perguntas são bem simples de responder.', time: '3 h', likes: 7, replies: [] },
          { id: 'c9', name: 'Daniela', avatar: 'https://desinflameja.site/images/comentarios%20q1/9.jpg', text: 'Posso adaptar para os horários que tenho livres?', time: '4 h', likes: 3, replies: [{ name: 'Brenda', time: '3 h', text: 'Sim. A sua disponibilidade faz parte do questionário.' }] },
          { id: 'c10', name: 'Nathália', avatar: 'https://desinflameja.site/images/comentarios%20q1/10.jpg', text: 'Salvei pra responder com calma hoje à noite.', time: '5 h', likes: 2, replies: [] },
          { id: 'c11', name: 'Érica', avatar: 'https://desinflameja.site/images/comentarios%20q1/11.jpg', text: 'Já vou começar', time: '6 h', likes: 5, replies: [] },
        ],

        beforeAfterTitle: 'Resultados reais de alunas',
        beforeAfterSubtitle: 'Todas treinando em casa, sem academia',
        // Grade 2 x 2 (nunca 3), rotulo DIA 1 / DIA 21.
        beforeAfterImages: [
          { src: 'https://desinflameja.site/images/antes-depois-2-web.webp', alt: 'Antes e depois', rotulos: true },
          { src: 'https://desinflameja.site/images/antes-depois-4-web.webp', alt: 'Antes e depois', rotulos: true },
          { src: 'https://desinflameja.site/images/prova-6.webp', alt: 'Antes e depois', rotulos: true },
          { src: 'https://desinflameja.site/images/prova-3.webp', alt: 'Antes e depois', rotulos: true },
        ],

        // Rodape legal igual ao da abertura de antes.
        footer: true,

        cta: 'QUERO GARANTIR MINHA VAGA',
      },
    },
  ],
};


// EXTENSÃ•ES V4
// QUIZ PERSONALIZADO v4 (07/10/2026) — FUNNEL_VARIANT QUIZ_SF_B4,
// flow_version "quiz-sf-v4", funnel= "quiz-sf-b4". E o braco novo do teste
// v3 x v4 do Meta (truquedacavala.site '/' e desinflameja.site '/page2'): o
// Personalizado de hoje (quiz-sf-b-data.js, quiz-sf-v3, que segue intacto: e
// o controle) com as fases novas da proposta de conversao, ajustadas as
// respostas do dono de 07/10/2026. GEMEO byte a byte entre os dois repos.
//
// COMO ENTRA: so o quiz-sf-b4.html carrega este arquivo, DEPOIS do
// quiz-sf-b-data.js e antes do motor: ele mexe no window.QUIZ_DATA que o dado
// do v3 montou. O motor (quiz-sf-b.js) so desenha os blocos novos quando
// estas chaves existem, entao o v3 e o /ga (quiz-sf-ga-b.html, que le o
// mesmo dado do v3) nao mudam em nada.
//
// O QUE MUDA em relacao ao v3:
//   - identidade: funnelTag 'quiz-sf-b4' e a saida /oferta-especial-sf com
//     funnel=quiz-sf-b4 (checkout de R$ 27 e LP de saida sao os mesmos do v3
//     em cada dominio; o do truquedacavala entra pela sobrescrita do HTML);
//   - tela "Veja o resultado..." (prova_social): a linha do "8 em cada 10";
//   - oferta: cartao no topo, antes/depois das alunas com a mensagem, prints
//     do WhatsApp com o 1o pelo obstaculo marcado, "E seguro? Como eu
//     recebo?", "E se eu nao conseguir manter?", a garantia com o escudo no
//     lugar da frase e a linha da garantia embaixo do botao fixo. O "Como
//     funciona" fica so com o video do app e a primeira semana (os passos, o
//     acesso e o "como pedir a garantia" passaram pros blocos novos).
// O QUE NAO MUDA (dono, 07/10/2026): timer, desconto, "De R$ 147", valores
// riscados e "somente hoje"; nenhum prazo novo.
(function () {
  var d = window.QUIZ_DATA;
  var passo = function (nome) { return d.steps.filter(function (s) { return s.stepName === nome; })[0]; };

  d.funnelTag = 'quiz-sf-b4';
  d.backredirectUrl = '/oferta-especial-sf?funnel=quiz-sf-b4';

  // "8 em cada 10": consulta so leitura de 07/10/2026 nas respostas da tela
  // "O que voce ja tentou" do quiz-sf-v3 (Meta, os dois dominios, 30 dias,
  // robo do Meta fora): 1.025 respostas, academia 40,0% + internet 32,5% +
  // dieta 7,1% = 79,6%. Refazer a conta antes de trocar o numero.
  passo('prova_social').body = '<p class="prova-linha"><b>8 em cada 10</b> mulheres que fazem este teste já tentaram academia, treino da internet ou dieta. A diferença aqui: o treino vem pronto, curto e com vídeo.</p>';

  var p = passo('pitch').pitch;

  // Logo abaixo do titulo da oferta: quem aperta o botao fixo cedo ja viu o
  // preco, a garantia e como recebe (dono: acesso na hora, e-mail e WhatsApp).
  p.cartaoOferta = {
    titulo: 'Desafio de 21 Dias · Truque da Cavala',
    preco: '<b>R$ 27,00</b> · pagamento único, sem mensalidade',
    linhas: [
      '🛡️ <b>Garantia de 30 dias:</b> não gostou, devolvemos 100%',
      '📲 <b>Acesso na hora</b> no seu e-mail e no WhatsApp',
    ],
  };

  // Antes/depois enviados pelas alunas no grupo, com autorizacao e rosto
  // escondido (dono, 07/10/2026). A mensagem "Nunca tinha me sentido tao
  // linda" e da aluna da 1a foto (dono, 07/10/2026). 08/10/2026: legenda e
  // alt NAO dizem se as duas fotos sao da mesma aluna ou de alunas
  // diferentes (nao afirmar nenhum dos dois). 08/10/2026 (dono): fotos novas;
  // a 1a ja traz a mensagem dela dentro da imagem, entao sai o print separado.
  p.provaAluna = {
    titulo: 'Fotos que as alunas mandaram no grupo',
    fotos: [
      { src: 'https://desinflameja.site/images/aluna-real-antes-depois-1.webp', w: 720, h: 841, alt: 'Antes e depois de uma aluna, de frente e de costas, com o rosto escondido, e a mensagem dela: Nunca tinha me sentido tão linda',
        legenda: 'Fotos e mensagem enviadas por uma aluna.' },
      { src: 'https://desinflameja.site/images/aluna-real-antes-depois-2.webp', w: 720, h: 540, alt: 'Antes e depois enviados no grupo das alunas, de frente e de costas, com o rosto escondido',
        legenda: 'Fotos enviadas no grupo das alunas.' },
    ],
    nota: 'O resultado varia de pessoa pra pessoa.',
  };

  // Prints reais do grupo (dono, 07/10/2026: todos do Truque da Cavala;
  // telefone, sobrenome e foto de perfil borrados). O 1o muda pelo obstaculo
  // marcado no quiz e quem tem 45+ ve o da "vovo" em 2o (toda compradora
  // recebe o link do grupo).
  p.printsTitle = 'O que as alunas mandam pra gente no WhatsApp 💬';
  p.printsSub = 'Prints reais. Telefones escondidos pra proteger as alunas.';
  p.prints = [
    { id: 'p01', src: 'https://desinflameja.site/images/whats-cavala-01.webp', w: 720, h: 1145, alt: 'Print de aluna: já comprou vários treinos em casa e este é o melhor que está fazendo' },
    { id: 'p02', src: 'https://desinflameja.site/images/whats-cavala-02.webp', w: 720, h: 459, alt: 'Print de aluna: pernas com músculos acentuados e o bumbum ficando redondinho' },
    { id: 'p03', src: 'https://desinflameja.site/images/whats-cavala-03.webp', w: 720, h: 582, alt: 'Print de aluna: sem tempo pra academia, treina quando tem tempo e já sente diferença' },
    { id: 'p04', src: 'https://desinflameja.site/images/whats-cavala-04.webp', w: 720, h: 860, alt: 'Print de aluna: pós-parto, treina antes do bebê acordar e tinha medo de não ter constância' },
    { id: 'p05', src: 'https://desinflameja.site/images/whats-cavala-05.webp', w: 720, h: 388, alt: 'Print de aluna: treinos eficazes, fáceis de fazer e bem explicativos' },
    { id: 'p06', src: 'https://desinflameja.site/images/whats-cavala-06.webp', w: 720, h: 560, alt: 'Print de aluna: no terceiro dia, muito mais disposição' },
    { id: 'p07', src: 'https://desinflameja.site/images/whats-cavala-07.webp', w: 720, h: 634, alt: 'Print de aluna: fazia só musculação e, treinando em casa junto, notou mais desenvolvimento no glúteo' },
    { id: 'p08', src: 'https://desinflameja.site/images/whats-cavala-08.webp', w: 720, h: 756, alt: 'Print de aluna: a vovó do grupo conta que o grupo está levantando o astral dela' },
    { id: 'p09', src: 'https://desinflameja.site/images/whats-cavala-09.webp', w: 720, h: 487, alt: 'Print de aluna: sentindo as pernas melhorarem, estavam com muitas celulites' },
  ];
  p.printsOrdem = {
    // tempo -> sem tempo pra academia; motivacao/compulsao -> "ja comprei
    // outros e esse e o melhor"; comecar -> "faceis de fazer, explicativos";
    // autoestima -> "bumbum ficando redondinho".
    porObstaculo: { tempo: 'p03', motivacao: 'p01', compulsao: 'p01', comecar: 'p05', autoestima: 'p02' },
    segundoPorIdade: { '45_mais': 'p08' },
  };

  // Os passos, o acesso e o "como pedir a garantia" do "Como funciona" agora
  // estao no "E seguro?" e na garantia com o escudo: aqui ficam o video do
  // app e a primeira semana.
  p.comoFunciona.passos = [];
  p.comoFunciona.acesso = '';
  p.comoFunciona.garantia = '';

  // Dono, 07/10/2026: pagamento pela Payt, login na hora no e-mail e no
  // WhatsApp (todas recebem), link do grupo pra quem quiser, suporte da Jacque.
  p.seguro = {
    titulo: 'É seguro? Como eu recebo?',
    numerada: true,
    itens: [
      '<b>Pagamento pela Payt</b>, plataforma de pagamento online: Pix ou cartão, pagamento único, sem mensalidade.',
      '<b>O login chega na hora</b> no seu e-mail e no seu WhatsApp, assim que o pagamento é aprovado.',
      '<b>Você baixa o app Seja Fit</b> (Android e iPhone), entra com o login e o Dia 1 já está pronto, com vídeo de cada exercício.',
      '<b>Grupo de alunas no WhatsApp:</b> você recebe o link e entra se quiser.',
      '<b>Ficou com dúvida?</b> Fale com a Jacque, do nosso atendimento, no WhatsApp (31) 99277-8823, ou em contato@sejafit.site.',
    ],
  };

  // O tempo e o da resposta da aluna ({duracao}, 08/10/2026, dono: ela pode
  // fazer mais rapido, encurtando os descansos). "Continue de onde parou": dono,
  // 07/10/2026 (a aluna volta de onde parou no app).
  p.manter = {
    titulo: 'E se eu não conseguir manter?',
    intro: 'Se você já começou um treino e parou, não está sozinha. Por isso o desafio é curto e vem pronto:',
    itens: [
      '<b>{duracao} por dia</b>, na sala de casa.',
      '<b>Cada dia já está montado no app:</b> você aperta o play e segue o vídeo, com as repetições do dia.',
      '<b>A primeira semana é de adaptação</b>, num ritmo mais leve.',
      '<b>Perdeu um dia?</b> Continue de onde parou.',
    ],
  };

  // A regra real (termos de uso, secao 5, e a Payt): 30 dias corridos da
  // compra, 100%, sem justificar; estorno pelo mesmo meio de pagamento.
  p.garantiaBloco = {
    selo: { numero: '30', rotulo: 'DIAS' },
    titulo: 'Garantia de 30 dias: 100% do seu dinheiro de volta',
    texto: 'Entre, faça os treinos e veja como o seu corpo responde. Se por qualquer motivo você não gostar, peça o reembolso em até 30 dias depois da compra e devolvemos 100% do valor, sem precisar justificar.',
    comoPedir: '<b>Como pedir:</b> mande "quero a garantia" para contato@sejafit.site ou para o WhatsApp da Jacque, (31) 99277-8823. O estorno sai pelo mesmo meio de pagamento.',
  };

  p.ctaNota = '🛡️ Garantia de 30 dias · 100% de volta, sem justificar';
})();

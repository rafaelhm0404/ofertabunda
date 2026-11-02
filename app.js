/**
 * Desinflame Já / Truque da Cavala - Motor de Quiz & Página de Vendas
 * Versão otimizada com UX/UI moderna, transições suaves, efeitos visuais de alta conversão
 * e preservação integral de 100% dos textos e estrutura da página de vendas original.
 */

(function () {
  'use strict';

  // Estado global do Quiz
  const state = {
    currentStepIndex: 0,
    answers: {
      tipo: 'reto',
      incomodo: 'sem_volume',
      roupa: 'short',
      tentou: 'internet',
      tempo_dia: '20_30',
      frequencia: '4_5x',
      refeicoes: '3',
      idade: '25_34',
      mecanismo: 'primeira_vez',
      bumbum_sonhos: 'levantado',
      obstaculo: 'tempo',
      horario: 'noite'
    },
    history: [],
    timerRemaining: null,
    timerInterval: null,
    carouselIndex: 0
  };

  // Recupera respostas salvas se existirem
  try {
    const saved = localStorage.getItem('cavala_quiz_answers');
    if (saved) {
      state.answers = Object.assign({}, state.answers, JSON.parse(saved));
    }
  } catch (e) {
    console.warn('Storage indisponível:', e);
  }

  // Espera carregar os dados
  function getQuizData() {
    return window.QUIZ_DATA || null;
  }

  // Resolução de variáveis derivadas
  function resolveVariables() {
    const d = getQuizData();
    if (!d) return {};

    const vars = Object.assign({}, d.varDefaults, state.answers);

    // Tipo
    const tipoObj = d.tipos[vars.tipo] || d.tipos.reto;
    vars.nome = tipoObj.nome || '';
    vars.nome_prep = tipoObj.nome_prep || '';
    vars.apelido = tipoObj.apelido || '';
    vars.linha_apelido = tipoObj.linha_apelido || '';
    vars.botao_tipo = tipoObj.botao || 'ACESSAR MEU PLANO PERSONALIZADO';

    // Obstaculo
    const obstaculoObj = d.obstaculos[vars.obstaculo] || d.obstaculos.tempo;
    vars.obstaculo_texto = obstaculoObj.texto || 'o seu maior obstáculo';

    // Textos fixos
    if (d.textos) {
      if (d.textos.minutos && vars.tempo_dia) vars.minutos_txt = d.textos.minutos[vars.tempo_dia] || '';
      if (d.textos.frequencia && vars.frequencia) vars.frequencia_txt = d.textos.frequencia[vars.frequencia] || '';
      if (d.textos.objetivo && vars.bumbum_sonhos) vars.objetivo_txt = d.textos.objetivo[vars.bumbum_sonhos] || '';
    }

    // Dia início (regra das 18h)
    const horaAtual = new Date().getHours();
    vars.dia_inicio = horaAtual < (d.diaInicio?.corteHora || 18)
      ? (d.diaInicio?.antes || 'hoje')
      : (d.diaInicio?.depois || 'amanhã');

    // Derivadas configuradas
    if (d.derivadas) {
      Object.keys(d.derivadas).forEach(key => {
        const item = d.derivadas[key];
        const valOriginal = item.de === '_sempre' ? '_sempre' : (vars[item.de] || state.answers[item.de]);
        if (item.textos && item.textos[valOriginal] !== undefined) {
          vars[key] = item.textos[valOriginal];
        } else if (item.padrao !== undefined) {
          vars[key] = item.padrao;
        }
      });
    }

    return vars;
  }

  // Interpolação de templates ({var})
  function tpl(str) {
    if (!str || typeof str !== 'string') return str || '';
    const vars = resolveVariables();
    return str.replace(/\{([a-zA-Z0-9_]+)\}/g, function (match, key) {
      return vars[key] !== undefined ? vars[key] : match;
    });
  }

  // Escapa HTML
  function esc(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Gera o link de checkout com parâmetros de URL preservados
  function getCheckoutUrl() {
    const d = getQuizData();
    let url = d?.checkoutUrl || 'https://checkout.payt.com.br/4a4bea40dea96c1b7ffe1aee1168d8ca?payment=pix';
    
    // Anexa UTMs e parâmetros da página atual
    const currentParams = new URLSearchParams(window.location.search);
    try {
      const checkoutObj = new URL(url);
      currentParams.forEach((val, key) => {
        checkoutObj.searchParams.set(key, val);
      });
      // Garante funnel tag
      if (d?.funnelTag) {
        checkoutObj.searchParams.set('funnel', d.funnelTag);
      }
      return checkoutObj.toString();
    } catch (e) {
      return url;
    }
  }

  // Renderizador principal do passo
  function renderCurrentStep() {
    const d = getQuizData();
    if (!d || !d.steps) return;

    const step = d.steps[state.currentStepIndex];
    if (!step) return;

    // Atualiza barra de progresso
    updateProgress(state.currentStepIndex, d.steps.length);

    // Atualiza cabeçalho (visibilidade do botão voltar)
    const backBtn = document.getElementById('qb-back');
    if (backBtn) {
      backBtn.style.display = (state.currentStepIndex > 0 && step.type !== 'pitch') ? 'flex' : 'none';
    }

    const container = document.getElementById('step-container');
    if (!container) return;

    // Animação de saída e entrada
    container.style.opacity = '0';
    container.style.transform = 'translateY(12px)';

    setTimeout(() => {
      container.innerHTML = generateStepHtml(step);
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';

      bindStepEvents(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);
  }

  // Atualiza barra de progresso
  function updateProgress(index, total) {
    const meterFill = document.getElementById('meter-fill');
    const meterPercent = document.getElementById('meter-percent');
    if (!meterFill) return;

    const step = getQuizData().steps[index];
    let percent = 5;

    if (step && step.type === 'pitch') {
      percent = 100;
    } else {
      percent = Math.round(((index + 1) / total) * 100);
      percent = Math.min(percent, 95);
    }

    meterFill.style.width = percent + '%';
    if (meterPercent) {
      meterPercent.textContent = percent + '%';
    }
  }

  // Gerador de HTML de cada tipo de passo
  function generateStepHtml(step) {
    const vars = resolveVariables();

    // 1. QUESTION
    if (step.type === 'question') {
      let optionsHtml = '';
      if (step.options && step.options.length) {
        optionsHtml = '<div class="options-grid' + (step.options.some(o => o.image) ? ' options-with-images' : '') + '">';
        step.options.forEach(opt => {
          const isSelected = state.answers[step.variableToSave] === opt.value;
          const imageHtml = opt.image ? `<div class="opt-img-wrap"><img src="${esc(opt.image)}" alt="${esc(opt.label)}" class="opt-img" /></div>` : '';
          const subHtml = opt.sub ? `<span class="opt-sub">${esc(opt.sub)}</span>` : '';

          optionsHtml += `
            <button type="button" class="option-card ${isSelected ? 'is-selected' : ''}" data-value="${esc(opt.value)}">
              ${imageHtml}
              <div class="opt-content">
                <div class="opt-header">
                  <span class="opt-radio"></span>
                  <span class="opt-label">${esc(opt.label)}</span>
                </div>
                ${subHtml}
              </div>
            </button>
          `;
        });
        optionsHtml += '</div>';
      }

      const eyebrowHtml = step.eyebrow ? `<div class="step-eyebrow"><span class="badge-tag">${esc(step.eyebrow)}</span></div>` : '';
      const bodyHtml = step.body ? `<div class="step-body">${tpl(step.body)}</div>` : '';

      return `
        <div class="step-wrap step-question" data-step-name="${esc(step.stepName)}">
          ${eyebrowHtml}
          <h1 class="step-title">${tpl(step.title)}</h1>
          ${bodyHtml}
          ${optionsHtml}
        </div>
      `;
    }

    // 2. MESSAGE (Prova social, Pré-diagnóstico, Quem montou)
    if (step.type === 'message') {
      let paresHtml = '';
      if (step.pares && step.pares.length) {
        paresHtml = '<div class="proof-pairs-grid">';
        step.pares.forEach((par, idx) => {
          paresHtml += `
            <div class="proof-pair-card">
              <div class="proof-pair-labels">
                <span class="pill-tag pill-before">DIA 1</span>
                <span class="pill-tag pill-after">DIA 21</span>
              </div>
              <img src="${esc(par.src)}" alt="${esc(par.caption || 'Antes e depois de aluna')}" class="proof-pair-img" loading="lazy" />
              ${par.caption ? `<div class="proof-pair-caption">${esc(par.caption)}</div>` : ''}
            </div>
          `;
        });
        paresHtml += '</div>';
      }

      const bodyHtml = step.body ? `<div class="step-body">${tpl(step.body)}</div>` : '';
      const ctaBtn = step.cta ? `
        <div class="step-cta-wrap">
          <button type="button" class="btn-primary btn-cta pulse-effect" id="msg-cta-btn">
            <span>${esc(step.cta)}</span>
            <svg class="cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </button>
        </div>
      ` : '';

      return `
        <div class="step-wrap step-message" data-step-name="${esc(step.stepName)}">
          <h1 class="step-title">${tpl(step.title)}</h1>
          ${bodyHtml}
          ${paresHtml}
          ${ctaBtn}
        </div>
      `;
    }

    // 3. PROCESSING
    if (step.type === 'processing') {
      return `
        <div class="step-wrap step-processing" data-step-name="${esc(step.stepName)}">
          <div class="spinner-container">
            <svg class="processing-spinner" viewBox="0 0 100 100">
              <circle class="spinner-bg" cx="50" cy="50" r="42"></circle>
              <circle class="spinner-bar" id="spinner-circle-bar" cx="50" cy="50" r="42"></circle>
            </svg>
            <div class="spinner-number" id="spinner-number">0%</div>
          </div>
          <h2 class="step-title">${esc(step.title)}</h2>
          <p class="step-sub">${esc(step.body)}</p>
          <div class="processing-ticker">
            <span class="ticker-pulse"></span>
            <span class="ticker-text" id="ticker-text">${tpl(step.messages?.[0] || 'Analisando dados...')}</span>
          </div>
        </div>
      `;
    }

    // 4. DIAGNÓSTICO / TIPO (step 18)
    if (step.type === 'tipo') {
      const tipoObj = d.tipos[vars.tipo] || d.tipos.reto;
      const b1 = tipoObj.b1 ? `<div class="tipo-card"><div class="tipo-card-label">O que você vê no espelho</div><p>${tpl(tipoObj.b1)}</p></div>` : '';
      const b2 = d.paginaTipo?.b2 ? `<div class="tipo-card"><div class="tipo-card-label">O que você provavelmente já viveu</div><p>${tpl(d.paginaTipo.b2)}</p></div>` : '';
      const b3 = tipoObj.b3 ? `<div class="tipo-card"><div class="tipo-card-label">Por que nada funcionou até agora</div><p>${tpl(tipoObj.b3)}</p></div>` : '';
      
      let clipeHtml = '';
      if (tipoObj.clipe && tipoObj.clipe.src) {
        clipeHtml = `
          <div class="clipe-wrap">
            <video class="clipe-video" src="${esc(tipoObj.clipe.src)}" poster="${esc(tipoObj.clipe.poster || '')}" autoplay muted loop playsinline></video>
            ${tipoObj.clipe.legenda ? `<div class="clipe-caption">${esc(tipoObj.clipe.legenda)}</div>` : ''}
          </div>
        `;
      }

      const c = tipoObj.c ? `<div class="tipo-card tipo-highlight"><div class="tipo-card-label">O que funciona pro seu tipo</div><p>${tpl(tipoObj.c)}</p>${clipeHtml}</div>` : '';
      const erro = tipoObj.d ? `<div class="tipo-card tipo-danger"><div class="tipo-card-label">O erro mais comum do seu tipo</div><p>${tpl(tipoObj.d)}</p></div>` : '';
      const ponte = d.paginaTipo?.ponte ? `<div class="tipo-card tipo-ponte"><div class="tipo-card-label">Seu Cronograma</div><p>${tpl(d.paginaTipo.ponte)}</p></div>` : '';

      // Gráfico de evolução
      const chartHtml = renderEvolutionChart(step.chart);

      return `
        <div class="step-wrap step-tipo" data-step-name="${esc(step.stepName)}">
          <div class="step-eyebrow"><span class="badge-tag">${esc(step.eyebrow || 'Resultado da sua Análise')}</span></div>
          <h1 class="step-title">${tpl(step.title)}</h1>
          ${step.body ? `<div class="tipo-header-sub">${tpl(step.body)}</div>` : ''}
          
          <div class="tipo-cards-flow">
            ${b1}
            ${b2}
            ${b3}
            ${c}
            ${erro}
            ${chartHtml}
            ${ponte}
          </div>

          <div class="step-cta-wrap">
            <button type="button" class="btn-primary btn-cta pulse-effect" id="tipo-cta-btn">
              <span>${esc(step.cta || 'ACESSAR MEU PLANO PERSONALIZADO!')}</span>
              <svg class="cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      `;
    }

    // 5. PITCH (PÁGINA DE VENDAS COMPLETA)
    if (step.type === 'pitch') {
      return renderPitchSalesPage(step);
    }

    return '<div class="step-wrap">Passo em carregamento...</div>';
  }

  // Renderiza Gráfico SVG de Projeção
  function renderEvolutionChart(chartConfig) {
    const pts = chartConfig?.points || [
      { x: 'DIA 1', y: 5, label: 'Ponto de partida' },
      { x: 'DIA 3', y: 18, label: 'Primeira evolução' },
      { x: 'DIA 8', y: 42, label: 'Adaptação' },
      { x: 'DIA 14', y: 68, label: 'Aceleração' },
      { x: 'DIA 21', y: 96, label: 'Resultado' }
    ];

    const W = 360, H = 220;
    const L = 36, R = 18, T = 22, Bo = 38;
    const maxY = 100;

    const coords = pts.map((p, i) => {
      const x = L + (W - L - R) * (pts.length === 1 ? 0 : i / (pts.length - 1));
      const y = T + (H - T - Bo) * (1 - p.y / maxY);
      return { x, y, p };
    });

    const linePoints = coords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
    const areaPath = `M${coords[0].x.toFixed(1)},${H - Bo} L${coords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' L')} L${coords[coords.length - 1].x.toFixed(1)},${H - Bo} Z`;

    const gridLines = [0, 25, 50, 75, 100].map(v => {
      const y = T + (H - T - Bo) * (1 - v / maxY);
      return `
        <line class="ch-grid" x1="${L}" y1="${y.toFixed(1)}" x2="${W - R}" y2="${y.toFixed(1)}" />
        <text class="ch-ytick" x="${L - 8}" y="${(y + 3).toFixed(1)}">${v}%</text>
      `;
    }).join('');

    const dots = coords.map((c, i) => `
      <circle class="ch-dot-outer" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="7" />
      <circle class="ch-dot-inner" cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="4" />
    `).join('');

    const xLabels = coords.map((c, i) => {
      const anchor = i === 0 ? 'start' : (i === coords.length - 1 ? 'end' : 'middle');
      return `<text class="ch-xtick" text-anchor="${anchor}" x="${c.x.toFixed(1)}" y="${H - Bo + 20}">${esc(c.p.x)}</text>`;
    }).join('');

    const markers = coords.map((c, i) => {
      if (!c.p.label) return '';
      const anchor = c.x > W * 0.7 ? 'end' : (c.x < W * 0.3 ? 'start' : 'middle');
      const offsetY = i % 2 === 0 ? -12 : -14;
      return `<text class="ch-mark" text-anchor="${anchor}" x="${c.x.toFixed(1)}" y="${(c.y + offsetY).toFixed(1)}">${esc(c.p.label)}</text>`;
    }).join('');

    return `
      <div class="chart-box">
        <div class="chart-header">
          <span class="chart-icon">📈</span>
          <span class="chart-title">Projeção da sua evolução nos 21 dias do desafio</span>
        </div>
        <div class="chart-svg-wrap">
          <svg class="evolution-svg" viewBox="0 0 ${W} ${H}">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#FF2E63" stop-opacity="0.45" />
                <stop offset="100%" stop-color="#FF2E63" stop-opacity="0.0" />
              </linearGradient>
            </defs>
            ${gridLines}
            <path class="ch-area" d="${areaPath}" fill="url(#chartGrad)" />
            <polyline class="ch-line" points="${linePoints}" />
            ${dots}
            ${xLabels}
            ${markers}
          </svg>
        </div>
      </div>
    `;
  }

  // Renderiza a Página de Vendas Completa (PITCH)
  function renderPitchSalesPage(step) {
    const p = step.pitch;
    const checkoutUrl = getCheckoutUrl();
    const vars = resolveVariables();

    // 1. Cartão da Oferta no Topo
    let cartaoHtml = '';
    if (p.cartaoOferta) {
      const co = p.cartaoOferta;
      cartaoHtml = `
        <div class="pitch-card pitch-card-top highlight-glow">
          <div class="cartao-badge">✨ OFERTA EXCLUSIVA DO SEU PLANO</div>
          <h2 class="cartao-titulo">${tpl(co.titulo)}</h2>
          <div class="cartao-preco">${tpl(co.preco)}</div>
          <div class="cartao-linhas">
            ${(co.linhas || []).map(l => `<div class="cartao-linha"><span class="cartao-linha-text">${tpl(l)}</span></div>`).join('')}
          </div>
          <a href="${checkoutUrl}" class="btn-primary btn-cta btn-fast-buy pulse-effect" target="_self">
            <span>QUERO GARANTIR MINHA VAGA</span>
            <svg class="cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      `;
    }

    // 2. Subline & Reframe
    const sublineHtml = p.subline ? `<div class="pitch-subline"><span class="clock-mini">⏱️</span> ${tpl(p.subline)}</div>` : '';
    const reframeHtml = p.reframe ? `<div class="pitch-reframe">${tpl(p.reframe)}</div>` : '';

    // 3. Prova Aluna (Antes e depois com mensagem)
    let provaAlunaHtml = '';
    if (p.provaAluna && p.provaAluna.fotos) {
      const pa = p.provaAluna;
      provaAlunaHtml = `
        <div class="pitch-section pitch-aluna-section">
          <h3 class="pitch-sec-title">${tpl(pa.titulo)}</h3>
          <div class="alunas-fotos-grid">
            ${pa.fotos.map(f => `
              <div class="aluna-foto-card">
                <img src="${esc(f.src)}" alt="${esc(f.alt || 'Antes e depois de aluna')}" class="aluna-foto-img" loading="lazy" />
                ${f.legenda ? `<div class="aluna-foto-legenda">${esc(f.legenda)}</div>` : ''}
              </div>
            `).join('')}
          </div>
          ${pa.nota ? `<p class="aluna-nota">${esc(pa.nota)}</p>` : ''}
        </div>
      `;
    }

    // 4. Carrossel de Prints do WhatsApp
    let printsHtml = '';
    const printsList = p.prints || [];
    if (printsList.length > 0) {
      printsHtml = `
        <div class="pitch-section pitch-prints-section">
          <div class="whatsapp-header-badge">
            <span class="wa-dot"></span> WhatsApp Oficial das Alunas
          </div>
          <h3 class="pitch-sec-title">${esc(p.printsTitle || 'O que as alunas estão mandando no grupo')}</h3>
          ${p.printsSub ? `<p class="pitch-sec-sub">${esc(p.printsSub)}</p>` : ''}
          
          <div class="carousel-container" id="wa-carousel-container">
            <button class="carousel-arrow prev" id="carousel-prev" aria-label="Anterior">‹</button>
            <div class="carousel-track" id="carousel-track">
              ${printsList.map((item, idx) => `
                <div class="carousel-slide ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
                  <div class="wa-print-card">
                    <img src="${esc(item.src)}" alt="${esc(item.alt || 'Print WhatsApp Aluna')}" class="wa-print-img" loading="lazy" />
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="carousel-arrow next" id="carousel-next" aria-label="Próximo">›</button>
          </div>
          <div class="carousel-dots" id="carousel-dots">
            ${printsList.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}" data-dot="${i}"></span>`).join('')}
          </div>
        </div>
      `;
    }

    // 5. Depoimentos em Cards
    let depoHtml = '';
    if (p.testimonials && p.testimonials.length) {
      depoHtml = `
        <div class="pitch-section pitch-testimonials-section">
          <h3 class="pitch-sec-title">${esc(p.testimonialsTitle || 'Alunas que fizeram o Truque da Cavala')}</h3>
          <div class="testimonials-grid">
            ${p.testimonials.map(t => `
              <div class="testi-card">
                <div class="testi-top">
                  <img src="${esc(t.image)}" alt="${esc(t.name)}" class="testi-avatar" loading="lazy" />
                  <div class="testi-meta">
                    <div class="testi-name">${esc(t.name)}</div>
                    <div class="testi-stars">★★★★★ <span class="testi-verified">Aluna Verificada</span></div>
                  </div>
                </div>
                <div class="testi-text">"${esc(t.text)}"</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 6. Benefícios por Tipo
    let beneHtml = '';
    const beneList = (p.benefitsPorTipo && p.benefitsPorTipo[state.answers.tipo]) || p.benefits;
    if (beneList && beneList.length) {
      beneHtml = `
        <div class="pitch-section pitch-benefits-section">
          <h3 class="pitch-sec-title">${esc(p.benefitsTitle || 'O que você conquista no desafio')}</h3>
          <div class="benefits-grid">
            ${beneList.map(b => `
              <div class="benefit-item">
                <div class="benefit-icon-check">✓</div>
                <div class="benefit-text">${tpl(b)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 7. Como Funciona (Vídeo do App + Programação 1ª Semana)
    let comoFuncionaHtml = '';
    const cf = p.comoFunciona;
    if (cf) {
      let videoHtml = '';
      if (cf.video && cf.video.src) {
        videoHtml = `
          <div class="app-video-box">
            <video class="app-video-el" src="${esc(cf.video.src)}" poster="${esc(cf.video.poster || '')}" autoplay muted loop playsinline></video>
            ${cf.video.legenda ? `<div class="video-legenda-tag">${esc(cf.video.legenda)}</div>` : ''}
          </div>
        `;
      }

      // Tabela da Primeira Semana
      const semObj = cf.semana1;
      let tabelaHtml = '';
      if (semObj) {
        const tituloSemana = tpl(semObj.titulo || 'A sua primeira semana');
        const freqKey = state.answers.frequencia || '4_5x';
        const diasArr = semObj.dias?.[freqKey] || [1, 2, 3, 'D', 5, 6, 'D'];
        const durArr = semObj.minutos?.[state.answers.tempo_dia] || [20, 20, 22, 25, 22, 25];
        const treinosTipo = semObj.treinos?.[state.answers.tipo] || semObj.treinos?.reto || [];

        let rowsHtml = '';
        diasArr.forEach((diaItem, idx) => {
          const diaNum = idx + 1;
          let nomeTreino = '';
          let duracaoTxt = '';
          let isFolga = false;

          if (diaItem === 'D') {
            isFolga = true;
            nomeTreino = 'Descanso';
            duracaoTxt = 'sem treino';
          } else if (diaItem === 'A') {
            isFolga = true;
            nomeTreino = 'Descanso ativo';
            duracaoTxt = '10 min';
          } else {
            const treinoIndex = typeof diaItem === 'number' ? diaItem - 1 : 0;
            nomeTreino = treinosTipo[treinoIndex] || `Treino de Ativação ${diaItem}`;
            const dur = durArr[treinoIndex] || 20;
            duracaoTxt = `${dur} min`;
          }

          rowsHtml += `
            <tr class="${isFolga ? 'row-folga' : ''}">
              <td class="col-dia">Dia ${diaNum}</td>
              <td class="col-treino">${esc(nomeTreino)}</td>
              <td class="col-dur">${esc(duracaoTxt)}</td>
            </tr>
          `;
        });

        tabelaHtml = `
          <div class="cronograma-semana">
            <div class="cronograma-title">${tituloSemana}</div>
            <div class="table-responsive">
              <table class="cronograma-table">
                <thead>
                  <tr>
                    <th>Dia</th>
                    <th>Treino</th>
                    <th>Duração</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHtml}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      comoFuncionaHtml = `
        <div class="pitch-section pitch-comofunciona-section">
          <h3 class="pitch-sec-title">${esc(cf.titulo || 'Como funciona')}</h3>
          ${videoHtml}
          ${tabelaHtml}
        </div>
      `;
    }

    // 8. É Seguro? Como eu Recebo?
    let seguroHtml = '';
    if (p.seguro) {
      const s = p.seguro;
      seguroHtml = `
        <div class="pitch-section pitch-seguro-section">
          <h3 class="pitch-sec-title">${esc(s.titulo)}</h3>
          <div class="steps-numbered-list">
            ${(s.itens || []).map((it, idx) => `
              <div class="step-num-item">
                <div class="step-num-badge">${idx + 1}</div>
                <div class="step-num-content">${tpl(it)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 9. E se eu não conseguir manter?
    let manterHtml = '';
    if (p.manter) {
      const m = p.manter;
      manterHtml = `
        <div class="pitch-section pitch-manter-section">
          <h3 class="pitch-sec-title">${esc(m.titulo)}</h3>
          ${m.intro ? `<p class="manter-intro">${esc(m.intro)}</p>` : ''}
          <div class="manter-cards-list">
            ${(m.itens || []).map(it => `
              <div class="manter-item-card">
                <span class="manter-item-icon">✨</span>
                <div class="manter-item-text">${tpl(it)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 10. Bônus Exclusivos de Graça
    let bonusHtml = '';
    if (p.bonuses && p.bonuses.length) {
      const dst = p.bonusDestaque || null;
      const idDestaque = dst ? (dst.porObstaculo?.[state.answers.obstaculo] || dst.porTipo?.[state.answers.tipo] || dst.padrao || '') : '';

      bonusHtml = `
        <div class="pitch-section pitch-bonuses-section">
          <div class="bonus-badge-top">🎁 PRESENTES INCLUSOS</div>
          <h3 class="pitch-sec-title">${esc(p.bonusesTitle || 'E ainda leva 4 bônus de graça')}</h3>
          <div class="bonuses-cards-grid">
            ${p.bonuses.map((b, idx) => {
              const ehDestaque = (b.id && b.id === idDestaque);
              let notaHtml = '';
              if (b.notaDepois) {
                const resolvedNota = tpl(b.notaDepois);
                if (!resolvedNota.includes('{')) {
                  notaHtml = `<div class="bonus-nota-especial">${resolvedNota}</div>`;
                }
              }

              return `
                <div class="bonus-card ${ehDestaque ? 'bonus-destaque-active' : ''}">
                  ${ehDestaque ? `<div class="bonus-ribbon">${esc(dst.selo || 'Feito pro seu caso')}</div>` : ''}
                  <div class="bonus-number">BÔNUS #${idx + 1}</div>
                  <h4 class="bonus-title">${esc(b.name)}</h4>
                  <p class="bonus-desc">${b.description}</p>
                  <div class="bonus-price-tag">
                    ${b.price ? `<span class="price-strike">${esc(b.price)}</span>` : ''}
                    <span class="price-free">GRÁTIS HOJE</span>
                  </div>
                  ${notaHtml}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    // 11. Escassez e Cronômetro
    const escassezHtml = p.scarcity ? `<div class="pitch-scarcity-line">${p.scarcity}</div>` : '';
    const timerHtml = p.timerMinutes ? `
      <div class="countdown-widget">
        <div class="countdown-label">🚨 ESTA CONDIÇÃO ESPECIAL EXPIRA EM:</div>
        <div class="countdown-timer-display" id="pitch-countdown">
          <div class="time-block"><span class="time-val" id="timer-minutes">10</span><span class="time-label">MIN</span></div>
          <span class="time-divider">:</span>
          <div class="time-block"><span class="time-val" id="timer-seconds">00</span><span class="time-label">SEG</span></div>
        </div>
        ${p.timerNote ? `<div class="countdown-note">${esc(p.timerNote)}</div>` : ''}
      </div>
    ` : '';

    // 12. Preço de Ancoragem e CTA Central
    const priceBoxHtml = `
      <div class="pitch-price-box-card">
        ${timerHtml}
        ${escassezHtml}
        <div class="price-headline">${p.priceLine}</div>
        <div class="price-subheadline">${esc(p.priceSub)}</div>
        <a href="${checkoutUrl}" class="btn-primary btn-cta btn-main-buy pulse-effect" target="_self">
          <span>${esc(p.cta || 'QUERO GARANTIR MINHA VAGA')}</span>
          <svg class="cta-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </a>
        <div class="cta-security-tag">
          <span class="sec-icon">🔒</span> Compra 100% Segura · Acesso Imediato
        </div>
      </div>
    `;

    // 13. Selos
    let selosHtml = '';
    if (p.seals && p.seals.length) {
      selosHtml = `
        <div class="pitch-seals-grid">
          ${p.seals.map(s => `
            <div class="seal-badge-card">
              <div class="seal-title">🛡️ ${esc(s.title)}</div>
              <div class="seal-sub">${esc(s.sub)}</div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // 14. Garantia Blindada de 30 Dias
    let garantiaHtml = '';
    if (p.garantiaBloco) {
      const gb = p.garantiaBloco;
      garantiaHtml = `
        <div class="garantia-shield-card">
          <div class="shield-badge-left">
            <div class="shield-outer">
              <span class="shield-num">${esc(gb.selo?.numero || '30')}</span>
              <span class="shield-lbl">${esc(gb.selo?.rotulo || 'DIAS')}</span>
            </div>
          </div>
          <div class="shield-content">
            <h3 class="shield-title">${tpl(gb.titulo)}</h3>
            <p class="shield-text">${tpl(gb.texto)}</p>
            ${gb.comoPedir ? `<div class="shield-como-pedir">${tpl(gb.comoPedir)}</div>` : ''}
          </div>
        </div>
      `;
    }

    // 15. Comentários de Alunas
    let comentariosHtml = '';
    if (p.comments && p.comments.length) {
      comentariosHtml = `
        <div class="pitch-section pitch-comments-section">
          <div class="comments-header">
            <h3 class="comments-title">${esc(p.commentsTitle || 'O que as alunas comentaram')}</h3>
            <span class="comments-count">${p.comments.length} comentários</span>
          </div>
          <div class="comments-feed-list">
            ${p.comments.map(c => `
              <div class="comment-item" id="comm-${esc(c.id)}">
                <img src="${esc(c.avatar)}" alt="${esc(c.name)}" class="comment-avatar" loading="lazy" />
                <div class="comment-bubble">
                  <div class="comment-name">${esc(c.name)}</div>
                  <div class="comment-body">${esc(c.text)}</div>
                  <div class="comment-meta">
                    <button type="button" class="btn-like-comment" onclick="window.__likeComment('${esc(c.id)}')">Curtir</button>
                    <span>·</span>
                    <span class="comment-time">${esc(c.time)}</span>
                    ${c.likes ? `<span class="comment-likes-pill">👍 <span id="likes-${esc(c.id)}">${c.likes}</span></span>` : ''}
                  </div>
                  ${(c.replies && c.replies.length) ? `
                    <div class="comment-replies">
                      ${c.replies.map(r => `
                        <div class="comment-reply-item">
                          <img src="https://desinflameja.site/images/brenda-avatar.webp" alt="Brenda" class="reply-avatar" />
                          <div class="reply-bubble">
                            <div class="reply-name">${esc(r.name)} <span class="badge-creator">Instrutora</span></div>
                            <div class="reply-body">${esc(r.text)}</div>
                            <div class="reply-time">${esc(r.time)}</div>
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 16. Antes e depois adicionais
    let beforeAfterHtml = '';
    if (p.beforeAfterImages && p.beforeAfterImages.length) {
      beforeAfterHtml = `
        <div class="pitch-section pitch-before-after-section">
          <h3 class="pitch-sec-title">${esc(p.beforeAfterTitle || 'Resultados reais de alunas')}</h3>
          ${p.beforeAfterSubtitle ? `<p class="pitch-sec-sub">${esc(p.beforeAfterSubtitle)}</p>` : ''}
          <div class="before-after-gallery-grid">
            ${p.beforeAfterImages.map(img => `
              <div class="ba-gallery-item">
                <div class="proof-pair-labels">
                  <span class="pill-tag pill-before">DIA 1</span>
                  <span class="pill-tag pill-after">DIA 21</span>
                </div>
                <img src="${esc(img.src)}" alt="${esc(img.alt || 'Antes e depois')}" class="ba-gallery-img" loading="lazy" />
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 17. Rodapé Institucional
    const d = getQuizData();
    const gf = d.gateFooter || {};
    const footerHtml = `
      <footer class="app-site-footer">
        <nav class="footer-legal-nav">
          ${(gf.links || []).map(l => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join('<span class="nav-sep">·</span>')}
        </nav>
        <p class="footer-disclaimer">${esc(gf.note || '')}</p>
        <p class="footer-company">${esc(gf.company || '')}</p>
      </footer>
    `;

    return `
      <div class="step-wrap step-pitch" data-step-name="pitch">
        <div class="pitch-headline-area">
          <div class="badge-tag badge-ready">PLANO FINALIZADO COM SUCESSO</div>
          <h1 class="pitch-main-title">${tpl(step.title)}</h1>
        </div>

        ${cartaoHtml}
        ${sublineHtml}
        ${reframeHtml}
        ${provaAlunaHtml}
        ${printsHtml}
        ${depoHtml}
        ${beneHtml}
        ${comoFuncionaHtml}
        ${seguroHtml}
        ${manterHtml}
        ${bonusHtml}
        ${priceBoxHtml}
        ${selosHtml}
        ${garantiaHtml}
        ${comentariosHtml}
        ${beforeAfterHtml}
        ${footerHtml}
      </div>
    `;
  }

  // Configura eventos interativos do passo ativo
  function bindStepEvents(step) {
    const d = getQuizData();

    // 1. QUESTION: cliques nas opções
    if (step.type === 'question') {
      const cards = document.querySelectorAll('.option-card');
      cards.forEach(card => {
        card.addEventListener('click', function () {
          const val = this.getAttribute('data-value');
          if (step.variableToSave) {
            state.answers[step.variableToSave] = val;
            try {
              localStorage.setItem('cavala_quiz_answers', JSON.stringify(state.answers));
            } catch (e) {}
          }

          // Atualiza visual
          cards.forEach(c => c.classList.remove('is-selected'));
          this.classList.add('is-selected');

          // Avança para o próximo passo com um feedback tátil de 220ms
          setTimeout(() => {
            goToNextStep();
          }, 220);
        });
      });
    }

    // 2. MESSAGE: botão CTA
    if (step.type === 'message') {
      const ctaBtn = document.getElementById('msg-cta-btn');
      if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
          goToNextStep();
        });
      }
    }

    // 3. PROCESSING: animação de contagem e troca de mensagens
    if (step.type === 'processing') {
      const circle = document.getElementById('spinner-circle-bar');
      const numberEl = document.getElementById('spinner-number');
      const tickerEl = document.getElementById('ticker-text');
      const duration = step.durationMs || 5000;
      const startTime = performance.now();
      const messages = step.messages || [];

      const totalCircumference = 2 * Math.PI * 42; // r=42
      if (circle) {
        circle.style.strokeDasharray = totalCircumference;
        circle.style.strokeDashoffset = totalCircumference;
      }

      function updateLoader(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1.0);
        const percent = Math.floor(progress * 100);

        if (numberEl) numberEl.textContent = `${percent}%`;
        if (circle) {
          circle.style.strokeDashoffset = totalCircumference * (1 - progress);
        }

        if (tickerEl && messages.length) {
          const msgIdx = Math.min(Math.floor(progress * messages.length), messages.length - 1);
          tickerEl.textContent = tpl(messages[msgIdx]);
        }

        if (progress < 1.0) {
          requestAnimationFrame(updateLoader);
        } else {
          setTimeout(() => {
            goToNextStep();
          }, 250);
        }
      }
      requestAnimationFrame(updateLoader);
    }

    // 4. TIPO: botão CTA
    if (step.type === 'tipo') {
      const ctaBtn = document.getElementById('tipo-cta-btn');
      if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
          goToNextStep();
        });
      }
    }

    // 5. PITCH: carrossel e cronômetro
    if (step.type === 'pitch') {
      initPitchFeatures(step.pitch);
    }

    // Atualiza CTA Dock Inferior (Mobile/Desktop)
    updateCtaDock(step);
  }

  // Inicializa carrossel e cronômetro da página de vendas
  function initPitchFeatures(p) {
    // 1. Carrossel de prints do WhatsApp
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('#carousel-dots .dot');
    const slides = document.querySelectorAll('.carousel-slide');

    if (track && slides.length > 1) {
      let currentIndex = 0;

      function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;

        slides.forEach((sl, idx) => {
          sl.classList.toggle('active', idx === currentIndex);
        });
        dots.forEach((dt, idx) => {
          dt.classList.toggle('active', idx === currentIndex);
        });

        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
      }

      if (prevBtn) prevBtn.onclick = () => goToSlide(currentIndex - 1);
      if (nextBtn) nextBtn.onclick = () => goToSlide(currentIndex + 1);

      dots.forEach((dot, idx) => {
        dot.onclick = () => goToSlide(idx);
      });

      // Swipe no celular
      let startX = 0;
      track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      track.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].clientX - startX;
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) goToSlide(currentIndex - 1);
          else goToSlide(currentIndex + 1);
        }
      }, { passive: true });
    }

    // 2. Cronômetro de 10 minutos (persistente na sessão)
    if (p && p.timerMinutes) {
      let durationSeconds = 10 * 60;
      try {
        const savedTime = sessionStorage.getItem('cavala_timer_seconds');
        if (savedTime && parseInt(savedTime, 10) > 0) {
          durationSeconds = parseInt(savedTime, 10);
        }
      } catch (e) {}

      if (state.timerInterval) clearInterval(state.timerInterval);

      function updateClockDisplay() {
        const mm = Math.floor(durationSeconds / 60);
        const ss = durationSeconds % 60;
        const mmEl = document.getElementById('timer-minutes');
        const ssEl = document.getElementById('timer-seconds');
        if (mmEl) mmEl.textContent = String(mm).padStart(2, '0');
        if (ssEl) ssEl.textContent = String(ss).padStart(2, '0');
      }

      updateClockDisplay();

      state.timerInterval = setInterval(() => {
        if (durationSeconds > 0) {
          durationSeconds--;
          try {
            sessionStorage.setItem('cavala_timer_seconds', String(durationSeconds));
          } catch (e) {}
          updateClockDisplay();
        } else {
          clearInterval(state.timerInterval);
        }
      }, 1000);
    }
  }

  // Atualiza a barra fixa (CTA Dock)
  function updateCtaDock(step) {
    const dock = document.getElementById('cta-dock');
    if (!dock) return;

    if (step.type === 'pitch') {
      const checkoutUrl = getCheckoutUrl();
      dock.innerHTML = `
        <div class="dock-inner">
          <div class="dock-info">
            <span class="dock-price">R$ 27,00</span>
            <span class="dock-tag">30 dias de garantia</span>
          </div>
          <a href="${checkoutUrl}" class="btn-primary btn-dock-cta pulse-effect" target="_self">
            <span>GARANTIR MINHA VAGA</span>
            <svg class="cta-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      `;
      dock.classList.add('is-visible');
    } else {
      dock.classList.remove('is-visible');
      dock.innerHTML = '';
    }
  }

  // Avança para o próximo passo
  function goToNextStep() {
    const d = getQuizData();
    if (!d || !d.steps) return;

    state.history.push(state.currentStepIndex);
    if (state.currentStepIndex < d.steps.length - 1) {
      state.currentStepIndex++;
      renderCurrentStep();
    }
  }

  // Volta um passo
  function goBackStep() {
    if (state.history.length > 0) {
      state.currentStepIndex = state.history.pop();
      renderCurrentStep();
    }
  }

  // Salto rápido para a página de vendas (útil para conferência e revisão)
  function jumpToStep(stepNameOrIndex) {
    const d = getQuizData();
    if (!d || !d.steps) return;

    if (typeof stepNameOrIndex === 'string') {
      const idx = d.steps.findIndex(s => s.stepName === stepNameOrIndex);
      if (idx !== -1) {
        state.currentStepIndex = idx;
        renderCurrentStep();
      }
    } else if (typeof stepNameOrIndex === 'number' && d.steps[stepNameOrIndex]) {
      state.currentStepIndex = stepNameOrIndex;
      renderCurrentStep();
    }
  }

  // Like interativo nos comentários
  window.__likeComment = function (id) {
    const el = document.getElementById('likes-' + id);
    if (el) {
      const current = parseInt(el.textContent, 10) || 0;
      el.textContent = current + 1;
      el.parentElement.style.color = '#38bdf8';
    }
  };

  // Funções expostas
  window.__quizVoltar = goBackStep;
  window.__quizPularPara = jumpToStep;

  // Inicialização no DOM
  document.addEventListener('DOMContentLoaded', () => {
    // Configura botão de voltar do header
    const backBtn = document.getElementById('qb-back');
    if (backBtn) {
      backBtn.addEventListener('click', goBackStep);
    }

    // Atalhos para modo de exibição direta se houver ?step=pitch na URL
    const urlParams = new URLSearchParams(window.location.search);
    const stepParam = urlParams.get('step');

    if (stepParam) {
      jumpToStep(stepParam);
    } else {
      renderCurrentStep();
    }


  });

})();

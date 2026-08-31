(function () {
  'use strict';

  var WEBHOOK_URL = 'https://teste.trafegodeloja.com.br/webhook/clinica-velar-captacao';
  var STORAGE_KEY = 'velar_lead_tracking';

  var PAGE_VERTENTE = {
    'harmonizacao-facial.html': 'Harmonização Facial',
    'harmonizacao-facial-masculina.html': 'Harmonização Facial Masculina',
    'estetica-corporal.html': 'Estética Corporal',
    'skincare-limpeza-de-pele.html': 'Skincare & Limpeza de Pele',
    'tratamento-de-melasma.html': 'Tratamento de Melasma',
    'nutricao.html': 'Nutrição',
    'tricologia-tratamento-capilar.html': 'Tricologia/Capilar'
  };

  var VERTENTE_OPTIONS = [
    'Harmonização Facial',
    'Harmonização Facial Masculina',
    'Estética Corporal',
    'Skincare & Limpeza de Pele',
    'Tratamento de Melasma',
    'Nutrição',
    'Tricologia/Capilar',
    'Ainda não sei / Avaliação geral'
  ];

  var URGENCIA_OPTIONS = ['Essa semana', 'Esse mês', 'Só pesquisando ainda'];

  var PAGE_QUALIFYING = {
    'harmonizacao-facial.html': {
      question: 'O que mais te incomoda no momento?',
      options: ['Papada/contorno do rosto', 'Lábios', 'Nariz', 'Olheiras', 'Rugas/marcas de expressão', 'Não sei, quero uma avaliação']
    },
    'harmonizacao-facial-masculina.html': {
      question: 'O que você quer melhorar no seu rosto?',
      options: ['Queixo/mandíbula definida', 'Papada', 'Rugas de expressão', 'Não sei, quero uma avaliação']
    },
    'estetica-corporal.html': {
      question: 'Qual seu principal objetivo?',
      options: ['Emagrecimento', 'Definição/tonificação', 'Reduzir celulite', 'Flacidez de pele']
    },
    'skincare-limpeza-de-pele.html': {
      question: 'Qual sua principal queixa de pele?',
      options: ['Acne/cravos', 'Oleosidade', 'Poros dilatados', 'Pele opaca/sem viço', 'Ressecamento']
    },
    'tratamento-de-melasma.html': {
      question: 'Você já tentou algum tratamento pra melasma antes?',
      options: ['Sim, sem resultado', 'Sim, com resultado parcial', 'Não, seria o primeiro']
    },
    'nutricao.html': {
      question: 'Qual seu objetivo principal?',
      options: ['Emagrecimento', 'Ganho de massa/performance', 'Saúde geral/exames', 'Reeducação alimentar']
    },
    'tricologia-tratamento-capilar.html': {
      question: 'O que você está buscando?',
      options: ['Frear a queda de cabelo', 'Tratar calvície/falhas', 'Fortalecer e engrossar os fios', 'Avaliar transplante capilar']
    }
  };

  function currentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
  }

  function currentVertente() {
    return PAGE_VERTENTE[currentPage()] || '';
  }

  function captureTracking() {
    var params = new URLSearchParams(window.location.search);
    var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
    var data = {};
    try { data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { data = {}; }
    keys.forEach(function (k) {
      var v = params.get(k);
      if (v) data[k] = v;
    });
    if (!data.referrer && document.referrer) data.referrer = document.referrer;
    if (!data.first_page_url) data.first_page_url = window.location.href;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    return data;
  }

  function sendToKommo(payload) {
    try {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  function buildWhatsappUrl(originalHref, nome) {
    try {
      var url = new URL(originalHref, window.location.href);
      var text = decodeURIComponent((url.searchParams.get('text') || 'Olá!').replace(/\+/g, ' '));
      if (nome) text = 'Olá, me chamo ' + nome + '. ' + text;
      url.searchParams.set('text', text);
      return url.toString();
    } catch (e) {
      return originalHref;
    }
  }

  function injectStyles() {
    var style = document.createElement('style');
    style.textContent =
      '.velar-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;' +
      'align-items:center;justify-content:center;z-index:99999;padding:16px;}' +
      '.velar-modal{background:#fff;border-radius:12px;max-width:360px;width:100%;padding:24px;' +
      'font-family:inherit;box-shadow:0 10px 40px rgba(0,0,0,.25);}' +
      '.velar-modal h3{margin:0 0 6px;font-size:18px;color:#222;}' +
      '.velar-modal p{margin:0 0 16px;font-size:14px;color:#555;}' +
      '.velar-modal label{display:block;font-size:13px;margin:10px 0 4px;color:#333;}' +
      '.velar-modal input,.velar-modal select{width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;' +
      'font-size:14px;box-sizing:border-box;font-family:inherit;background:#fff;}' +
      '.velar-modal-actions{margin-top:18px;display:flex;flex-direction:column;gap:8px;}' +
      '.velar-modal-submit{background:#25D366;color:#fff;border:none;border-radius:8px;padding:12px;' +
      'font-size:15px;font-weight:600;cursor:pointer;}' +
      '.velar-modal-back{background:none;border:none;color:#888;font-size:13px;cursor:pointer;padding:4px;' +
      'text-align:center;}' +
      '.velar-modal input.velar-invalid,.velar-modal select.velar-invalid{border-color:#e53935;}' +
      '.velar-modal-error{color:#e53935;font-size:12px;margin:4px 0 0;display:none;}' +
      '.velar-modal-progress{font-size:12px;color:#999;margin:0 0 10px;text-align:right;}';
    document.head.appendChild(style);
  }

  function digitsOnly(v) {
    return (v || '').replace(/\D/g, '');
  }

  function buildOptionsHtml(options) {
    return options.map(function (o) { return '<option value="' + o + '">' + o + '</option>'; }).join('');
  }

  function submitLead(overlay, originalHref, data) {
    var tracking = captureTracking();
    sendToKommo({
      nome: data.nome || '',
      telefone: data.telefone,
      vertente: data.vertente || '',
      qualificacao: data.qualificacao || '',
      urgencia: data.urgencia || '',
      cidade_bairro: data.cidade || '',
      utm_source: tracking.utm_source || '',
      utm_medium: tracking.utm_medium || '',
      utm_campaign: tracking.utm_campaign || '',
      utm_content: tracking.utm_content || '',
      utm_term: tracking.utm_term || '',
      gclid: tracking.gclid || '',
      fbclid: tracking.fbclid || '',
      referrer: tracking.referrer || '',
      page_url: window.location.href
    });
    overlay.remove();
    window.open(buildWhatsappUrl(originalHref, data.nome), '_blank');
  }

  function validatePhone(overlay, telInput) {
    var errorEl = overlay.querySelector('[data-error="telefone"]');
    var digits = digitsOnly(telInput.value);
    if (digits.length < 10) {
      telInput.classList.add('velar-invalid');
      if (errorEl) errorEl.style.display = 'block';
      telInput.focus();
      return null;
    }
    telInput.classList.remove('velar-invalid');
    if (errorEl) errorEl.style.display = 'none';
    return digits;
  }

  // Pop-up simples (páginas de vertente): nome + telefone + 1 pergunta de qualificação específica da página
  function openSimpleModal(originalHref) {
    var vertente = currentVertente();
    var qualifying = PAGE_QUALIFYING[currentPage()];
    var overlay = document.createElement('div');
    overlay.className = 'velar-modal-overlay';
    overlay.innerHTML =
      '<div class="velar-modal">' +
      '<h3>Antes de falar com a gente</h3>' +
      '<p>É rapidinho — assim a equipe já te chama sabendo o que você procura.</p>' +
      '<label>Seu nome</label>' +
      '<input type="text" data-field="nome" placeholder="Como podemos te chamar?">' +
      '<label>Seu WhatsApp/telefone</label>' +
      '<input type="tel" data-field="telefone" placeholder="(00) 00000-0000" required>' +
      '<p class="velar-modal-error" data-error="telefone">Informe um telefone válido pra gente te chamar.</p>' +
      (qualifying ?
        '<label>' + qualifying.question + '</label>' +
        '<select data-field="qualificacao">' + buildOptionsHtml(qualifying.options) + '</select>'
        : '') +
      '<div class="velar-modal-actions">' +
      '<button type="button" class="velar-modal-submit">Falar no WhatsApp</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    overlay.querySelector('.velar-modal-submit').addEventListener('click', function () {
      var nome = overlay.querySelector('[data-field="nome"]').value.trim();
      var telInput = overlay.querySelector('[data-field="telefone"]');
      var telefone = validatePhone(overlay, telInput);
      if (!telefone) return;
      var qualificacaoEl = overlay.querySelector('[data-field="qualificacao"]');
      submitLead(overlay, originalHref, {
        nome: nome,
        telefone: telefone,
        vertente: vertente,
        qualificacao: qualificacaoEl ? qualificacaoEl.value : ''
      });
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  // Formulário de 5 etapas (página principal, público mais aberto): nome, telefone, vertente, urgência, bairro/cidade
  function openWizardModal(originalHref) {
    var data = { nome: '', telefone: '', vertente: '', urgencia: '', cidade: '' };
    var step = 1;
    var TOTAL_STEPS = 5;

    var overlay = document.createElement('div');
    overlay.className = 'velar-modal-overlay';
    overlay.innerHTML = '<div class="velar-modal"></div>';
    document.body.appendChild(overlay);
    var modal = overlay.querySelector('.velar-modal');

    function render() {
      var body = '<p class="velar-modal-progress">Passo ' + step + ' de ' + TOTAL_STEPS + '</p>';

      if (step === 1) {
        body += '<h3>Antes de falar com a gente</h3>' +
          '<p>É rapidinho — assim a equipe já te chama sabendo o que você procura.</p>' +
          '<label>Seu nome</label>' +
          '<input type="text" data-field="nome" placeholder="Como podemos te chamar?" value="' + data.nome + '">';
      } else if (step === 2) {
        body += '<label>Seu WhatsApp/telefone</label>' +
          '<input type="tel" data-field="telefone" placeholder="(00) 00000-0000" value="' + data.telefone + '" required>' +
          '<p class="velar-modal-error" data-error="telefone">Informe um telefone válido pra gente te chamar.</p>';
      } else if (step === 3) {
        body += '<label>O que você está buscando?</label>' +
          '<select data-field="vertente">' + buildOptionsHtml(VERTENTE_OPTIONS) + '</select>';
      } else if (step === 4) {
        body += '<label>Quando você pretende iniciar?</label>' +
          '<select data-field="urgencia">' + buildOptionsHtml(URGENCIA_OPTIONS) + '</select>';
      } else if (step === 5) {
        body += '<label>Bairro/Cidade (opcional)</label>' +
          '<input type="text" data-field="cidade" value="' + data.cidade + '">';
      }

      var actions = '<div class="velar-modal-actions">' +
        '<button type="button" class="velar-modal-submit" data-action="next">' +
        (step === TOTAL_STEPS ? 'Falar no WhatsApp' : 'Avançar') + '</button>' +
        (step > 1 ? '<button type="button" class="velar-modal-back" data-action="back">Voltar</button>' : '') +
        '</div>';

      modal.innerHTML = body + actions;

      modal.querySelector('[data-action="next"]').addEventListener('click', onNext);
      var backBtn = modal.querySelector('[data-action="back"]');
      if (backBtn) backBtn.addEventListener('click', function () { step -= 1; render(); });

      var firstInput = modal.querySelector('input, select');
      if (firstInput) firstInput.focus();
    }

    function onNext() {
      if (step === 1) {
        data.nome = modal.querySelector('[data-field="nome"]').value.trim();
      } else if (step === 2) {
        var telInput = modal.querySelector('[data-field="telefone"]');
        var telefone = validatePhone(overlay, telInput);
        if (!telefone) return;
        data.telefone = telefone;
      } else if (step === 3) {
        data.vertente = modal.querySelector('[data-field="vertente"]').value;
      } else if (step === 4) {
        data.urgencia = modal.querySelector('[data-field="urgencia"]').value;
      } else if (step === 5) {
        data.cidade = modal.querySelector('[data-field="cidade"]').value.trim();
        submitLead(overlay, originalHref, data);
        return;
      }
      step += 1;
      render();
    }

    render();

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.remove();
    });
  }

  function openModal(originalHref) {
    if (currentPage() === 'index.html') {
      openWizardModal(originalHref);
    } else {
      openSimpleModal(originalHref);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    captureTracking();

    document.addEventListener('click', function (e) {
      var link = e.target.closest('a[href*="wa.me"]');
      if (!link) return;
      e.preventDefault();
      openModal(link.getAttribute('href'));
    });
  });
})();

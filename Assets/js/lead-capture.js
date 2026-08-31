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

  function currentVertente() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    return PAGE_VERTENTE[path] || '';
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
      '.velar-modal input{width:100%;padding:10px;border:1px solid #ccc;border-radius:8px;font-size:14px;box-sizing:border-box;}' +
      '.velar-modal-actions{margin-top:18px;display:flex;flex-direction:column;gap:8px;}' +
      '.velar-modal-submit{background:#25D366;color:#fff;border:none;border-radius:8px;padding:12px;font-size:15px;font-weight:600;cursor:pointer;}' +
      '.velar-modal-skip{background:none;border:none;color:#888;font-size:13px;text-decoration:underline;cursor:pointer;padding:4px;}';
    document.head.appendChild(style);
  }

  function openModal(originalHref) {
    var vertente = currentVertente();
    var overlay = document.createElement('div');
    overlay.className = 'velar-modal-overlay';
    overlay.innerHTML =
      '<div class="velar-modal">' +
      '<h3>Antes de falar com a gente</h3>' +
      '<p>É rapidinho — assim a equipe já te chama sabendo o que você procura.</p>' +
      '<label>Seu nome</label>' +
      '<input type="text" data-field="nome" placeholder="Como podemos te chamar?">' +
      '<label>Bairro/Cidade (opcional)</label>' +
      '<input type="text" data-field="cidade">' +
      '<div class="velar-modal-actions">' +
      '<button type="button" class="velar-modal-submit">Falar no WhatsApp</button>' +
      '<button type="button" class="velar-modal-skip">Pular e ir direto pro WhatsApp</button>' +
      '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    function finish(nome, cidade) {
      var tracking = captureTracking();
      sendToKommo({
        nome: nome || '',
        telefone: '',
        vertente: vertente,
        cidade_bairro: cidade || '',
        utm_source: tracking.utm_source || '',
        utm_campaign: tracking.utm_campaign || '',
        page_url: window.location.href
      });
      overlay.remove();
      window.open(buildWhatsappUrl(originalHref, nome), '_blank');
    }

    overlay.querySelector('.velar-modal-submit').addEventListener('click', function () {
      var nome = overlay.querySelector('[data-field="nome"]').value.trim();
      var cidade = overlay.querySelector('[data-field="cidade"]').value.trim();
      finish(nome, cidade);
    });
    overlay.querySelector('.velar-modal-skip').addEventListener('click', function () {
      finish('', '');
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) finish('', '');
    });
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

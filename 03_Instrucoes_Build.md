# Instruções de Build — Landing Page Clínica Velar

Guia completo para construir a página. Ler junto com `02_Design_System.md`, `tokens.css` e `04_Wireframe.html`.

**Objetivo da página:** captação de leads → agendamento via WhatsApp.
**Posicionamento:** premium / alto padrão · experiência sensorial · minimalista.
**Diferencial:** harmonização masculina + complexo multidisciplinar.
**Local:** Av. Agamenon Magalhães, 1363 — Maurício de Nassau, Caruaru/PE.

---

## 0. Decisão de stack (pendente com Eduardo)

- **Opção A — Framer:** rápido, já têm o domínio. Reconstruir do zero (o atual é template de imóveis). Bom se o objetivo é subir rápido e editar sem dev.
- **Opção B — Next.js/React + Tailwind (recomendada para escalar):** controle total, integra com CRM/n8n, melhor performance/SEO. Importar `tokens.css` ou os tokens no `tailwind.config`.

O restante deste guia serve para as duas rotas (as specs são agnósticas).

---

## 1. Estrutura de seções (ordem final)

Segue o wireframe `04_Wireframe.html`. 9 blocos + header/footer:

1. **Header sticky** — logo VELAR + menu (Sobre · Tratamentos · Estrutura · Contato) + link "Agendar". Mobile: hambúrguer.
2. **Hero** — headline curta ("Menos é mais você.") + sub + CTA duplo (Agendar / Tratamentos) + microcopy. Foto retrato dessaturada à direita. *Deve converter no fold.*
3. **Trust bar** — 4 números discretos (anos, pacientes, satisfação, especialistas), separados por linha.
4. **Qual é o seu objetivo?** — lista minimalista (6 linhas + seta): Harmonização facial · Harmonização masculina *(tag "diferencial")* · Estética corporal · Skincare & melasma · Nutrição · Tricologia. Cada linha → WhatsApp com mensagem pré-preenchida.
5. **A Experiência Velar** (seção preta, assinatura da marca) — "A pressa fica do lado de fora" + foto do lounge + 3 thumbs (recepção, salas, detalhes).
6. **Tratamentos** — grid de 6 cards (foto + título + 1 linha + "Ver").
7. **Resultados & prova** — antes/depois (2 imgs) + 1 depoimento em destaque, lado a lado.
8. **Equipe** — 4 retratos P&B (Dra. Laisy Velar · Dr. Weverthon Velar · Dr. Felipe Neri · Adriana Nunes).
9. **FAQ** — 4 perguntas em accordion (dói? / duração / avaliação tem custo? / atende homens?).
10. **CTA final** (seção preta) — "Sua próxima versão começa com uma avaliação" + botão WhatsApp.
11. **Footer** (preto) — logo, contato, endereço, horário.

Fixos: **WhatsApp flutuante** (círculo preto, bottom-right) + header sticky.

---

## 2. Conteúdo a coletar com a clínica (bloqueia o build)

- [ ] **Números reais** para a trust bar (anos, nº de pacientes, % satisfação).
- [ ] **Fotos** do hero e do espaço em alta (usar `Assets/Espaco` como base — pedir versões melhores se possível).
- [ ] **Retratos da equipe** em P&B ou tratáveis (base em `Assets/Equipe`).
- [ ] **3–5 depoimentos** (texto/print/vídeo) com autorização de uso de imagem.
- [ ] **Antes & depois** autorizados (respeitar regras do conselho para divulgação).
- [ ] **Lista final de procedimentos** + 1 linha de descrição de cada.
- [ ] **Logo VELAR** em vetor (SVG) — hoje só há bitmap.
- [ ] **Horário de funcionamento** confirmado.
- [ ] **Vídeo do espaço** — já existe: `https://framerusercontent.com/assets/efXaIH73I0GqxASCWo9SzFYY0k.mp4`. Salvar cópia local em `Assets/Video/` e gerar versão comprimida + WebM (ver §3b).

---

## 3b. Vídeo de ambiente (dinamismo)

Usar o vídeo do espaço **mudo, em autoplay e loop** na seção **"A Experiência Velar"** (posição no wireframe). Dá movimento sem quebrar o minimalismo — o silêncio combina com o tom calmo da marca.

**Markup:**
```html
<video autoplay muted loop playsinline preload="metadata"
       poster="/assets/video/experiencia-poster.jpg"
       class="experiencia-video">
  <source src="/assets/video/experiencia.webm" type="video/webm">
  <source src="/assets/video/experiencia.mp4"  type="video/mp4">
</video>
```

**Regras (obrigatórias para autoplay funcionar e não pesar):**
- `muted` + `playsinline` são **obrigatórios** — sem eles o autoplay é bloqueado no iOS/Chrome.
- `poster` com um frame estático evita “buraco” preto enquanto carrega (usar um still do próprio vídeo, tratado em tom frio).
- **Comprimir:** exportar MP4 (H.264) leve + WebM (VP9/AV1). Alvo < 3–4 MB, ~1080p, sem faixa de áudio (remove peso).
- `preload="metadata"` (não `auto`) e, se possível, `loading`/IntersectionObserver para só dar play quando entrar na viewport.
- Respeitar `prefers-reduced-motion`: se o usuário pediu menos movimento, **pausar** e mostrar só o `poster`.
- Alternativa de uso: como **fundo do hero** (full-bleed, com overlay escuro para legibilidade do texto). Escolher UM lugar — não usar vídeo em duas seções (polui e pesa).

```css
@media (prefers-reduced-motion: reduce) {
  .experiencia-video { display: none; }         /* cai para o poster/imagem */
}
```

---

## 3. Copy (a produzir)

O wireframe usa copy-placeholder. Produzir a copy real por seção (posso rodar a skill de copy). Diretrizes de tom:

- **Curto, elegante, sem gritar.** Frases curtas. Zero "clique aqui".
- **CTA sempre com verbo + benefício:** "Agendar avaliação", não "Enviar".
- **Message match:** a headline do hero deve espelhar o anúncio (Meta/Google) que trouxe o clique.
- **Microcopy de confiança** abaixo dos botões: "Resposta em até 1h · Sem compromisso".

---

## 4. Integrações e conversão

- **WhatsApp:** número `5581981604549`. Links com mensagem pré-preenchida por objetivo, ex.:
  `https://wa.me/5581981604549?text=Ol%C3%A1!%20Quero%20agendar%20uma%20avalia%C3%A7%C3%A3o%20de%20harmoniza%C3%A7%C3%A3o%20masculina`
- **Meta Pixel** + **Google Tag (GA4)** no `<head>`.
- **Eventos de conversão:** disparar `Lead` / `Contact` em todo clique de WhatsApp (hero, objetivos, CTA final, botão flutuante).
- Opcional: enviar o clique para um fluxo **n8n** (webhook) para registrar lead/notificar a clínica.

---

## 5. SEO e técnico (corrigir — hoje está quebrado)

O site atual herda o template "ROYAL Realestate". No build novo, garantir:

- [ ] `<title>`: "Clínica Velar — Estética Premium em Caruaru/PE".
- [ ] `<meta name="description">` própria (harmonização facial/masculina, estética, Caruaru).
- [ ] `<html lang="pt-BR">`.
- [ ] OpenGraph/Twitter (título, descrição, imagem própria da Velar).
- [ ] Favicon com a marca Velar.
- [ ] `alt` em todas as imagens.
- [ ] Remover qualquer badge/menu do template (HOME/PROPERTIES/BLOG em inglês).
- [ ] Sitemap + Google Search Console + perfil Google Business (Maps).
- [ ] **Performance:** imagens em WebP, `loading="lazy"`, LCP < 2.5s. Fotos grandes (2–3MB nos assets) precisam ser comprimidas.

---

## 6. Acessibilidade e mobile

- Contraste mínimo 4.5:1 (a paleta já cumpre; cuidar do `gray` só em texto ≥14px).
- Alvos de toque ≥ 44px.
- Fonte corpo mínima 16px no mobile.
- Testar hero no fold mobile (headline + sub + CTA sem rolar).
- Accordion do FAQ acessível por teclado.

---

## 7. Checklist de publicação

- [ ] Copy real aprovada em todas as seções.
- [ ] Imagens finais comprimidas (WebP) e com alt.
- [ ] Links de WhatsApp testados (com mensagem correta por objetivo).
- [ ] Pixel + GA4 disparando eventos (testar em modo debug).
- [ ] SEO/meta/OG/favicon corretos.
- [ ] Teste mobile real (iOS + Android).
- [ ] Teste de velocidade (PageSpeed) ≥ 90 mobile.
- [ ] Redirect do domínio para a nova página.

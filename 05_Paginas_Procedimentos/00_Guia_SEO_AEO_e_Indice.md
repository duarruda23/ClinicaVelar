# Guia Mestre — SEO + AEO das Páginas de Procedimento

Como as 7 páginas de procedimento da Clínica Velar foram pensadas para **ranquear no Google (SEO)** e ser **citadas por IAs de busca** (ChatGPT, Gemini, Perplexity, Google AI Overviews) — o chamado **AEO/GEO** (Answer/Generative Engine Optimization).

_Virgo Marketing · 10/07/2026 · ler junto com `02_Design_System.md` e `03_Instrucoes_Build.md`_

---

## 1. Índice das páginas

| Arquivo | URL sugerida | Palavra-chave principal |
|---|---|---|
| `harmonizacao-facial.md` | `/harmonizacao-facial` | harmonização facial em Caruaru |
| `harmonizacao-masculina.md` | `/harmonizacao-facial-masculina` | harmonização facial masculina Caruaru |
| `estetica-corporal.md` | `/estetica-corporal` | estética corporal Caruaru |
| `skincare-limpeza-de-pele.md` | `/skincare-limpeza-de-pele` | limpeza de pele / skincare Caruaru |
| `melasma.md` | `/tratamento-de-melasma` | tratamento de melasma Caruaru |
| `nutricao.md` | `/nutricao` | nutricionista estética/emagrecimento Caruaru |
| `tricologia.md` | `/tricologia-tratamento-capilar` | tricologia / queda de cabelo Caruaru |

Todas ficam sob o domínio `clinicavelar.com.br` e são linkadas a partir da seção "Qual é o seu objetivo?" e do menu "Tratamentos" da home.

---

## 2. Como cada página está montada (padrão)

Cada arquivo entrega **copy + instrução de construção + SEO/AEO** na mesma ordem:

1. **Bloco SEO/AEO** — slug, `<title>`, meta description, keyword principal + secundárias, intenção de busca.
2. **Resposta rápida (AEO)** — parágrafo de 40–60 palavras que responde "o que é / para quem / resultado" de forma direta. É o trecho desenhado para virar *featured snippet* e ser citado por IA.
3. **Copy por seção** — Hero → O que é → Para quem → Como funciona → Benefícios → Diferencial Velar → Equipe → Resultados → FAQ → CTA final.
4. **Instrução de build por seção** — layout, componente do design system, imagem/vídeo, CTA e mensagem de WhatsApp pré-preenchida.
5. **Schema (JSON-LD)** — `MedicalWebPage`/`MedicalProcedure` + `FAQPage` + `BreadcrumbList`.
6. **Interligação** — links internos para páginas irmãs.

---

## 3. Princípios de SEO tradicional aplicados

- **1 página = 1 intenção = 1 palavra-chave principal.** Sem canibalização.
- **Title ≤ 60 caracteres**, com keyword + cidade. **Meta description ≤ 155**, com keyword + CTA.
- **1 único H1** por página (contém a keyword). H2/H3 em linguagem de busca.
- **Keyword nos 100 primeiros palavras**, na URL, no H1, num H2, no alt de imagem e na meta.
- **SEO local:** citar "Caruaru", "Agreste", "Pernambuco" naturalmente; NAP idêntico em todo o site; vincular ao perfil Google Business.
- **Imagens** com `alt` descritivo + keyword, comprimidas (WebP), `loading="lazy"`.
- **Interligação:** cada página linka para 2–3 irmãs e para a home. A home linka para todas.
- **Conteúdo profundo e único** (600–1000+ palavras por página) — o Google premia completude.

## 4. Princípios de AEO / IA aplicados

- **Resposta direta no topo** (o bloco "Resposta rápida") — IAs extraem respostas curtas e objetivas.
- **H2 em forma de pergunta** batendo com a linguagem natural ("Quanto tempo dura...?", "Dói?"). Espelha o "People Also Ask".
- **FAQ com `FAQPage` schema** — maior fonte de citações por IA e de *rich results*.
- **Definições de entidade claras** ("Harmonização facial é...") — ajuda o modelo a entender e citar.
- **E-E-A-T:** toda página tem **autor/responsável técnico nomeado** (especialista da Velar) + data de atualização. Sinaliza experiência e autoridade — crítico em saúde (YMYL).
- **Linguagem factual e escaneável**, frases curtas, listas objetivas. Sem enrolação.
- **Dados/números** quando possível (durações, nº de sessões) — conteúdo citável.
- **`llms.txt`** (opcional): publicar em `clinicavelar.com.br/llms.txt` um índice em texto das páginas e do que a clínica oferece, facilitando o consumo por IAs.

---

## 5. Dados compartilhados (NAP + marca)

Usar **idêntico** em todas as páginas, footer e Google Business:

```
Clínica Velar
Av. Agamenon Magalhães, 1363 — Maurício de Nassau, Caruaru/PE, 55014-000
WhatsApp/Tel: +55 81 98160-4549
E-mail: clinicavelar@gmail.com
Atendimento: Caruaru e região do Agreste Pernambucano
```

**Responsáveis técnicos (autoria E-E-A-T):**
Dra. Laisy Velar (harmonização) · Dr. Weverthon Velar (estética) · Dr. Felipe Neri (nutrição) · Adriana Nunes (tricologia).

**Schema global da organização** (colocar no `<head>` de todo o site, uma vez):

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": "Clínica Velar",
  "url": "https://clinicavelar.com.br",
  "telephone": "+55-81-98160-4549",
  "email": "clinicavelar@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Agamenon Magalhães, 1363 - Maurício de Nassau",
    "addressLocality": "Caruaru",
    "addressRegion": "PE",
    "postalCode": "55014-000",
    "addressCountry": "BR"
  },
  "areaServed": "Caruaru e Agreste de Pernambuco",
  "medicalSpecialty": ["Dermatology", "PlasticSurgery", "Nutrition"]
}
```

---

## 6. Compliance (publicidade em saúde)

Obrigatório em todas as páginas — seguir CFM/conselhos:

- **Sem promessa de cura** ou resultado garantido. Usar "pode", "ajuda a", "resultados variam".
- **Antes & depois** só com autorização de imagem e sem sugerir resultado padrão.
- Evitar sensacionalismo, preços associados a "promoção milagrosa".
- Incluir disclaimer leve no rodapé: *"Resultados variam de pessoa para pessoa. As informações desta página são educativas e não substituem uma avaliação profissional presencial."*
- Citar o responsável técnico e registro do conselho quando publicar.

---

## 7. Checklist por página (antes de publicar)

- [ ] Title ≤ 60 e meta ≤ 155, com keyword + Caruaru.
- [ ] 1 H1, H2 em forma de pergunta, keyword nos 100 primeiros palavras.
- [ ] Bloco "Resposta rápida" no topo.
- [ ] FAQ com 4–6 perguntas + `FAQPage` schema.
- [ ] Schema `MedicalWebPage` + `BreadcrumbList` + autor.
- [ ] 2–3 links internos para páginas irmãs + link para home.
- [ ] Imagens WebP com alt + keyword.
- [ ] CTA WhatsApp com mensagem pré-preenchida do procedimento.
- [ ] Disclaimer de compliance no rodapé.
- [ ] Data de atualização visível.

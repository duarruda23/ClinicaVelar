# Design System — Clínica Velar

**Direção:** minimalismo premium · branco gelo, cinza e preto.
**Princípio:** o luxo vem do vazio e do contraste, não do ornamento. Referência de mood: editorial / galeria de arte. Cada tela comunica **uma ideia**. Cortar texto até doer.

Última atualização: 10/07/2026 · Virgo Marketing

---

## 1. Cores

Paleta monocromática fria. **Sem cor de destaque.** O acento é o próprio preto.

| Token | Hex | Uso |
|---|---|---|
| `--velar-black` | `#0E0E10` | Texto forte, CTA principal, seções âncora, footer |
| `--velar-ink` | `#26282B` | Títulos e texto sobre fundo claro |
| `--velar-gray` | `#8A8E93` | Texto secundário, legendas, ícones, rótulos |
| `--velar-line` | `#E2E4E6` | Bordas, divisórias, linhas finas |
| `--velar-mist` | `#EEF0F1` | Fundos de seção alternados |
| `--velar-ice` | `#F5F6F7` | Fundo base do site |
| `--velar-white` | `#FFFFFF` | Cards, hero, respiro |

**Contraste (WCAG):**
- `ink` / `black` sobre `ice`/`white` → passa AAA.
- `gray` só em texto secundário ≥ 14px (passa AA).
- CTA principal = **preto sólido + texto branco**. CTA secundário = **contorno 1px preto** sobre claro.
- Nunca usar dourado. Se um dia precisar de um único acento, use grafite `#26282B` — jamais cor saturada.

---

## 2. Tipografia

**Rota recomendada:** sans geométrica leve (clínico/moderno) — combina melhor com gelo/cinza/preto.

- **Display / títulos:** Neue Montreal, Helvetica Now Display ou **Inter** (peso 300–400).
- **Corpo / UI:** Inter / Suisse / Neue Haas (peso 400).
- **Rótulos (labels):** caixa alta, 11–12px, `letter-spacing: 0.14em–0.18em`, cor `gray`.
- Displays com `letter-spacing` levemente negativo (`-0.01em`).

*(Alternativa editorial, se quiser ar de galeria: serifada fina — Cormorant Garamond / Fraunces light — nos títulos. Escolher UMA rota, não misturar.)*

### Escala

| Nível | Desktop | Mobile | Peso |
|---|---|---|---|
| H1 (hero) | 52–64px / lh 1.02 | 32–38px | 300–400 |
| H2 (seção) | 34–40px / lh 1.08 | 24–28px | 300–400 |
| H3 (card) | 20–22px | 18–20px | 500 |
| Corpo | 16–17px / lh 1.7 | 16px | 400 |
| Label | 12px uppercase / tracking 0.14em | 11px | 600 |

---

## 3. Espaçamento e layout

- **Grid:** container máx. 1180px, centralizado. Gutter generoso.
- **Padding de seção:** 96px topo/base no desktop, 56px no mobile. Respiro é parte da marca.
- **Escala de espaçamento (8pt):** 8 · 16 · 24 · 32 · 48 · 64 · 96.
- **Mobile-first:** ponto de virada em ~768px. Grids 2/3/4 colunas → 1 coluna no mobile.
- **Fold mobile:** hero precisa converter sem rolar (headline + sub + CTA visíveis).

---

## 4. Componentes

**Botões**
- Retos ou cantos mínimos (0–4px). Padding 15×34px. Altura mínima 48px no mobile.
- Primário: fundo `black`, texto branco. Secundário: contorno 1px `ink`, fundo transparente.
- Microcopy discreta abaixo (`gray`, 12px): "Resposta em até 1h · Sem compromisso".
- Hover: troca sutil de opacidade (0.85) — nada de zoom.

**Cards**
- Sem sombra pesada. Apenas borda `1px --velar-line` ou nenhum contorno.
- Estrutura: foto + título (H3) + 1 linha de apoio (`gray`) + link "Ver" com underline fino.
- Fotos consistentes: mesma luz, tom frio/dessaturado. Nada de badge colorido.

**Trust bar**
- Números finos (peso 300), separados por linha vertical `1px line`. Discretos, não protagonistas.

**Listas (ex.: "Qual é o seu objetivo?")**
- Linhas com divisória `1px line`, nome grande à esquerda + seta `→` à direita. Zero ícone colorido.

**WhatsApp flutuante**
- Círculo preto sólido, fixo bottom-right, discreto.

**Micro-interações**
- Transições lentas e suaves (fade / translate 300–500ms). Hover revela no máximo uma linha fina. Calmo.

**Vídeo de ambiente**
- Um único vídeo, **mudo · autoplay · loop**, na seção "A Experiência Velar" (ou fundo do hero — escolher um só).
- Tratado em tom frio/dessaturado para amarrar com a paleta. Sem áudio (silêncio = calma da marca).
- Sempre com `poster`, comprimido, e respeitando `prefers-reduced-motion`. Specs técnicas em `03_Instrucoes_Build.md` §3b.

---

## 5. Tratamento de imagem

- Fotos em **tom frio / dessaturado**, luz suave — para amarrar com a paleta gelo/cinza/preto.
- Retratos da equipe idealmente em **preto e branco** (coesão + ar editorial).
- Evitar fotos saturadas, coloridas ou de banco genérico. Usar os assets reais do espaço (pasta `Assets/Espaco`) e da equipe (`Assets/Equipe`).
- Proporções sugeridas: hero 760×860, espaço 640×760, cards 460×580, retratos 460×580.

---

## 6. Tokens prontos

Os tokens estão em **`tokens.css`** (variáveis CSS) na raiz do projeto — importar direto no build. Contém também um bloco de referência para Tailwind (`theme.extend.colors`).

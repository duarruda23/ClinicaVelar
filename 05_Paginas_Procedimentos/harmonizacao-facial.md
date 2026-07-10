# Página — Harmonização Facial

> Copy + instruções de construção + SEO/AEO. Ler junto com `02_Design_System.md` (minimalista: gelo/cinza/preto) e `03_Instrucoes_Build.md`.

---

## Bloco SEO / AEO

- **URL:** `/harmonizacao-facial`
- **Title (≤60):** Harmonização Facial em Caruaru | Clínica Velar
- **Meta description (≤155):** Harmonização facial em Caruaru com resultado natural e olhar clínico. Avaliação personalizada na Clínica Velar. Agende pelo WhatsApp.
- **Keyword principal:** harmonização facial em Caruaru
- **Secundárias:** preenchimento facial, toxina botulínica (botox), ácido hialurônico, bioestimulador de colágeno, harmonização facial natural, quanto tempo dura harmonização facial
- **Intenção:** comercial + informacional (quem pesquisa quer entender e agendar)
- **Responsável técnico (autoria E-E-A-T):** Dra. Laisy Velar — harmonização facial

---

## Resposta rápida (AEO — parágrafo citável no topo)

> **Harmonização facial** é o conjunto de procedimentos estéticos — como toxina botulínica, preenchimento com ácido hialurônico e bioestimuladores de colágeno — que equilibram as proporções do rosto para realçar seus traços com naturalidade. Na Clínica Velar, em Caruaru, cada plano é individual e começa por uma avaliação do rosto como um todo. Os resultados costumam aparecer em 15 a 30 dias e duram, em média, de 6 a 24 meses conforme a técnica.

---

## Copy por seção + instrução de build

### 1. Hero
**Copy**
- Eyebrow: `HARMONIZAÇÃO FACIAL · CARUARU`
- H1: **Harmonização facial com resultado natural.**
- Sub: Realce seus traços sem perder sua identidade. Avaliação individual e olhar clínico, num espaço pensado para o seu conforto.
- CTA primário: **Agendar avaliação** · CTA secundário: **Ver como funciona**
- Microcopy: Resposta em até 1h · Sem compromisso

**Build**
- Layout `grid-2` (texto à esquerda, foto/vídeo à direita), fundo `--velar-white`. Seguir hero do wireframe.
- Foto: retrato em tom frio/dessaturado (`Assets/`). Alt: `Harmonização facial natural na Clínica Velar, Caruaru`.
- CTA WhatsApp: `https://wa.me/5581981604549?text=Ol%C3%A1!%20Quero%20agendar%20uma%20avalia%C3%A7%C3%A3o%20de%20harmoniza%C3%A7%C3%A3o%20facial`
- H1 é o único da página, contém a keyword. Deve converter no fold mobile.

### 2. O que é harmonização facial?
**Copy (H2):** O que é harmonização facial?
- A harmonização facial reúne procedimentos minimamente invasivos que equilibram as proporções do rosto — contorno, ângulos e volumes — respeitando a sua expressão. Não é "mudar de rosto": é revelar a melhor versão do que já é seu. Os principais recursos são a toxina botulínica (suaviza linhas de expressão), o preenchimento com ácido hialurônico (repõe volume e define contornos) e os bioestimuladores de colágeno (firmeza e viço progressivos).

**Build:** bloco de texto largura contida (max ~46ch por linha), fundo `--velar-ice`. Keyword no primeiro parágrafo. Sem card colorido.

### 3. Para quem é
**Copy (H2):** Para quem é indicada?
- Para quem quer suavizar linhas de expressão, redefinir o contorno do rosto, corrigir assimetrias, repor volumes perdidos com o tempo ou apenas manter um aspecto descansado e natural. A indicação exata só é definida na avaliação presencial.

**Build:** lista minimalista (linhas com divisória `1px --velar-line`), sem ícones coloridos.

### 4. Como funciona (processo)
**Copy (H2):** Como funciona na Clínica Velar?
1. **Avaliação individual** — estudo do rosto como um todo e escuta do seu objetivo.
2. **Plano personalizado** — definição das técnicas e da ordem dos procedimentos.
3. **Procedimento** — realizado com produtos certificados, em ambiente reservado.
4. **Acompanhamento** — retorno para avaliar o resultado e ajustar se necessário.

**Build:** steps numerados, tipografia leve, muito respiro. Fundo `--velar-white`.

### 5. Diferencial Velar (experiência)
**Copy (H2):** Por que fazer na Velar?
- Aqui a pressa fica do lado de fora. Recepção acolhedora, salas reservadas e um atendimento que respeita a individualidade de cada rosto — o contrário do procedimento "de esteira". Olhar clínico apurado, resultado natural e uma experiência pensada no detalhe.

**Build:** seção `--velar-black` (assinatura da marca) + vídeo de ambiente mudo/loop (ver `03_Instrucoes_Build.md` §3b).

### 6. Resultados
**Copy (H2):** Quando aparecem os resultados?
- A toxina botulínica age em 3 a 7 dias, com efeito pleno em ~15 dias. Preenchimentos têm resultado imediato, que se assenta em 15 a 30 dias. Bioestimuladores agem de forma progressiva ao longo de semanas. *Resultados variam de pessoa para pessoa.*
- Galeria antes & depois (com autorização).

**Build:** grid de antes/depois em tom frio; disclaimer discreto abaixo.

### 7. Equipe
**Copy:** Dra. Laisy Velar — especialista em harmonização facial. (foto P&B)
**Build:** card de equipe do design system, retrato de `Assets/Equipe/Dra_Laisy_Velar_harmonizacao.jpg`.

### 8. FAQ
Ver perguntas na seção Schema abaixo. **Build:** accordion acessível por teclado, fundo `--velar-ice`.

### 9. CTA final
**Copy:** H2 **Seu rosto merece um olhar individual.** Sub: Agende sua avaliação na Clínica Velar, em Caruaru. Botão: **Agendar no WhatsApp**.
**Build:** seção `--velar-black`, centralizada. Mesmo link de WhatsApp do hero.

---

## FAQ + Schema (JSON-LD)

Perguntas (linguagem de busca / AEO):
1. **Harmonização facial dói?** — O desconforto é pequeno e controlado com anestésico tópico; a maioria descreve como tranquilo.
2. **Quanto tempo dura a harmonização facial?** — Em média: botox 4–6 meses; ácido hialurônico 12–24 meses; bioestimuladores mais longos e progressivos.
3. **O resultado fica natural?** — Sim, quando o plano respeita as proporções do rosto — é exatamente o foco da Velar.
4. **Quantas sessões são necessárias?** — Depende do objetivo; muitos resultados começam em uma sessão, definido na avaliação.
5. **Tem tempo de recuperação?** — Em geral é possível retomar a rotina no mesmo dia; pode haver leve inchaço ou hematoma temporário.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {"@type":"Question","name":"Harmonização facial dói?","acceptedAnswer":{"@type":"Answer","text":"O desconforto é pequeno e controlado com anestésico tópico. A maioria dos pacientes descreve o procedimento como tranquilo."}},
    {"@type":"Question","name":"Quanto tempo dura a harmonização facial?","acceptedAnswer":{"@type":"Answer","text":"Varia pela técnica: toxina botulínica de 4 a 6 meses, preenchimento com ácido hialurônico de 12 a 24 meses e bioestimuladores com efeito mais longo e progressivo."}},
    {"@type":"Question","name":"O resultado da harmonização facial fica natural?","acceptedAnswer":{"@type":"Answer","text":"Sim. Quando o plano respeita as proporções do rosto, o resultado é natural — foco do trabalho da Clínica Velar."}},
    {"@type":"Question","name":"Quantas sessões de harmonização facial são necessárias?","acceptedAnswer":{"@type":"Answer","text":"Depende do objetivo. Muitos resultados já começam em uma sessão; o número exato é definido na avaliação individual."}},
    {"@type":"Question","name":"Harmonização facial tem tempo de recuperação?","acceptedAnswer":{"@type":"Answer","text":"Na maioria dos casos é possível retomar a rotina no mesmo dia. Pode ocorrer leve inchaço ou hematoma temporário."}}
  ]
}
```

Schema adicional da página:
```json
{
  "@context":"https://schema.org",
  "@type":"MedicalWebPage",
  "name":"Harmonização Facial em Caruaru — Clínica Velar",
  "about":{"@type":"MedicalProcedure","name":"Harmonização Facial"},
  "author":{"@type":"Person","name":"Dra. Laisy Velar"},
  "dateModified":"2026-07-10",
  "url":"https://clinicavelar.com.br/harmonizacao-facial"
}
```

---

## Interligação
- Link para: `/harmonizacao-facial-masculina`, `/tratamento-de-melasma`, `/skincare-limpeza-de-pele` e home.
- Âncoras naturais: "harmonização facial masculina", "cuidados com a pele", "melasma".

## Disclaimer (rodapé)
Resultados variam de pessoa para pessoa. Conteúdo educativo, não substitui avaliação profissional presencial. Responsável técnica: Dra. Laisy Velar.

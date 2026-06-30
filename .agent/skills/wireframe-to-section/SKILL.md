---
name: wireframe-to-section
description: >
  Use this skill whenever the user wants to transform a wireframe (from Figma, paper sketch, photo, or any other format) into a real coded section or page in React/Next.js. Trigger when the user shares a wireframe image and asks to build it, mentions "codificar a section", "construir a página", "implementar o wireframe", "transformar wireframe em código", or similar. Also trigger when the user provides a component route and asks to assemble a layout. This skill drastically reduces cognitive effort in frontend development by systematically auditing the wireframe, mapping components/assets, scaffolding a mock-up, and delivering a final responsive implementation aligned with the project's design system (Tailwind + global.css tokens).
---

# Wireframe → Section / Page

Pipeline para transformar qualquer wireframe em código real, com fidelidade máxima ao layout, usando os componentes e assets já existentes no projeto.

---

## Pré-condições (checar antes de começar)

Antes de avançar qualquer etapa, confirme que você possui:

| Item | Como obter |
|------|-----------|
| Wireframe (imagem, foto, Figma screenshot, PDF) | Solicitado no **Passo 0** |
| Rota dos componentes disponíveis | Solicitado no **Passo 0** |
| Assets (imagens, ícones, vídeos) | Solicitado no **Passo 2**, se necessário |

---

## Pipeline

### Passo 0 — Coletar inputs obrigatórios

Se o wireframe **ou** a rota dos componentes não foram fornecidos, solicite ambos antes de prosseguir:

> "Para começar, preciso de dois itens:
> 1. **Wireframe** da section/página (imagem, foto, print do Figma — qualquer formato);
> 2. **Rota dos componentes** disponíveis no projeto (ex: `src/components/`)."

Não avance para o Passo 1 sem os dois.

---

### Passo 1 — Auditoria do wireframe

Objetivo: extrair tudo que será necessário para codificar antes de escrever uma linha.

#### 1a. Leitura do wireframe

Analise a imagem com os **primeiros princípios de leitura de wireframe**:

**Estrutura macro (layout)**
- Quantas colunas/linhas existem?
- Qual é o grid utilizado (1 col, 2 col, col + sidebar, etc.)?
- Existe alguma hierarquia visual clara (hero → cards → CTA)?
- Como os blocos se reorganizam em mobile? (inferir se não estiver explícito)

**Componentes identificados**
- Liste cada bloco visível: `Navbar`, `Hero`, `Card`, `Button`, `Input`, `Badge`, `Divider`, etc.
- Identifique variantes aparentes: botão primário vs. secundário, card com imagem vs. sem.
- Note repetições: grids de cards, listas, itens de menu.

**Assets identificados**
- Imagens de fundo, fotos de produto, ícones personalizados, logos, vídeos.
- Marque cada asset como: **necessário** (aparece no wireframe) ou **inferido** (provável mas não visível).

**Conteúdo (copy)**
- Se houver texto no wireframe, extraia e liste.
- Se não houver, marque como "copy a definir" e ignore nos próximos passos.

**Espaçamento e ritmo visual**
- Estime os gaps entre blocos: pequeno / médio / grande (mapeie para tokens Tailwind: `gap-4`, `gap-8`, `gap-16`, etc.).
- Identifique padding de seções (ex: `py-16`, `px-6`).

#### 1b. Inventário de componentes

Leia a rota de componentes fornecida:

```bash
# Liste os componentes disponíveis
find <rota_componentes> -name "*.tsx" -o -name "*.jsx" | sort
```

Para cada componente identificado no wireframe, confirme:
- ✅ Existe na rota → anote o import path exato.
- ⚠️ Existe com nome parecido → mencione e confirme com o usuário.
- ❌ Não existe → **não crie um novo componente neste momento**; sinalize ao usuário antes de prosseguir.

#### 1c. Resumo da auditoria

Apresente ao usuário um resumo estruturado:

```
## Auditoria do Wireframe

### Layout
- Estrutura: [descreva]
- Grid: [descreva]
- Breakpoints inferidos: [descreva]

### Componentes mapeados
- [ComponenteX] → `src/components/...`
- [ComponenteY] → `src/components/...`
- [ComponenteZ] → ⚠️ não encontrado — confirmar

### Assets necessários
- [asset1]: imagem de fundo da hero
- [asset2]: logo do cliente
- (nenhum) se não houver

### Copy
- [texto identificado] ou "a definir"

### Espaçamentos estimados
- Section padding: py-20
- Gap entre cards: gap-6
```

Aguarde confirmação ou correção do usuário antes de avançar.

---

### Passo 2 — Coletar assets (condicional)

**Execute apenas se houver assets identificados na auditoria.**

Para cada asset necessário, pergunte explicitamente:

> "Identifiquei os seguintes assets no wireframe:
> - `hero-background.jpg` — imagem de fundo da seção hero
> - `logo-cliente.svg` — logo no header
>
> Onde estão esses arquivos no projeto? (ex: `public/images/`, `src/assets/`)"

#### Boas práticas de carregamento de assets (aplicar automaticamente)

| Tipo | Prática |
|------|---------|
| Imagens Next.js | Usar `<Image>` do `next/image` com `priority` para above-the-fold |
| Imagens React puro | `<img loading="eager">` para hero; `loading="lazy"` para abaixo do fold |
| SVG | Import direto como componente (`import Logo from './logo.svg'`) ou `<img>` |
| Vídeo | `<video autoPlay muted loop playsInline>` com `preload="metadata"` |
| Fontes | Garantir que já estão no `global.css` / `layout.tsx` — não adicionar novas |

---

### Passo 3 — Mock-up estrutural (scaffold)

Objetivo: validar o layout e a organização dos componentes **antes** de adicionar detalhes.

#### 3a. Construir o scaffold

Crie a section/página com:
- Estrutura HTML/JSX fiel ao wireframe (grid, flex, ordem dos blocos).
- Componentes importados corretamente, mas com **props mínimas** (só o suficiente para renderizar).
- Assets substituídos por placeholders (`bg-muted`, `aspect-video`, dimensões fixas) se ainda não confirmados.
- Tokens de espaçamento estimados na auditoria aplicados.
- **Sem estilização detalhada** — foco 100% na estrutura.

```tsx
// Exemplo de scaffold
export default function HeroSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-12 items-center">
        {/* Coluna esquerda — copy */}
        <div className="flex flex-col gap-6">
          <Badge />
          <Heading />
          <Paragraph />
          <Button />
        </div>
        {/* Coluna direita — imagem */}
        <div className="aspect-video bg-muted rounded-xl" />
      </div>
    </section>
  )
}
```

#### 3b. Verificação estrutural

Após criar, faça um checklist contra o wireframe:

- [ ] Número de colunas/linhas correto?
- [ ] Ordem dos blocos (top → bottom, left → right) fiel ao wireframe?
- [ ] Hierarquia visual preservada?
- [ ] Espaçamentos macro condizentes?
- [ ] Componentes no lugar certo?

Se houver divergências, corrija antes de avançar.

Apresente o scaffold ao usuário com o checklist preenchido e peça validação:

> "Aqui está o mock-up estrutural. O layout e a ordem dos componentes estão de acordo com o wireframe? Posso avançar para a versão final?"

---

### Passo 4 — Implementação final

Somente após validação do Passo 3.

#### 4a. Compor a versão final

Substitua os placeholders pela implementação real:

**Componentes**
- Passe todas as props necessárias conforme a API de cada componente.
- Use as variantes corretas (ex: `<Button variant="primary">`, `<Card size="lg">`).
- Não invente props que não existem — consulte o arquivo do componente se necessário.

**Assets**
- Substitua placeholders pelos assets confirmados no Passo 2.
- Aplique as boas práticas de carregamento definidas.

**Copy**
- Se foi fornecido no wireframe: use exatamente.
- Se não foi fornecido: use placeholder semântico (`"Título da seção"`, `"Descrição do produto"`).

**Espaçamento e tipografia**
- Use exclusivamente tokens do design system (classes Tailwind configuradas no `global.css`).
- Não use valores arbitrários (`w-[347px]`) salvo necessidade absoluta e justificada.
- Verifique se as classes usadas existem no projeto (não inventar tokens).

#### 4b. Verificação final — checklist de qualidade

```
## Checklist — Versão Final

### Fidelidade ao wireframe
- [ ] Layout macro idêntico ao wireframe
- [ ] Todos os componentes identificados estão presentes
- [ ] Assets estão no lugar correto

### Design system
- [ ] Apenas tokens/classes do design system foram usados
- [ ] Nenhuma cor hardcoded (hex, rgb) fora dos tokens
- [ ] Variantes dos componentes corretas

### Assets
- [ ] Todos os assets são carregados com a estratégia correta
- [ ] Nenhum asset quebrado ou placeholder restante

### Copy
- [ ] Copy congruente com o wireframe (ou placeholders semânticos)

### Responsividade
- [ ] Mobile (< 768px): layout colapsa corretamente
- [ ] Tablet (768–1024px): sem overflow ou quebras visuais
- [ ] Desktop (> 1024px): fiel ao wireframe original
- [ ] Nenhum elemento com largura fixa que quebre em mobile
```

Apresente o código final com o checklist preenchido.

---

## Regras gerais

1. **Nunca criar componentes novos** sem sinalizar ao usuário — use apenas o que existe na rota fornecida.
2. **Nunca avançar uma etapa** sem completar a verificação da etapa anterior.
3. **Nunca usar valores arbitrários** de Tailwind se existir um token equivalente no design system.
4. **Sempre perguntar sobre assets** antes de usar caminhos de arquivo — nunca assumir onde estão.
5. **Em caso de ambiguidade** no wireframe (ex: componente não identificável), sinalize e proponha a interpretação mais provável antes de codificar.

---

## Referência rápida — Leitura de wireframes por formato

| Formato | O que observar |
|---------|---------------|
| **Papel / foto** | Foque nas divisões de área, não nos detalhes. Linhas = divisores, caixas = componentes, garatujas = imagens. |
| **Figma (low-fi)** | Use os frames como guia de grid. Ignore cores/fontes — foque em tamanho relativo e posição. |
| **Figma (high-fi)** | Extraia também variantes de componentes e espaçamentos exatos se visíveis. |
| **Print/screenshot** | Trate como Figma low-fi. Ignore pixelagem — foque em estrutura. |
| **PDF** | Rasterize mentalmente cada página como uma section separada. |
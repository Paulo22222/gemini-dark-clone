# Gemini Dark Mirror

Crie uma réplica fiel da interface do Google Gemini em Dark Mode.

Diretrizes de Layout e Estilo (Design System Oficial):

1. Paleta de Cores:

   - Fundo da aplicação: #131314

   - Fundo do input de chat: #1E1F22 com borda #444746

   - Balão de mensagem do usuário: #282A2C com texto #F1F1F1, alinhado à direita, sem avatar

   - Mensagem do assistente: Texto direto sobre o fundo #131314 (#E3E2E6), sem balão, sem avatar, alinhado à esquerda

2. Componentes e Estrutura:

   - Header minimalista com fundo transparente contendo apenas o seletor de modelo sutil no topo esquerdo e foto do perfil no canto superior direito

   - Área central de mensagens fluida com largura máxima de 800px centralizada na tela

   - Barra de entrada flutuante no rodapé (border-radius de 28px):

     * Ícone de '+' ou clipe (📎) à esquerda para upload de imagens/arquivos

     * Placeholder: "Peça ao Gemini"

     * Seletor de modelo discreto e ícone de microfone/envio no canto direito do input

   - Respostas de código com sintaxe destacada em container escuro arredondado, botão 'Copiar' e indicador da linguagem

3. Regras Estritas:

   - ZERO avatares nas mensagens de conversa (nem do usuário, nem da IA)

   - Tipografia limpa sans-serif (Google Sans / Inter) com espaçamento de linha confortável (line-height: 1.6)

4. Exibição de Código: Respostas que contenham código (Python, Java, etc.) devem ser exibidas dentro de blocos de código estilizados em Dark Mode (estilo VS Code / JetBrains) com um botão de 'Copiar Código' no canto superior do bloco.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gemini-dark-clone.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/843aa9cc-fae0-4d4b-810a-95be9c665e79).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

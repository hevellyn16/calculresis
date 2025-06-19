# 🧮 Calculador de Resistores Eletrônicos

<p align="center">
  <a href="https://reactnative.dev/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/React_Native-0.79.x-blue?style=for-the-badge&logo=react-native&logoColor=white" alt="React Native Version">
  </a>
  <a href="https://expo.dev/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Expo-SDK_53.x-lightgrey?style=for-the-badge&logo=expo&logoColor=white" alt="Expo SDK Version">
  </a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/TypeScript-4.x-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  </a>
  <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-blue?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  </a>
</p>

## ✨ Sobre o Projeto

Este é um aplicativo móvel construído com **React Native** e **Expo** que funciona como um calculador interativo de resistores eletrônicos. Ele permite que engenheiros, estudantes e entusiastas de eletrônica determinem o valor de um resistor com base em suas faixas de cor, além de visualizar a representação das faixas selecionadas.

### 💡 Funcionalidades Principais:

* **Seleção de Faixas de Cor:** Escolha as cores para cada faixa do resistor em uma tabela intuitiva.
* **Configuração Dinâmica de Faixas:** Suporte para resistores de 4, 5 e 6 faixas, ajustando dinamicamente as opções de seleção e o display visual.
* **Display Interativo do Resistor:** Visualize as faixas de cor selecionadas em um resistor virtual no topo da tela.
* **Seleção de Faixa Ativa:** Clique diretamente nas faixas do display para indicar qual faixa você deseja configurar.
* **Feedback Visual:** As faixas ativas no display são destacadas, e as células da tabela reagem visualmente à seleção.
* **Interface Limpa e Responsiva:** Desenvolvido com **NativeWind** (Tailwind CSS para React Native) para uma estilização rápida e consistente.

## 🚀 Como Rodar o Projeto

Para executar este aplicativo em seu ambiente de desenvolvimento, siga os passos abaixo:

### Pré-requisitos:

Certifique-se de ter o Node.js, npm (ou Yarn) e o Expo CLI instalados em sua máquina.

* **Node.js & npm:** [Download](https://nodejs.org/en/download/)
* **Expo CLI:**
    ```bash
    npm install -g expo-cli
    # ou
    yarn global add expo-cli
    ```

### Instalação:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/hevellyn16/calculresis.git
    cd calculresis
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Verifique as dependências do Expo (altamente recomendado para evitar problemas de versão):**
    ```bash
    npx expo install --fix
    ```
4.  **Configure o NativeWind:**
    O NativeWind permite usar classes Tailwind CSS no React Native. Se ainda não estiver configurado, siga estes passos:
    ```bash
    npm install nativewind
    npm install -D tailwindcss
    npx tailwindcss init
    ```
    * **Importante:** Após a instalação, você precisará configurar o `tailwind.config.js` para incluir os caminhos dos seus arquivos e o `babel.config.js` conforme a documentação do NativeWind. Isso é essencial para que as classes Tailwind sejam processadas corretamente. Consulte a [documentação do NativeWind](https://www.nativewind.dev/docs/getting-started/installation) para mais detalhes sobre essa configuração inicial.

### Execução:

1.  **Inicie o servidor de desenvolvimento Expo:**
    ```bash
    npm start
    # ou
    yarn start
    ```
    Isso abrirá o Metro Bundler no seu terminal e um navegador com o Expo Dev Tools.

2.  **Abra o aplicativo:**
    * **Emulador/Simulador:** Pressione `a` (Android) no terminal para abrir no emulador/simulador.
    * **Dispositivo Físico:** Escaneie o código QR exibido no terminal ou no navegador com o aplicativo Expo Go no seu celular.

## 🛠️ Tecnologias Utilizadas

* **[React Native](https://reactnative.dev/)**: Framework para construir aplicativos móveis nativos usando React.
* **[Expo](https://expo.dev/)**: Plataforma para desenvolvimento universal de aplicativos React Native.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset do JavaScript que adiciona tipagem estática.
* **[NativeWind](https://www.nativewind.dev/)**: Utiliza Tailwind CSS para estilizar componentes React Native.
* **[Lucide React Native](https://lucide.dev/icons/)**: Biblioteca de ícones (como `ChevronLeft`, `ChevronDown`).

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

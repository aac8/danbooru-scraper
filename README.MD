# Danbooru Scraper

[English](#english) | [Português](#português)

## English

A simple script to download images from Danbooru based on tags.

### Requirements
- Node.js installed on your system
- Internet connection

### Installation
1. Clone or download this repository
2. Run `install.bat` to install all required dependencies

### How to Use
1. Run `run.bat`
2. Follow the terminal prompts:
   - Choose whether to include explicit content
   - Enter how many images to download
   - Set the cooldown time between downloads
   - Optionally configure a proxy

Images will be saved in an automatically created `images` folder.

### Available Settings
- **Explicit Content**: Option to include adult content
- **Quantity**: Number of images to download
- **Cooldown**: Wait time between downloads (in milliseconds)
- **Proxy**: Option to use a proxy (host and port)

### Project Structure
```
danbooruscraper/
├── index.js         # Main script
├── install.bat      # Dependencies installation script
├── run.bat          # Program execution script
└── images/          # Image save folder
```

## Português

Um script simples para baixar imagens do Danbooru baseado em tags.

### Requisitos
- Node.js instalado no sistema
- Conexão com a internet

### Instalação
1. Clone ou baixe este repositório
2. Execute o arquivo `install.bat` para instalar todas as dependências

### Como Usar
1. Execute o arquivo `run.bat`
2. Siga as instruções no terminal:
   - Escolha se deseja incluir conteúdo explícito
   - Digite quantas imagens deseja baixar
   - Configure o tempo de espera entre os downloads
   - Opcionalmente, configure um proxy

As imagens serão salvas na pasta `images` criada automaticamente.

### Configurações Disponíveis
- **Conteúdo Explícito**: Opção para incluir ou não conteúdo adulto
- **Quantidade**: Número de imagens para baixar
- **Cooldown**: Tempo de espera entre downloads (em milissegundos)
- **Proxy**: Opção para usar um proxy (host e porta)

### Estrutura do Projeto
```
danbooruscraper/
├── index.js         # Script principal
├── install.bat      # Script de instalação de dependências
├── run.bat          # Script para executar o programa
└── images/          # Pasta onde as imagens são salvas
```

---

## Credits | Créditos
Developed by Santos | Desenvolvido por Santos

## Legal Notice | Aviso Legal
This script is for educational purposes only. Make sure to follow Danbooru's terms of use and respect image copyrights.

Este script é apenas para fins educacionais. Certifique-se de seguir os termos de uso do Danbooru e respeitar os direitos autorais das imagens.

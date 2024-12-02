# 
<img src="https://github.com/user-attachments/assets/37ec0295-1331-4944-ac2c-fb85503723cd" alt="Banner para Site Sua Nova Sombra Roxo e Azul Moderno Delicado" style="border-radius: 200px; width: 100%; height: auto;">

## 🚀 Visão Geral

**Ecosrev** é uma plataforma web desenvolvida com o objetivo de incentivar o descarte correto de resíduos eletroeletrônicos. A aplicação conecta cidadãos a empresas especializadas em coleta de lixo eletrônico, promovendo a sustentabilidade e a conscientização ambiental. O sistema oferece recompensas para os usuários que participam do descarte responsável de seus resíduos.

Este projeto foi desenvolvido no âmbito do curso de **Laboratório de Desenvolvimento Web**, utilizando tecnologias modernas para garantir uma experiência de usuário de alta qualidade, bem como um backend eficiente e escalável.

---

## 🔧 Tecnologias Utilizadas

### **Frontend**
![Next.js](https://img.shields.io/badge/Next.js-%23000000?style=flat&logo=next.js&logoColor=white)
![React.js](https://img.shields.io/badge/React-%2320232a?style=flat&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC?style=flat&logo=typescript&logoColor=white)
![Atomic Design](https://img.shields.io/badge/Atomic_Design-%2300B4D8?style=flat&logo=html5&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-%23C21325?style=flat&logo=jest&logoColor=white)
![React Testing Library](https://img.shields.io/badge/React_Testing_Library-%23E0E0E0?style=flat&logo=react&logoColor=%23FF6138)

### **Backend**
![Express.js](https://img.shields.io/badge/Express.js-%23404d59?style=flat&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%23339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248?style=flat&logo=mongodb&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-%2385B8C8?style=flat&logo=swagger&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-%23FF6C37?style=flat&logo=postman&logoColor=white)

### **Deploy**
![Vercel](https://img.shields.io/badge/Vercel-%23000000?style=flat&logo=vercel&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-%23121011?style=flat&logo=github&logoColor=white)

---

## 💡 Funcionalidades

- **Sistema de recompensas**: Incentiva os usuários a descartarem seus resíduos corretamente em troca de benefícios.
- **Autenticação segura**: Implementação de JWT para garantir a segurança no processo de login e comunicação entre frontend e backend.
- **Testes automatizados**: O código foi testado utilizando **Jest** e **React Testing Library**, garantindo uma cobertura de testes acima de 80%.
- **API bem documentada**: A API do backend é documentada utilizando **Swagger**, oferecendo uma visão clara sobre as rotas e funcionalidades.

---

## 📦 Como Rodar o Projeto Localmente  

Para rodar o projeto em seu ambiente local, siga as instruções abaixo:  

---

## **Pré-requisitos**  
Antes de começar, certifique-se de ter o **Node.js** (versão 14 ou superior) e o **npm** (ou **yarn**) instalados em seu sistema.  
Caso não tenha, instale o Node.js através do [site oficial](https://nodejs.org/).  

---

## **Passo 1: Clone o Repositório**  
Clone o repositório para sua máquina local:  

```bash
git clone https://github.com/usuario/ecosrev.git
cd ecosrev
```

## **Passo 2: Instalar as Dependências**
Navegue até o diretório do projeto e instale as dependências tanto do frontend quanto do backend:

Frontend:
Entre na pasta do frontend e instale as dependências:

```bash
cd frontend
npm install
```

Backend:
Entre na pasta do backend e instale as dependências:


```bash
cd backend
npm install
```
## **Passo 3: Configurar as Variáveis de Ambiente**
O projeto exige algumas variáveis de ambiente para funcionar corretamente. Crie um arquivo .env no diretório raiz do projeto (se ainda não existir) e configure as seguintes variáveis:

.env
```bash
MONGODB_URI = [Conexão com o Banco de Dados]
MONGODB_DB = [Nome Banco de Dados]
EXPIRES_IN = 24h [Tempo para expiração Token]
SECRET_KEY = [Encriptação]
PORT = 4000
```
## **Passo 4: Rodar o Projeto**
Agora, você pode rodar o frontend e o backend em seu ambiente local:

Frontend
Execute o servidor de desenvolvimento do frontend:

```bash
cd frontend
npm run dev
```
O frontend estará disponível em http://localhost:4000.

Backend
Execute o servidor de desenvolvimento do backend:

```bash
cd backend
npm run dev
```
O backend estará disponível em http://localhost:4000 (ou qualquer porta configurada no .env).

📄 Documentação da API
A API do projeto está documentada e pode ser acessada pelo Swagger. Após rodar o backend, você pode acessar a documentação da API no seguinte endereço:

[Documentação API](https://ecos-rev.vercel.app/api/doc/)

A documentação fornece detalhes sobre as rotas disponíveis, parâmetros necessários, exemplos de requisições e respostas.


## 🎨 Design e Interfaces
A plataforma foi projetada com uma interface limpa e intuitiva, priorizando a experiência do usuário. O design segue a filosofia de Atomic Design, garantindo que os componentes sejam reutilizáveis e facilmente escaláveis. A paleta de cores foi escolhida para ser suave e amigável, com destaque para tons de roxo e azul, transmitindo modernidade e confiança.

## 💡 Protótipo

Acesse o protótipo interativo no Figma:  
[Protótipo no Figma](https://www.figma.com/design/9qf7Ry7BcaML25kAtYWB17/Untitled)

---

<details>
  <summary>🎬 Apresentação</summary>
  <p>
    <summary>Cadastro</summary>
    <img src="https://github.com/AEntropia/EcosRev-PI/blob/master/public/images/doc/usuario_cadastro.gif" alt="Cadastro">
  </p>
  <p>
    <summary>Login (usuário) </summary>
    <img src="https://github.com/AEntropia/EcosRev-PI/blob/master/public/images/doc/usuario_login.gif" alt="Login Usuário">
  </p>
  <p>
    <summary>Selecionar benefícios para resgate </summary>
    <img src="https://github.com/AEntropia/EcosRev-PI/blob/master/public/images/doc/usuario_trocapontos.gif" alt="Selecionar Benefícios">
  </p>
  <p>
    <summary>Perfil </summary>
    <img src="https://github.com/AEntropia/EcosRev-PI/blob/master/public/images/doc/usuario_perfil.gif" alt="Perfil">
  </p>
  <p>
    <summary>Logout </summary>
    <img src="https://github.com/AEntropia/EcosRev-PI/blob/master/public/images/doc/usuario_logout.gif" alt="Logout">
  </p>
  <p>
    <summary>Login (administrador) </summary> 
    <img src="https://github.com/AEntropia/EcosRev-PI/blob/master/public/images/doc/admin_login.gif" alt="Login Administrador">
  </p>
  <p>
    <summary>Cadastrar benefícios </summary> 
    <img src="https://github.com/AEntropia/EcosRev-PI/blob/master/public/images/doc/admin_cadastrarBeneficios.gif" alt="Cadastrar Benefícios">
  </p>
  <p>
    <summary>Editar benefícios </summary> 
    <img src="https://github.com/AEntropia/EcosRev-PI/blob/master/public/images/doc/admin_editarBeneficios.gif" alt="Editar Benefícios">
  </p>
  <p>
    <summary>Editar pontos </summary> 
    <img src="https://github.com/AEntropia/EcosRev-PI/blob/master/public/images/doc/admin_editarPontos.gif" alt="Editar Pontos">
  </p>
</details>

---
<details>
  <summary style="color: #0070f3;">🐳 Docker: O que é e Como Usar</summary>
  <p>
    No desenvolvimento do EcosRev, utilizamos o Docker para garantir que tanto o frontend quanto o backend fossem executados de maneira consistente em diferentes ambientes. 
    Com a utilização de contêineres Docker, conseguimos isolar os serviços, garantindo que as dependências necessárias para o funcionamento de cada parte da aplicação estivessem sempre presentes,   
    independentemente do ambiente em que o projeto estivesse rodando.

   Você pode baixar o material completo em um arquivo .doc com as instruções detalhadas no link abaixo:
  </p>  
  
  <a href="https://www.exemplo.com/arquivo/docker_instrucoes.doc" target="_blank">Baixar Instruções do Docker</a>
    
  <details>
    <summary>🐳 Docker: Frontend</summary>
    <p>
    Construir a Imagem do Frontend: 
     
      docker build -t ecosrev-frontend-app .
  <p> 
      Executar o Container:  

</p>
      
      docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:4000/api
  </p>
  
   Link do Frontend no Docker Hub:  
      <a href="https://hub.docker.com/r/yamaokak/ecosrev-frontend" target="_blank">Imagem Frontend Docker</a>
  </details>
  <details>
    <summary>🐳 Docker: Backend</summary>
    <p>
      Construir a Imagem do Backend:  
      
      docker build -t ecosrev-backend .
  <p>
     Executar o Container:  
  </p>
     
      docker run -p 4000:4000 --env-file .env ecosrev-backend 
  </p>
   Link do Backend no Docker Hub:  
   
  <a href="https://hub.docker.com/r/yamaokak/ecosrev-backend" target="_blank">Imagem Backend Docker</a>
  </details>
 
  <details>
    <summary>🐳 Docker: Composição (Frontend + Backend)</summary>
    <p>
      Rodar Frontend e Backend no Mesmo Container:  
      
      docker-compose up --build
      
  </p>
  </details>
</details>

## 🌐 Hospedagem do Site
Este site está hospedado na [Vercel](https://vercel.com), uma plataforma de deploy e hospedagem de aplicações web, otimizada para projetos front-end e full-stack. A Vercel oferece recursos como deploys automáticos a partir de repositórios Git, integração contínua e um desempenho de alta qualidade com uma rede de entrega de conteúdo (CDN) global.

## 📍 Acesso
Você pode acessar o site através do seguinte link: [EcosRev - PI](https://ecos-rev-pi.vercel.app)


## 🧑‍💻 Desenvolvedores

Este projeto foi desenvolvido por uma equipe de estudantes do curso de Desenvolvimento de Software Multiplataforma. Abaixo estão os nomes dos colaboradores:
| Nome | GitHub |
| ----- | ------ |
| *Gabriel Yamaoka Bernardes* | [YamaokaK](https://github.com/YamaokaK) |
| *João Lucas Melo* | [JoaoLucasMdO](https://github.com/JoaoLucasMdO) |
| *Laura Jane Antunes* | [LauraJaneAntunes](https://github.com/LauraJaneAntunes) |
| *Mariana Hirata* | [marianakakimoto](https://github.com/marianakakimoto) |
| *Mateus Ferreira* | [AEntropia](https://github.com/AEntropia) |

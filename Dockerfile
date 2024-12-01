FROM node:18-alpine AS base

WORKDIR /app

# Copiar arquivos de configuração
COPY package.json* ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Comando para iniciar em produção
CMD ["npm", "start"]
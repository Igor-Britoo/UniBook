# Use a imagem oficial do Node.js 18 como imagem base
FROM node:18

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 8001

# Defina o comando para executar a aplicação
CMD ["npm", "start"]
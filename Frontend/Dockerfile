# Use a imagem oficial do Node.js 18 para construir o projeto
FROM node:18 AS build

# Defina o diretório de trabalho no contêiner
WORKDIR /Frontend

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Construa o projeto
RUN npm run build

# Use a imagem oficial do Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Copie os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /Frontend/build /usr/share/nginx/html

# Copie a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponha a porta que o Nginx irá rodar
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
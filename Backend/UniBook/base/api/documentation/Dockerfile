FROM node:18-alpine

WORKDIR /app

RUN npm install --global serve

COPY . .

EXPOSE 5000

CMD ["npx", "serve", "-l", "5000"]
# Use a imagem oficial do Python 3.10
FROM python:3.10

# Defina o diretório de trabalho no contêiner
WORKDIR /Backend

# Copie o arquivo de requisitos para o diretório de trabalho
COPY requirements.txt .

# Instale as dependências do projeto
RUN pip install --no-cache-dir -r requirements.txt

# Copie todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que o aplicativo irá rodar
EXPOSE 8000

# Comando para migrar o banco de dados, carregar os dados e iniciar o servidor de desenvolvimento
CMD ["sh", "-c", "cd UniBook && python3 manage.py migrate && python3 manage.py loaddata base/fixtures/*.json && python3 manage.py runserver 0.0.0.0:8000"]
# Usa uma imagem mais leve e específica para produção/desenvolvimento
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# 1. Copia apenas os arquivos de dependências primeiro (cache eficiente)
COPY package.json package-lock.json* ./

# 2. Instala as dependências de forma limpa e evita conflitos de plataforma
RUN npm install --force \
    && npm cache clean --force

# 3. Copia o restante dos arquivos (excluindo node_modules e arquivos desnecessários)
COPY . .

# 4. Expõe a porta do Next.js
EXPOSE 3000

# 5. Comando otimizado para desenvolvimento (com Prisma e tratamento de erros)
CMD ["sh", "-c", "npx prisma generate deploy && npm run dev"]
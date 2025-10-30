FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --production || true
COPY . .
RUN npm run build || true
EXPOSE 3001
CMD ["node", "dist/main.js"]

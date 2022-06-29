FROM mhart/alpine-node:16
RUN mkdir /app
WORKDIR /app
COPY package*.json /app/
COPY prisma ./prisma/
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build
COPY . /app/
EXPOSE 5000
CMD ["node", "./build/server.js"]
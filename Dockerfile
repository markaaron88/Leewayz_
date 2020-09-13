FROM node:alpine3.11

# create app directory
WORKDIR /usr/src/leewayz
WORKDIR /dist

# dependencies
COPY package*.json ./

# RUN npm install
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]

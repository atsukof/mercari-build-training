FROM node:20-alpine
WORKDIR /app

RUN addgroup -S mercari && adduser -S trainee -G mercari

COPY package.json /app
RUN npm install --no-cache-dir

COPY . /app

RUN chown -R trainee:mercari /app
USER trainee

EXPOSE 3000
CMD ["npm", "start"]

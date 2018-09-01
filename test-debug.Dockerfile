FROM node:10.9.0-alpine

WORKDIR /usr/cpceed-student-app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 9229

CMD ["npx", "--node-arg=--inspect-brk=0.0.0.0:9229", "jest", "--env=jsdom"]

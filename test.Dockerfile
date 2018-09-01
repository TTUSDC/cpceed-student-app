FROM node:10.9.0-alpine

WORKDIR /usr/cpceed-student-app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD ["yarn", "test"]

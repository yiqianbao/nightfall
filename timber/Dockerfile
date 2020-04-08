# Pull in a Zokrates container so that we can pull its contents into the below container.

#FROM zokrates/zokrates:0.5.1 as builder
FROM eyblockchain/timber:v1.3.0 as builder

FROM node:11.15
WORKDIR /app
#Copy over Zokrates files into this container
COPY --from=builder /app/ /app/
#COPY --from=builder /home/zokrates/.zokrates\* /app/stdlib
COPY ./package.json ./package-lock.json ./
COPY ./utils.js  /app/src/
COPY ./pedersenHash.so  ./
COPY ./pedersenHashCallGo.js  /app/src/
#COPY ./node_modules /app/
COPY  .npmrc /root/
RUN npm ci

EXPOSE 80
CMD npm start

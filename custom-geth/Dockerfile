FROM node:11.15

RUN mkdir /app
WORKDIR /app
COPY ./geth ./run.sh ./attach.sh ./genesis.json ./pass.txt /app/
COPY ./datadir /app/datadir

EXPOSE 8545
EXPOSE 8546
CMD ./run.sh

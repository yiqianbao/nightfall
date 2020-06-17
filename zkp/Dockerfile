# Pull in a Zokrates container so that we can pull its contents into the below container.

FROM zokrates/zokrates:0.5.1 as builder
#FROM nightfallgroth16_zkp as builder

FROM node:11.15
WORKDIR /app
#Copy over Zokrates files into this container
COPY --from=builder /home/zokrates/zokrates /app/zokrates
COPY --from=builder /home/zokrates/.zokrates\* /app/stdlib
COPY ./package.json ./package-lock.json ./
COPY ./libstdc++.so.6.0.25 /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.25
COPY ./pedersenHash.so  ./
COPY ./edwardsCompressX.zok  /app/stdlib/ecc/
COPY ./432bit.zok  /app/stdlib/hashes/pedersen/
RUN npm ci
RUN cd /usr/lib/x86_64-linux-gnu && rm -rf libstdc++.so.6  && ln -s libstdc++.so.6.0.25 libstdc++.so.6
EXPOSE 80
CMD npm start

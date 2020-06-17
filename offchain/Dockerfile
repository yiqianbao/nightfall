FROM node:11.15

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./libstdc++.so.6.0.25 /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.25
RUN cd /usr/lib/x86_64-linux-gnu && rm -rf libstdc++.so.6  && ln -s libstdc++.so.6.0.25 libstdc++.so.6
RUN npm ci

EXPOSE 80
CMD npm start

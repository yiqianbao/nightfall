# Pull in a Zokrates container so that we can pull its contents into the below container.

#FROM zokrates/zokrates:0.5.1 as builder
FROM mongo

#Copy over Zokrates files into this container
#COPY --from=builder /home/zokrates/zokrates /app/zokrates
#COPY --from=builder /home/zokrates/.zokrates\* /app/stdlib
COPY ./mongod.conf.orig /etc/mongod.conf.orig



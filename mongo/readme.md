mongo:v.1.1

//修改了mongodb的配置文件
# network interfaces
net:
  port: 27017
  bindIp: 1270.0.1
==>
# network interfaces
net:
  port: 27017
  bindIp: 0.0.0.0

  //修改原因
  //按照默认配置，容器启动后，其他容器连接mongoDB失败
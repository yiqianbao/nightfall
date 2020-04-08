eyblockchain/timber:v1.5.0

//修改了默克尔树根的hash算法
//  utils/concatenateThenHash
        ==> crypto.sha256<--->pedersenHash.pedersenHashCallGo

//   新增ffi, ref, ref-array, ref-struct的依赖
//  package.json


// 新增pedersonHash的动态链接库和js封装模块
// pedersenHash.so
// pedersenHashCallGo.js
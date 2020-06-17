#!/bin/bash

# 执行前需要确认已更新 genesis.json 的 coinbase, alloc 账户
rm -rf ./datadir/geth
rm -f ./datadir/geth.ipc
./geth --datadir ./datadir init genesis.json

# once init
exits=true

pushd datadir
for d in *
do
    if [ "$d" == "dag" ]
    then
        exits=false
    fi
done
popd

while $exits
do   
    ./geth makedag 0 ./datadir/dag
    exit
done



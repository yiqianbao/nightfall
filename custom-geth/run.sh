#!/bin/bash

./geth --datadir ./datadir --verbosity 3 \
    --unlock 0x4c34Ac28a0707cF3289e288126452Fcb5A03830e --password ./pass.txt --allow-insecure-unlock \
    --rpc --rpcaddr 0.0.0.0 --rpcvhosts "*" --rpccorsdomain "*" --rpcport 8545 --rpcapi eth,web3,admin,personal,net --allow-insecure-unlock \
    --ws --wsaddr 0.0.0.0 --wsorigins "*" --wsport 8546 --wsapi eth,web3,admin,personal,net --networkid 999 \
    --nodiscover --mine

# --verbosity 5 --vmdebug 

#!/bin/bash

# geth --datadir ./datadir account new
# 执行前需要先生成账户并将账户地址填入 genesis.json
geth --datadir ./datadir init genesis.json

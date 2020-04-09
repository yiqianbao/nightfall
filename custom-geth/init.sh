#!/bin/bash

# geth --datadir ./datadir account new
# 执行前需要确认已更新 genesis.json 的 coinbase, alloc 账户
rm -fr ./datadir/geth
geth --datadir ./datadir init genesis.json

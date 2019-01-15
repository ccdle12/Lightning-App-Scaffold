#!/bin/bash

lncli --rpcserver=localhost:10003 --tlscertpath=./tls.cert --macaroonpath=./data/chain/bitcoin/simnet/admin.macaroon $@

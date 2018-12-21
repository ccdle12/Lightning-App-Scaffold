#!/bin/bash

lncli --rpcserver=localhost:10002 --tlscertpath=./tls.cert --macaroonpath=./data/chain/bitcoin/simnet/admin.macaroon $@

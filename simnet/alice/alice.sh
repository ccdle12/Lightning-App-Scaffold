#!/bin/bash

# Alices cli.
lncli --rpcserver=localhost:10009 --tlscertpath=./tls.cert --macaroonpath=./data/chain/bitcoin/simnet/admin.macaroon $@

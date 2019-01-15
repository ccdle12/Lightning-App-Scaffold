#!/bin/bash

lnd --rpclisten=localhost:10003 --listen=localhost:10013 --datadir=./data --tlscertpath=./tls.cert --tlskeypath=./tls.key  --restlisten=localhost:8003 --alias=bob --debuglevel=debug --externalip=localhost:10013 --tlsextraip=0.0.0.0 --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=kek --btcd.rpcpass=kek

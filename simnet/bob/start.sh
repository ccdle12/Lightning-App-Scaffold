#!/bin/bash

lnd --rpclisten=localhost:10002 --listen=localhost:10012 --datadir=./data --tlscertpath=./tls.cert --tlskeypath=./tls.key  --restlisten=localhost:8002 --alias=bob --debuglevel=debug --externalip=localhost:10012 --tlsextraip=0.0.0.0 --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=kek --btcd.rpcpass=kek

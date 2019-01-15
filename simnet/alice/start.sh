#!/bin/bash

# Start alices node.
# NOTE: (ccdle12) testing the autopilot feature.
lnd --autopilot.active --autopilot.maxchannels=20 --autopilot.allocation=0.6 --rpclisten=127.0.0.1:10008 --rpclisten=0.0.0.0:10009 --datadir=./data --tlscertpath=./tls.cert --tlskeypath=./tls.key --listen=0.0.0.0:10011 --restlisten=localhost:8001 --debuglevel=debug --externalip=localhost:10011 --tlsextraip=0.0.0.0 --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=kek --btcd.rpcpass=kek

#!/bin/bash

# Add a btcd.conf file in .btcd.
mkdir /root/.btcd
touch /root/.btcd/btcd.conf

# Run BTCD simnet in the background.
btcd --txindex --simnet --rpcuser=kek --rpcpass=kek debuglevel=debug &

# Keep the container open.
tail -f /dev/null

#!/bin/bash

# Run BTCD simnet in the background.
btcd --txindex --simnet --rpcuser=kek --rpcpass=kek debuglevel=debug &

# Keep the container open.
tail -f /dev/null

#!/bin/bash

# Reset the simnet.
cd /simnet

# Remove all files in Alice.
rm -rf /simnet/alice/tls.cert
rm -rf /simnet/alice/tls.key
rm -rf /simnet/alice/data

# Remove all files in Bob.
rm -rf /simnet/bob/tls.cert
rm -rf /simnet/bob/tls.key
rm -rf /simnet/bob/data

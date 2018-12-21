# Lightning App

# Setup
### Update .env
Rename .example.env to .env

Simnet is already set but you will need to update for testnet.

### Add GRPC files
Add macaroon and tls files to `/app/src/grpc` to enable encrypted and authenticated
communication with the LND node.

Either in `/testnet` or `mainnet`.

### Run
### Simnet
```
$ make dev
```

### Setting up the simnet

At the momnet setting up the nodes should be done in multiple windows.
```
$ make attach-simnet
```

Setup Alice
```
$ cd ./alice && ./start.sh
```

Create or Unlock Alice
```
$ cd ./alice && ./alice.sh create
```

Create an address for Alice
```
$ ./alice.sh newaddress np2wkh
response: rY6h4U955SoNDbqP3CVvmav78Pgspmtkdw
```

Add alices address as the mining address
```
$ cd ./scripts && ./btcd.sh stop
$ cd ./scripts && ./btcd.sh --miningaddr=rY6h4U955SoNDbqP3CVvmav78Pgspmtkdw
```

Mine x number of blocks
```
$ cd ./scripts && ./btc.sh generate 100
```

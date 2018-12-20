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


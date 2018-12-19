# Function to start alices node.
start() {
    lnd --rpclisten=localhost:10002 --listen=localhost:10012 --datadir=./data --tlscertpath=./tls.cert --tlskeypath=./tls.key  --restlisten=localhost:8002 --alias=bob --debuglevel=debug --externalip=localhost:10012 --tlsextraip=0.0.0.0 --bitcoin.simnet --bitcoin.active --bitcoin.node=btcd --btcd.rpcuser=kek --btcd.rpcpass=kek

}

# Command line function for alices LND Node.
cli() {
    lncli --rpcserver=localhost:10002 --tlscertpath=./tls.cert --macaroonpath=./data/chain/bitcoin/simnet/admin.macaroon $@
}

cmd="$1"
shift
eval "$cmd $@"

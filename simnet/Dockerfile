FROM golang:latest

# Install dependenices.
RUN apt update \
    && apt-get install net-tools make git gcc autoconf build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 -y

# Set Working Directory to Go folder.
WORKDIR /root/go/src/github.com/lightningnetwork

# Clone the LND project.
RUN git clone https://github.com/lightningnetwork/lnd

# Set Working Directory to LND.
WORKDIR ./lnd

# Install LND.
RUN make \ 
    && make install

# Download and Install BTCD.
WORKDIR /root/go/src/github.com
RUN git clone https://github.com/btcsuite/btcd.git

# Install btcd.
WORKDIR /root/go/src/github.com/btcd
RUN go install . ./cmd/...

# Set the entry workdir to simnet.
WORKDIR /simnet

# Expose ports for Bitcoin and LND.
EXPOSE 8332 8333 10009 8080 9735

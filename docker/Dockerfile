FROM ubuntu:18.04

# Install necessary tools
RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 libdb++-dev -y

WORKDIR /src/bitcoin
COPY ./bitcoin .

# Compile bitcoin core & its dependencies
RUN ./autogen.sh

WORKDIR /src/bitcoin/depends
RUN make HOST=x86_64-pc-linux-gnu NO_QT=1 NO_UPNP=1 -j4
WORKDIR /src/bitcoin/depends

RUN ./configure CXXFLAGS="-O2" --with-incompatible-bdb --without-gui --disable-tests --disable-bench --prefix=`pwd`/depends/x86_64-pc-linux-gnu
RUN make -j4
RUN make install -j4

# Copy own config files
COPY bitcoin.conf /root/.bitcoin/bitcoin.conf

# Start the daemon
ENTRYPOINT ["./src/bitcoind"]

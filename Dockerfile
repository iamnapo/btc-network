FROM ubuntu:18.04

RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 libdb++-dev -y

COPY bitcoin.conf /root/.bitcoin/bitcoin.conf

WORKDIR /src/bitcoin
COPY ./bitcoin .

RUN ./autogen.sh

WORKDIR /src/bitcoin/depends
RUN make HOST=x86_64-pc-linux-gnu NO_QT=1 -j4
WORKDIR /src/bitcoin

RUN ./configure CXXFLAGS="-O2" --with-incompatible-bdb --without-gui --disable-tests --disable-bench --prefix=`pwd`/depends/x86_64-pc-linux-gnu
RUN make -j4
RUN make install -j4

# rpc
EXPOSE 18444/tcp
# p2p
EXPOSE 18443/tcp

ENTRYPOINT ["./src/bitcoind"]

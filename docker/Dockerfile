FROM ubuntu:18.04

LABEL maintainer "Napoleon-Christos Oikonomou <napoleonoikon@gmail.com>"

# Install necessary tools
RUN apt-get update
RUN apt-get install curl -y
RUN apt-get install build-essential libtool autotools-dev automake pkg-config bsdmainutils python3 libdb++-dev -y
RUN apt-get install ccache -y

WORKDIR /src/bitcoin
COPY ./bitcoin .

# Compile bitcoin core & its dependencies
RUN /usr/sbin/update-ccache-symlinks
RUN ./autogen.sh

WORKDIR /src/bitcoin/depends
RUN make HOST=x86_64-pc-linux-gnu NO_QT=1 NO_UPNP=1 -j"$(($(nproc)+1))"
WORKDIR /src/bitcoin

RUN ./configure CXXFLAGS="-O2" --with-incompatible-bdb --without-gui --disable-tests --disable-bench --prefix=`pwd`/depends/x86_64-pc-linux-gnu
RUN make -j"$(($(nproc)+1))"
RUN make install -j"$(($(nproc)+1))"

# Copy own config files
COPY bitcoin.conf /root/.bitcoin/bitcoin.conf

# Add trickle to limit bandwidth
RUN apt-get install trickle -y

# Start the daemon
ENTRYPOINT ["trickle", "-s", "-d", "63", "-u", "63", "./src/bitcoind"]

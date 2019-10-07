FROM ubuntu:18.04

RUN apt-get update
RUN apt-get -y install curl

RUN curl -OL https://bitcoincore.org/bin/bitcoin-core-0.18.1/bitcoin-0.18.1-x86_64-linux-gnu.tar.gz
RUN tar zxvf bitcoin-0.18.1-x86_64-linux-gnu.tar.gz

RUN ln -s /bitcoin-0.18.1/bin/bitcoin-cli /bitcoin-cli
RUN ln -s /bitcoin-0.18.1/bin/bitcoind /bitcoind

COPY bitcoin.conf /root/.bitcoin/bitcoin.conf

# rpc
EXPOSE 18444/tcp
# p2p
EXPOSE 18443/tcp

ENTRYPOINT ["/bitcoin-0.18.1/bin/bitcoind"]

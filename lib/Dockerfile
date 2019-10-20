FROM iamnapo/btc-network:latest

WORKDIR /src/bitcoin
COPY ./consensus.h ./src/consensus/consensus.h
COPY ./chainparams.cpp ./src/chainparams.cpp

RUN make -j"$(($(nproc)+1))"
RUN make install -j"$(($(nproc)+1))"

# Start the daemon
ENTRYPOINT ["./src/bitcoind"]

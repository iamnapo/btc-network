# Bitcoin regtest network with multiple nodes, using docker

![DockerHub](https://img.shields.io/microbadger/image-size/iamnapo/btc-network/latest?logo=docker&logoColor=white&style=for-the-badge&label=)

## Usage

Simply run `docker-compose up -d` to start all the containers. This will start the bitcoin nodes,
 and expose RPC on all of them. The nodes will run on the following ports:

| Node | P2P port * | RPC port * | RPC Username | RPC Password |
| --- | --- | --- | --- | ---|
| node1 | 18501 | 18401 | btc | btc |
| node2 | 18502 | 18402 | btc | btc |
| node3 | 18503 | 18403 | btc | btc |
| node4 | 18504 | 18404 | btc | btc |

\* Port as exposed on the host running docker.

All nodes with also try to connect to a 5th node running natively on the host.

## Samples

Note these samples use `curl` to exercise the API, but this would usually be `bitcoin-cli`. We're using `curl` so we don't have a dependency on bitcoin in the host.

> Note: After all the below block mining & txs, every node Received ~92KB and Sent ~48KB

```bash
# check block count
curl -d '{"jsonrpc":"2.0","id":"1","method":"getblockcount"}' -u btc:btc host.docker.internal:18443

# check peers
curl -d '{"jsonrpc":"2.0","id":"1","method":"getpeerinfo"}' -u btc:btc localhost:18403

# get an address
curl -u btc:btc -d '{"jsonrpc":"2.0","id":"1","method":"getnewaddress"}' localhost:18403

# mine the blocks
curl -u btc:btc -d '{"jsonrpc":"2.0","id":"1","method":"generatetoaddress", "params":[101,"2N7HPAz4Je6PpwmRupeiqoC2fZx8WaMrq3g"]}' localhost:18403

# check on node1
curl -u btc:btc -d '{"jsonrpc":"2.0","id":"1","method":"getblockcount"}' localhost:18401

# check on node2
curl -u btc:btc -d '{"jsonrpc":"2.0","id":"1","method":"getblockcount"}' localhost:18402

# check balance
curl -u btc:btc -d '{"jsonrpc":"2.0","id":"1","method":"getbalance"}' localhost:18403

# generate address on node1
curl -u btc:btc -d '{"jsonrpc":"2.0","id":"1","method":"getnewaddress"}' localhost:18401

# send from node3 to node1
curl -d '{"jsonrpc":"2.0","id":"1","method":"sendtoaddress","params":["2N8i4K4viPFjfVY1GwenH8rhzTbM4wjt7Ax", "3.14"]}' -u btc:btc -s localhost:18403

# now, since the block was not yet mined, we usually don't see the balance yet, unless  we specify 0 confirmations.
curl -d '{"jsonrpc":"2.0","id":"1","method":"getbalance","params":[]}' -u btc:btc -s localhost:18401

# this also means that node1 has it in the mempool, which shows there is exactly one transaction in it
curl -d '{"jsonrpc":"2.0","id":"1","method":"getmempoolentry", "params": ["03e1d6811883ea6d08dcd46d8d1124ba03d577356327806427f592ee7c947952"]}' -u btc:btc -s localhost:18401

# finally, let's mine the block and see that getbalance will show the balance by default.
curl -u btc:btc -d '{"jsonrpc":"2.0","id":"1","method":"generatetoaddress", "params":[1,"2MvNDJ1e6m5GVq4VXiERaC6F1fiEPVhQjta"]}' localhost:18403

# node3:
curl -d '{"jsonrpc":"2.0","id":"1","method":"getbalance","params":["*", 0]}' -u btc:btc -s localhost:18403

# node1
curl -d '{"jsonrpc":"2.0","id":"1","method":"getbalance","params":[]}' -u btc:btc -s localhost:18401

# list wallet affecting transactions:
# node3
curl -d '{"jsonrpc":"2.0","id":"1","method":"listtransactions","params":["*", 150]}' -u btc:btc -s localhost:18403

# node1
curl -d '{"jsonrpc":"2.0","id":"1","method":"listtransactions","params":["*"]}' -u btc:btc -s localhost:18401

# node2 (can't see it, because it doesn't know to keep track of if, because it's between node1 & node3)
curl -d '{"jsonrpc":"2.0","id":"1","method":"listtransactions","params":["*"]}' -u btc:btc -s localhost:18402

# Try getting the transaction
# node1:
curl -d '{"jsonrpc":"2.0","id":"1","method":"gettransaction","params":["03e1d6811883ea6d08dcd46d8d1124ba03d577356327806427f592ee7c947952"]}' -u btc:btc -s localhost:18401

# node2, here it fails because that transaction is not in the wallet.
curl -d '{"jsonrpc":"2.0","id":"1","method":"gettransaction","params":["03e1d6811883ea6d08dcd46d8d1124ba03d577356327806427f592ee7c947952"]}' -u btc:btc -s localhost:18402

# however, using `getrawtransaction` on node2 does actually return it!!
curl -d '{"jsonrpc":"2.0","id":"1","method":"getrawtransaction","params":["03e1d6811883ea6d08dcd46d8d1124ba03d577356327806427f592ee7c947952", true, "7eb753569690e70437a9a4d6c1ab26155f98ab9a111e359b9025c73424648485"]}' -u btc:btc -s localhost:18402
```

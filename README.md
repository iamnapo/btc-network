# btc-network

> Tiny module that creates a btc network using docker images

[![dockerhub](https://img.shields.io/badge/-iamnapo/btc--network-1388c6?logo=docker&logoColor=white&style=for-the-badge&label=)](https://cloud.docker.com/repository/docker/iamnapo/btc-network) [![license](https://img.shields.io/github/license/iamnapo/btc-network.svg?style=for-the-badge)](./LICENSE)

## Install

```sh
$ npm i -g iamnapo/btc-network
```

## Usage

```bash
$ btc-network <nodes.json> <out-dir>
```

* `<nodes.json>` file should follow the structure of [`nodes.example.json`](./nodes.example.json)
* `<out-dir>` is the output directory, which default to `./compose_files`.

> This will create a set of folders with names `btc-node-<number>` which you will then need to copy to each ip-corresponding machine and run `docker-compose up` to start the network. (Automating this is WIP).

## License

MIT © [Napoleon-Christos Oikonomou](https://iamnapo.me)

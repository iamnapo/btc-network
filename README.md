# btc-network

> Tiny module that creates a btc network using docker images

[![dockerhub](https://img.shields.io/badge/-iamnapo/btc--network-1388c6?logo=docker&logoColor=white&style=for-the-badge&label=)](https://cloud.docker.com/repository/docker/iamnapo/btc-network)
[![npm](https://img.shields.io/npm/v/@iamnapo/btc-network.svg?style=for-the-badge&logo=npm&label=)](https://www.npmjs.com/package/@iamnapo/btc-network)
[![license](https://img.shields.io/github/license/iamnapo/btc-network.svg?style=for-the-badge)](./LICENSE)

## Install

```sh
$ npm i -g @iamnapo/btc-network
```

## Usage

**WARNING:** The input file must follow the structure of [`nodes.example.json`](./nodes.example.json).

> Note: If you want to change consensus rules, start the CLI with `btc-network -c <config.json>`, where the config file follows the structure of [`config.example.json`](./config.example.json). Check [`config.js`](./lib/config.js) for available options.

![Usage](./usage.gif)

## License

MIT © [Napoleon-Christos Oikonomou](https://iamnapo.me)

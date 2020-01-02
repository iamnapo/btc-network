# Block Arrival Time (Using a network with 4 full nodes)

> Note: I used [`trickle`](https://linux.die.net/man/1/trickle) to throttle bandwidth.

| metric | no throttling |   63KB/s up/down   |     5KB/s up/down     |     1KB/s up/down     |
| :----- | :-----------: | :----------------: | :-------------------: | :-------------------: |
| min    |     1 ms      |   1 ms (+**0%**)   |    1 ms (+**0%**)     |    1 ms (+**0%**)     |
| max    |    17.76 s    | 21.33 s (+**20%**) | 3.77 min (+**1174%**) | 20.3 min (+**6758%**) |
| mean   |    1.27 s     |  1.34 s (+**5%**)  |  13.14 s (+**935%**)  | 1.3 min (+**6042%**)  |
| median |     59 ms     |  71 ms (+**20%**)  |  3.97 s (+**6629%**)  | 53.6 s (+**90748%**)  |
| std    |    2.86 s     |  3.09 s (+**8%**)  |  27.13 s (+**849%**)  |  4 min (+**8292%**)   |

![no throttling](./no_throttle.png)
![5KBs throttle](./5KBs_throttle.png)
![1KBs throttle](./1KBs_throttle.png)

> Data used available [here](./block-dbs.zip).

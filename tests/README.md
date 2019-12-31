# Block Arrival Time (Using a network with 4 full nodes)

> Note: I used [`trickle`](https://linux.die.net/man/1/trickle) to throttle bandwidth.

| metric | no throttling |   63KB/s up/down   |   5KB/s up/down    |     1KB/s up/down     |
| :----- | :-----------: | :----------------: | :----------------: | :-------------------: |
| min    |       -       |         -          |         -          |           -           |
| max    |    17.76 s    | 21.33 s (+**20%**) |  53 s (+**198%**)  | 20.3 min (+**6758%**) |
| mean   |    1.27 s     |  1.34 s (+**5%**)  | 5.3 s (+**317%**)  | 5.6 min (+**26357%**) |
| median |     59 ms     |  71 ms (+**20%**)  | 197 ms (+**234%**) | 53.6 s (+**90747%**)  |
| std    |    2.86 s     |  3.09 s (+**8%**)  | 11.8 s (+**312%**) |  7 min (+**14585%**)  |

![no throttling](./no_throttle.png)
![5KBs throttle](./5KBs_throttle.png)
![1KBs throttle](./1KBs_throttle.png)

> Data used available [here](./block-dbs.zip).

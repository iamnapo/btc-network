# Block Arrival Time (Using a network with 4 full nodes)

> Note: I used [`trickle`](https://linux.die.net/man/1/trickle) to throttle bandwidth.

| metric | no throttling |   63KB/s up/down   |     5KB/s up/down     |
| :----- | :-----------: | :----------------: | :-------------------: |
| min    |     1 ms      |   1 ms (+**0%**)   |    1 ms (+**0%**)     |
| max    |    17.76 s    | 21.33 s (+**20%**) | 3.77 min (+**1174%**) |
| mean   |    1.27 s     |  1.34 s (+**5%**)  |  13.14 s (+**935%**)  |
| median |     59 ms     |  71 ms (+**20%**)  |  3.97 s (+**6629%**)  |
| std    |    2.86 s     |  3.09 s (+**8%**)  |  27.13 s (+**849%**)  |

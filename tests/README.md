# Initial State (block 505)

node_1: Address: `2N7eLivAYENZP4ap6bFyKG1oYyJcN5dzG64` Balance: 5050
node_2: Address: `2MtaWEQv96FS5Mw2x9sArSDyW1jfmwSs3a4` Balance: 3750
node_3: Address: `2N7ozwfUzfYPZbQFDxSCyvKrjRBMBBTveEB` Balance: 2462.5
node_4: Address: `2N8789Pw9ovK5UXWxGwxgtZGZxM43B4zmLJ` Balance: 1262.5

## Block Arrival Time

> Note: I used [`trickle`](https://linux.die.net/man/1/trickle) to throttle bandwidth.

| metric | no throttle |      5KB/s up/down |         1KB/s up/down |
| :----- | :---------: | -----------------: | --------------------: |
| min    |    0 ms     |                  0 |                     0 |
| max    |    27 s     |    53 s (+**96%**) | 20.3 min (+**4411%**) |
| mean   |   1.46 s    |  5.3 s (+**263%**) | 5.6 min (+**22914%**) |
| median |    81 ms    | 197 ms (+**143%**) |  53.6 s (+**66073%**) |
| std    |    3.9 s    | 11.8 s (+**203%**) |   7 min (+**10670%**) |

![no throttling](./no_throttle.png)
![5KBs throttle](./5KBs_throttle.png)
![1KBs throttle](./1KBs_throttle.png)

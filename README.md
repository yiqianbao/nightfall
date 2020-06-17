## Nightfall

[Nightfall](https://github.com/EYBlockchain/nightfall "Nightfall") integrates a set of smart contracts and microservices, and the ZoKrates zk-snark toolkit, to enable standard ERC-20 and ERC-721 tokens to be transacted on the Ethereum blockchain with complete privacy. The privacy module is implemented based on the [Zokrates](https://github.com/Zokrates/ZoKrates "Zokrates") library which has implemented the PGHR13, Groth16 and GM17 three kinds of zero knowledge proof algorithm.And the GM17 algorithm is used in Nightfall.
We once ran Nightfall on a virtual machine configured with 4CPU, 12GMem and 4GSWAP, and found that a simple private payment transaction took around 5m30s, which was indeed a long time, which also became a focus of our future work.Our work will be described in detail in the following chapters.

***Note: this project is an experimental research project, and it is not recommended to use it for commercial purposes. The company will not be responsible for any safety problems or economic losses caused by the use of this project!!!***

## Some Troubles

At present, GM17 algorithm has been implemented for Nightfall. We run all various kinds of transactions supported in Nightfall on a virtual machine configured with 4CPU, 12GMem and 4GSWAP. The detail results are shown in the table below:

| NFT-Mint  |  NFT-Burn | NFT-Transfer  | FT-Mint  | FT-Burn  | FT-Transfer  |  FT-BatchTransfer |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| 17s  |  2m36s | 2m40s  | 14s  | 2m28s  | 5m25s  | 6m8s  |
| 106M  |  1.1G | 1.1G  | 80M  | 1.0G  | 2.1G  | 2.3G  |

The first row represents the transaction type and the second line states the transaction execution time (Actually that is the generation time of the proof); The third action is the size of the proof for each transaction. It can be seen that:

1. Time consumption is positively correlated with the size of the proof; The bigger the proof, the longer it takes

2. The transfer operation and destruction operation take too long, which is much higher than the coinage

Such efficiency is difficult to use for payment transactions, that is the troubles. So we should find a more efficient scheme. A better zero-knowledge proof algorithm or a smaller proof size? Maybe both.

### Zkp Alg

Currently, the prevailing zero-knowledge proof algorithms belong to the ZK-Snark series, and although it requires a trust setting, it is the kind of privacy policy that suits you better than Zk-Stark and Bulletproof. After a lot of research, analysis and investigation, we have obtained the performance comparison of several commonly used zero-knowledge proof algorithms, which all belong to the ZK-SNARK series, as shown in the following table:

| Alg  |  CRS Size | Proof Size  | O(Prove)  | O(Verify)  | Equations  |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
|  PGHR13 |  6m+n-l G1,m G2 | 7 G1, 1 G2  | 6m+n-l E1,m E2  | 1 E1, 12 P  | 5  |
| Groth16  |  m+2n+3 G1, n+3 G2 | 2 G1, 1 G2  | m+3n-l+3 E1, n+1 E2  | 1 E1, 2 P  | 1  |
| GM17  | m+4n+5 G1, 2n+3 G2  | 2 G1, 1 G2  | m+4n-l E1, 2n E2  | 1 E1, 5 P  | 2  |

Where, M represents the amount of wire in the circuit; N represents the number of multi-gates; L is the number of public inputs; E stands for power multiplication; P is for pairing. 
We think the Groth16 algorithm has the absolute advantage to be used as an alternative scheme from the CRS size, the certificate of Proof size, the proof complexity, the validate complexity, validation equation number five aspects of comprehensive consideration(note: the Groth16 algorithm does not have the simulation-extractability, which may cause double_spend, but there is also a method to eliminate the hidden trouble,[like](https://zokrates.github.io/reference/proving_schemes.html "like"))

### Hash Alg

We has studied the circuit design under various types of transactions and got some useful information finally.The detail data are shown in the table below:

| NFT-Mint  |  NFT-Burn | NFT-Transfer  | FT-Mint  | FT-Burn  | FT-Transfer  |  FT-BatchTransfer |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| 114723  | 1178584  | 1208093  | 86613  | 1150474  | 2357944  | 2611408  |
|  0 |  887585 | 887585  |  0 |  887585 | 1775170  |  887585 |
|  28M | 327M  |  332M |  23M |  323M | 654M  |  694M |

The first row represents the transaction type; The second row represents the total number of constraints; The third represents the number of partial constraints of merkel-tree hash path verification; The fourth row represents the size of the proof (note: the size here is different from the first table, because the zero knowledge proof algorithm has been replaced by Groth16 algorithm here, so the size of the proof is much smaller, which also verifies the effectiveness of the replacement of zero knowledge proof algorithm in the first step).

From the table, we can see that in the verification process of various transactions (excluding mint operation), the validity verification of Merkeltree path based on SHA256 hashing algorithm takes up the majority of the whole circuit. Therefore, if effective changes can be made to the hash algorithm, the performance will be greatly improved.

After a lot of analysis and research work, we summarized the performance comparison of several hash algorithms. The detail data are shown in the table below:

|  Alg |  contrians num |
| ------------ | ------------ |
|  sha256 |  45567 |
| pedersen  | 2753  |
| mimc  |  731 |
|  poseidon |  316 |

The first column represents the hash algorithm; The second column represents the number of constraints corresponding to an operation. It can be seen that both Pedersen, MIMC, and Poseidon hash have a considerable performance improvement compared with sha256. 
However we are finally select the pedersen hash algorithm, depend on mainly the security which is most important point.Because the pedersen algorithm has been proven safe and has been used in [zcash](https://github.com/zcash/zips/blob/master/protocol/protocol.pdf "zcash"), while the safety of the mimc and the podeidon algorithm is still in doubt, but we will still try to implement it in other branches; Another point is that, compared with sha256 hash algorithm, pedersen hash has been made great ascension performance, i.e., after replacement, merkel tree path validation part number of constraints is a small percentage of the overall number of constraints, and if replace mimc or podeidon hash, may not significantly reduce the number of constraints, the performance improvement is not obvious; But this is still an alternative direction of optimization that needs to be addressed. In fact, Nightfall has achieved [mimc](https://github.com/EYBlockchain/nightfall/tree/MirandaWood/mimc "mimc") version of the branch which can get larger ascension.

## Our modifications

So far, our work has made gradual progress. Our main changes are as follows:

Nightfall:

1. Add a validation contract based on Groth16;

2. Modify the Merkel tree generation hash algorithm to pedersen hash

3. Modify the local root verification hash algorithm to be pedersen hash

4. Modify the contract invoke hash type

Geth:

1. Added pedersen hash precompiled contract type

2. Optimize the block generation mechanism

Zokrates:

1. Add pedersen hash calculation circuit

2. Optimize pedersen hash calculation method


With these changes, the current version of Nightfall has achieved significant performance improvements, as shown in the table below:

| Alg  | NFT-Mint  |  NFT-Burn | NFT-Transfer  | FT-Mint  | FT-Burn  | FT-Transfer  |  FT-BatchTransfer |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
| sha256/all contrians  | 114723  | 1178584  | 1208093  | 86613  | 1150474  | 2357944  | 2611408  |
| sha256/merkel contrians  |  0 |  887585 | 887585  |  0 |  887585 | 1775170  |  887585 |
| sha256/proof size  |  28M | 327M  |  332M |  23M |  323M | 654M  |  694M |
| pedersen/all contrians  | 114723  | 377496  | 407005  | 86613  | 349386  | 755766  | 1810320  |
| pedersen/merkel contrians  |  0 |  59503 | 59503  |  0 |  59503 | 119006  |  59503 |
| pedersen/proof size  |  28M | 100M  |  105M |  23M |  95M | 199M  |  435M |


|  zkp |  hash | NFT-Mint  |  NFT-Burn | NFT-Transfer  | FT-Mint  | FT-Burn  | FT-Transfer  |  FT-BatchTransfer |
| ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ | ------------ |
|  GM17 |  sha256 |  17s  |  2m36s | 2m40s  | 14s  | 2m28s  | 5m25s  | 6m8s|
|  Groth16 |  pedersen |  5s | 25s  | 25s  | 5s  |  24s | 49s  | 1m45s  |

## Better Peformance

Currently, a simple transaction can be completed in less than a minute, which is nearly six times better than the original transaction efficiency. If you want more efficiency, maybe you can try 1. Replace the more efficient hash; 2. Choose a machine with higher configuration. If the performance of a single core CPU is greatly improved, the overall efficiency will be higher

## Start

This project is already running successfully on ubuntu18.04 & MAC and may require a machine with at least 4 gb of memory.

1. Obtain source code

`git clone https://github.com/yiqianbao/nightfall.git`

or

`git clone git@github.com: yiqianbao/nightfall.git`

2. Unzip and enter the main directory

`cd <path/to/nightfall>`

3. Start

Executed in sequence

`./nightfall-generate-trusted-setup`

`./nightfall`

Until the console prints `Compiled successfully!`

4. Enjoy

The browser goes to http://localhost:8000 and opens the Nightfall home page. See UI.Md for instructions

## Contact Us

It would be nice if this project could help you in your current work. If you have any questions, just contact us:

1. Liwei Yuan, email: xzfkiller@gmail.com

2. Henry, enail: Imforhenry@outlook.com

3. A big mango, email: WY12351@163.com

4. Double, email: cafebabe_java@163.com

5. Ocean Chen, email: oceanjune512@163.com

## Acknowledgements

Nightfall is indeed a great project and provides a lot of references for other research projects in support of privacy on Ethereum. Here, I would like to express my sincere thanks to its development team!!!

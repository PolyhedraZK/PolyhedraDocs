# Developers

## **Quick Guide**

If you’re a developer interested in building applications on the EXPchain, this document provides all the essential information you’ll need

### Getting Started

EXPchain is a high-performance blockchain network.

Since EXPchain is EVM-compatible, your existing Ethereum contract skills will seamlessly transfer to EXPchain.

### Connecting to EXPchain Testnet

Here are some resources to help you get connected to the EXPchain network:

- [Network Information and RPC Providers](https://github.com/PolyhedraZK/chaindocs?tab=readme-ov-file#json-rpc)
- [Wallet Configuration](https://github.com/PolyhedraZK/chaindocs?tab=readme-ov-file#wallet-configuration)

### Obtain Testnet Tokens

EXP is the native utility token of EXPchain and is used to pay transaction fees.

- [EXPchain Testnet Faucet](https://expchain.ai/faucet)

- For the mainnet, you can withdraw tokens directly from a centralized exchange (CEX) that supports the EXPchain network (e.g., OKX).

### JSON-RPC API

Interacting with EXPchain requires sending requests to specific JSON-RPC API methods. EXPchain’s APIs are compatible with Geth. - [JSON-RPC API](https://github.com/PolyhedraZK/chaindocs?tab=readme-ov-file#json-rpc)

### Developer Tools

- Explorer

  - Testnet: [EXPchain Testnet Explorer](https://blockscout-testnet.expchain.ai)

- Beacon Explorer

  - Testnet: [EXPchain Testnet Beacon Explorer](https://beacon-explorer-testnet.expchain.ai)

- Bridge

  - Testnet: [EXPchain Testnet Bridge](https://expchain.ai/bridge)

- Faucet

  - [EXPchain Testnet Faucet](https://expchain.ai/faucet)

- SDK. If you are only using the SDK for Ethereum-compatible functions, then all Ethereum SDKs should work with EXPchain.

  - [ethers.js](https://docs.ethers.org/v6/getting-started/)
  - [web3.js](https://web3js.readthedocs.io/en/v1.10.0/getting-started.html)

- Wallets

  - [Metamask](https://metamask.io)
  - [Binance Web3 Wallet](https://www.binance.com)
  - [TrustWallet](https://trustwallet.com)
  - [OKX Wallet](https://www.okx.com)
  - [Bybit Wallet](https://www.bybit.com)
  - [CoinBase Wallet](https://www.coinbase.com)

- Tools

  - [Remix](https://remix.ethereum.org/)
  - [Hardhat](https://hardhat.org/)
  - [Foundry](https://github.com/foundry-rs/foundry/)

## **JSON-RPC**

JSON-RPC endpoints refers to the network location where a program could transfer its RPC requests to access server data. Once you connect a decentralized application to an RPC endpoint, you can access the functionalities of different operations, which could enable real-time usage of blockchain data. EXPchain provides several RPC endpoints for connecting into both its Mainnet and Testnet. In this section, we list the JSON-RPC endpoints that can be used for connecting to EXPchain.

### Add EXPchain with One-click

Visit the ChainList and connect to your wallet, it will add alive RPC endpoints.

### RPC Endpoints

1.  Public RPC: [https://rpc1-testnet.expchain.ai](https://rpc1-testnet.expchain.ai)
2.  Starting HTTP JSON-RPC

    You can start the HTTP JSON-RPC with the –http flag

    ```bash
    ## mainnet
    geth attach https\://xxxxx

    ## testnet
    geth attach https\://xxxxx
    ```

3.  JSON-RPC methods

    Please refer to this [wiki page](https://github.com/ethereum/execution-apis) or use Postman: [Ethereum JSON-RPC](https://documenter.getpostman.com/view/4117254/ethereum-json-rpc/RVu7CT5J?version=latest)

## **Wallet Configuration**

    Any Ethereum-compatible wallet can be used with the EXPchain. For example, the following section provides instructions on setting up MetaMask for EXPchain, which is the recommended wallet.

### Testnet: (temporary devnet info)

- Network Name: EXPchain Testnet
- RPC URL:
  - [https://rpc0-testnet.expchain.ai](https://rpc0-testnet.expchain.ai/)
  - [https://rpc1-testnet.expchain.ai](https://rpc1-testnet.expchain.ai/)
- ChainID: 18880
- Symbol: tEXP
- Explorer: [https://blockscout-testnet.expchain.ai](https://blockscout-testnet.expchain.ai)
- tendermint-sidechain: [https://tendermint-sidechain-testnet.expchain.ai](https://tendermint-sidechain-testnet.expchain.ai)
- abci-sidechain: [https://abci-sidechain-testnet.expchain.ai](https://abci-sidechain-testnet.expchain.ai)
- Multicall: 0x7406c4F36c0DCc3E3FC8cC1b1F9771DaFF3CE5d0
- WEXP: 0x46F2038afa5CDD1a8CD444DB923279ADe1208a48
- tZKJ on Sepolia: 0x465C15e9e2F3837472B0B204e955c5205270CA9E
- tZKJ on BSC Testnet: 0xbBF8F565995c3fDF890120e6AbC48c4f818b03c2

> 🌟 tEXP is the native token on the EXPchain Testnet. tZKJ is the test token of ZKJ on the Ethereum Sepolia Testnet and BNB Chain Testnet. tZKJ and tEXP have a 1:1 exchange ratio. They exist in the form of tEXP on the EXPchain Testnet and in the form of tZKJ on the Ethereum Sepolia Testnet and BNB Chain Testnet. You can convert tZKJ on the Ethereum Sepolia Testnet and BNB Chain Testnet to tEXP on the EXPchain Testnet by zkBridge.

### Reference - How to configure Metamask

After you install the metamask in your browser, you can go to settings -> networks -> add network page. Select add manual network and enter the network information.

![Configure](https://storage.googleapis.com/polyhedra-img/images/prod/Configure.png)

Depending on your location and preference, you can choose from a variety of RPC endpoints for EXPchain. For more information about the endpoints and their features, please refer to [the network information document](https://github.com/PolyhedraZK/chaindocs?tab=readme-ov-file#json-rpc) that we have prepared for you. To ensure the best performance and user experience, you can test the latency of each endpoint before you configure it with your wallet.

## **Testnet Faucet**

To get Test tokens on EXPchain Testnet, faucets are available on EXPchainTest, ETH Sepolia and BSC Testnet at [https://expchain.ai/faucet/](https://expchain.ai/faucet/)

- Select a Network: Choose from EXPchain Testnet, ETH Sepolia, or BSC Testnet.
- Input your address to claim the test token.
- 0.01 tZKJ or tEXP per 24 hours on each network.
- To apply for a significant allocation of test tokens, please submit a request to the DC administrator.

![Faucet](https://storage.googleapis.com/polyhedra-img/images/prod/Faucet.png)

> 🌟 tEXP is the native token on the EXPchain Testnet. tZKJ is the test token of ZKJ on the Ethereum Sepolia Testnet and BNB Chain Testnet. tZKJ and tEXP have a 1:1 exchange ratio. They exist in the form of tEXP on the EXPchain Testnet and in the form of tZKJ on the Ethereum Sepolia Testnet and BNB Chain Testnet. You can convert tZKJ on the Ethereum Sepolia Testnet and BNB Chain Testnet to tEXP on the EXPchain Testnet by zkBridge.

## **Bridge**

Users can transfer their ZKJ tokens from Ethereum or BNB Chain to the EXPchain.

ZKJ tokens were initially issued on Ethereum and BNB Chain. To facilitate transactions on the EXPchain, these tokens can be bridged over. The EXP token serves as the native currency for transaction fees on the ZKJ Chain.

**Step 1: Get some native tokens**

How to obtain:

- For the testnet, you can use the faucet to obtain test tokens. [EXPchain Testnet Faucet](https://expchain.ai/faucet)
- For the mainnet, you can withdraw tokens directly from a centralized exchange (CEX) which supports EXPchain network(e.g. OKX).

**Step 2: Add the preferred network to your wallet**

You'll also need to add the desired chain's RPC endpoint to your wallet. Here we provide [an example](https://github.com/PolyhedraZK/chaindocs?tab=readme-ov-file#wallet-configuration) for doing this using MetaMask.

**Step 3: Initiate the deposit**

Visit [https://expchain.ai/bridge](https://expchain.ai/bridge) and log in with your wallet. Ensure you are connected to the correct source network before initiating the cross-chain transfer.

- Select Network: Source network：Sepolia Testnet, BSC Testnet; Destination network：EXPchain Testnet
- Enter the transfer amount.
- Confirm the recipient address.
- Click "Approve" and then "Transfer"

![Bridge](https://storage.googleapis.com/polyhedra-img/images/prod/Bridge.png)

> 🌟Please note that Sepolia Testnet transfers may take up to 9 minutes to complete, while BSC Testnet transfers from the sending chain are estimated to take 5 minutes.

## **The Graph**

### Important Note

The Graph nodes provided by expchain is only a <mark>sandbox</mark>. The Graph admin endpoint is made public to allow anyone to be able to use it for testing. Projects should run their own Graph instances in production and avoid exposing the admin endpoint.

### ExpChain Testnet <mark>Sandbox</mark>

- JSON-RPC Admin (Deploy subgraphs): https://thegraph-jsonrpc-testnet.expchain.ai
- GraphQL HTTP Server (Query subgraphs): https://thegraph-subgraphs-testnet.expchain.ai
- Query Status(Subgraph indexing status): https://thegraph-index-testnet.expchain.ai
- IPFS: https://thegraph-ipfs-testnet.expchain.ai

[An example deployed subgraph](https://thegraph-subgraphs-testnet.expchain.ai/subgraphs/name/blocklytics/exp-testnet-blocks/graphql) is available for block on expchain Testnet.

### Deploying Subgraphs

#### Install graph-cli

[GitHub - graphprotocol/graph-tooling: Monorepo for various tools used by subgraph developers. ](https://github.com/graphprotocol/graph-tooling#installation)

#### Write your subgraph

See [Creating a Subgraph](https://thegraph.com/docs/en/developing/creating-a-subgraph/) .
You can also use an example project like [v2-uniswap](https://github.com/Uniswap/v2-subgraph).

#### Upgrade the manifest

Update the `network` properties in the `subgraph.yaml` manifest file. The network name for expchain is `expchain-testnet`.

#### Create your subgraph

```bash
graph create <subgraph-name> --node https://thegraph-jsonrpc-testnet.expchain.ai
```

#### Deploy your subgraph

```bash
graph deploy <subgraph-name> --debug --ipfs https://thegraph-ipfs-testnet.expchain.ai --node https://thegraph-jsonrpc-testnet.expchain.ai
```

Once deployed, your graph should now be deployed and accessible via the GraphQL Server. It can be access at:

```
https://thegraph-subgraphs-testnet.expchain.ai/subgraphs/name/YOUR_SUBGRAPH_NAME/graphql
```

## Usage Example: Deploy ERC20 using Remix

### Step 1: Prepare the ERC20 Smart Contract Code

1. Open [Remix](https://remix.ethereum.org/).
2. In the file manager on the left, create a new Solidity file, for example, MyToken.sol.
3. Write or paste the ERC20 token contract code. Here’s a simple example:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
}
```

#### Code Explanation

1. ERC20 is the standard ERC20 implementation from OpenZeppelin.
2. The initialSupply parameter in the constructor sets the initial token supply.
3. ERC20("MyToken", "MTK") is the token name and symbol; feel free to change them as desired.

### Step 2: Compile the Contract

1. In Remix, switch to the “Solidity Compiler” tab (second icon in the sidebar).
2. Select a Solidity compiler version that matches the version in your contract (e.g., 0.8.0).
3. Click Compile MyToken.sol. If there are no errors, the contract will compile successfully.

### Step 3: Deploy the Contract

1. Once compiled, go to the “Deploy & Run Transactions” tab (third icon in the sidebar).
2. Select the contract MyToken.
3. In the initialSupply field, enter the token’s initial supply (e.g., 1000000 for 1 million tokens).
4. Choose the environment: Injected Web3: connects to your browser wallet (like MetaMask) to deploy to a EXPchain testnet.
5. Click Deploy to deploy the contract.

### Step 4: Test Your Token

After deployment, you can find your contract under Deployed Contracts in Remix. You can test functions such as:

1. balanceOf: Check the token balance of a specific address.
2. transfer: Transfer tokens from the deployer account to another address.
3. approve and transferFrom: Allow another address to transfer tokens on your behalf.

## Benchmark

### Server Configuration:

- **Network**: Testnet
- **Server**: AWS
  - **OS**: Ubuntu
  - **CPU**: Intel® Xeon® Gold 6268CL, 24 cores
  - **Memory**: 24 GB, 2800 MHz

`These benchmarks were conducted in a controlled environment with specified hardware and network configurations to measure performance under different scenarios. Results may vary based on actual network conditions and hardware resources.`

### 1. ETH Transfer Transactions

- **Test Logic**: Simultaneous ETH transfer transactions from `n` addresses until the block is full. The TPS is calculated as: `TPS = Total transactions in a block / Block time`
- **Example**:
- Transactions: 1428
- Block Time: 12 seconds
- **TPS**: 119

---

### 2. Simple Contract Transactions

- **Test Logic**: Simultaneous token claim calls from `n` addresses until the block is full. The TPS is calculated as: `TPS = Total transactions in a block / Block time`
- **Example**:
- Transactions: 895
- Block Time: 12 seconds
- **TPS**: 74

---

### 3. Expander Contract Transactions

- **Test Logic**: Simultaneous calls to the Expander contract (successful/failed) from `n` addresses until the block is full. The TPS is calculated as: `TPS = Total transactions in a block / Block time`
- **Limitations**:
- Maximum 5 successful Expander transactions per block.
- Maximum 1 failed Expander transaction per block.
- **Example**:
- **TPS**: 0.4

---

### 4. GNARK Plonk Verify Contract Transactions

- **Test Logic**: Simultaneous calls to the GNARK Plonk verify function (successful/failed) from `n` addresses until the block is full. The TPS is calculated as: `TPS = Total transactions in a block / Block time`
- **Limitations**:
- Maximum 64 successful GNARK Plonk verify transactions per block.
- Maximum 1 failed GNARK Plonk verify transaction per block.
- **Example**:
- **TPS**: 5

---

### 5. GNARK Groth16 Verify Contract Transactions

- **Test Logic**: Simultaneous calls to the GNARK Groth16 verify function (successful/failed) from `n` addresses until the block is full. The TPS is calculated as: `TPS = Total transactions in a block / Block time`
- **Limitations**:
- Maximum 730 successful GNARK Groth16 verify transactions per block.
- Maximum 1 failed GNARK Groth16 verify transaction per block.
- **Example**:
- **TPS**: 60

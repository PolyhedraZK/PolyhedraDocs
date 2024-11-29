# The Graph

## Important Note

The Graph nodes provided by expchain is only a <mark>sandbox</mark>. The Graph admin endpoint is made public to allow anyone to be able to use it for testing. Projects should run their own Graph instances in production and avoid exposing the admin endpoint.

## ExpChain Testnet <mark>Sandbox</mark>

- JSON-RPC Admin (Deploy subgraphs): https://thegraph-jsonrpc-testnet.expchain.ai
- GraphQL HTTP Server (Query subgraphs): https://thegraph-subgraphs-testnet.expchain.ai
- Query Status(Subgraph indexing status): https://thegraph-index-testnet.expchain.ai
- IPFS: https://thegraph-ipfs-testnet.expchain.ai

[An example deployed subgraph](https://thegraph-subgraphs-testnet.expchain.ai/subgraphs/name/blocklytics/exp-testnet-blocks/graphql) is available for block on expchain Testnet.

## Deploying Subgraph

### Install graph-cli

[GitHub - graphprotocol/graph-tooling: Monorepo for various tools used by subgraph developers. ](https://github.com/graphprotocol/graph-tooling#installation)

### Write your subgraph

See [Creating a Subgraph](https://thegraph.com/docs/en/developing/creating-a-subgraph/) .
You can also use an example project like [v2-uniswap](https://github.com/Uniswap/v2-subgraph).

### Upgrade the manifest

Update the `network` properties in the `subgraph.yaml` manifest file. The network name for expchain is `expchain-testnet`.

### Create your subgraph

```bash
graph create <subgraph-name> --node https://thegraph-jsonrpc-testnet.expchain.ai
```

### Deploy your subgraph

```bash
graph deploy <subgraph-name> --debug --ipfs https://thegraph-ipfs-testnet.expchain.ai --node https://thegraph-jsonrpc-testnet.expchain.ai
```

Once deployed, your graph should now be deployed and accessible via the GraphQL Server. It can be access at:

```
https://thegraph-subgraphs-testnet.expchain.ai/subgraphs/name/YOUR_SUBGRAPH_NAME/graphql
```

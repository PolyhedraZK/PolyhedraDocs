---
slug: /contract
sidebar_position: 8
---

# Usage Example: Deploy ERC20 using Remix

## Step 1: Prepare the ERC20 Smart Contract Code

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

### Code Explanation

1. ERC20 is the standard ERC20 implementation from OpenZeppelin.
2. The initialSupply parameter in the constructor sets the initial token supply.
3. ERC20("MyToken", "MTK") is the token name and symbol; feel free to change them as desired.

## Step 2: Compile the Contract

1. In Remix, switch to the “Solidity Compiler” tab (second icon in the sidebar).
2. Select a Solidity compiler version that matches the version in your contract (e.g., 0.8.0).
3. Click Compile MyToken.sol. If there are no errors, the contract will compile successfully.

## Step 3: Deploy the Contract

1. Once compiled, go to the “Deploy & Run Transactions” tab (third icon in the sidebar).
2. Select the contract MyToken.
3. In the initialSupply field, enter the token’s initial supply (e.g., 1000000 for 1 million tokens).
4. Choose the environment: Injected Web3: connects to your browser wallet (like MetaMask) to deploy to a EXPchain Testnet.
5. Click Deploy to deploy the contract.

## Step 4: Test Your Token

After deployment, you can find your contract under Deployed Contracts in Remix. You can test functions such as:

1. balanceOf: Check the token balance of a specific address.
2. transfer: Transfer tokens from the deployer account to another address.
3. approve and transferFrom: Allow another address to transfer tokens on your behalf.

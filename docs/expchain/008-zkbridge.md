# zkBridge Cross-Chain Messaging

You will need the [SendApi interface](#izkbridgesol) and [ReceiveApi interface](#izkbridgereceiversol).

## Send Chain

To send a message, call the zkBridge send() function.
here is an simple example

```solidity
// perform a zkBridge send() in a solidity smart contract function
// the msg.value is the "fee" that zkBridge needs to pay for the cross chain message

//TODO handle your business
//.......
bytes memory payload =abi.encode(
    tokenAddress,   // Address of the token
    tokenChain,     // Chain ID of the token
    amount,         // amount of the token
    to,             // Address of the recipient.
    toChain         // Chain ID of the recipient
)

uint64 nonce = IZKBridge(zkBridgeAddress).send{value:msg.value}(dstChainId, dstAddress, payload);
```

## Estimating Message Fees

You will note in the topmost example we call send() with `value: msg.value` this is because send() requires a bit of native gas token so the relayer can complete the message delivery on the destination chain. If you don't set this value you might get error when calling zkBridge.send()

```solidity
function estimateFees(uint16 dstChainId) external view override returns (uint256 fee) {
    return IZKBridge(zkBridgeAddress).estimateFee(dstChainId);
}
```

## Receive Chain

Destination contracts must implement zkReceive() to handle incoming messages

The code snippet explains how the message will be received.
To receive a message, your User Application contract must implement the IZKBridgeReceiver interface and override the zkReceive function

```solidity
pragma solidity ^0.8.0;

contract Demo is IZKBridgeReceiver {
    // @notice ZKBridge endpoint will invoke this function to deliver the message on the destination
    // @param srcChainId - the source endpoint identifier
    // @param srcAddress - the source sending contract address from the source chain
    // @param nonce - the ordered message nonce
    // @param message - the signed payload is the UA bytes has encoded to be sent
    function zkReceive(uint16 srcChainId, address srcAddress, uint64 nonce, bytes calldata payload) external override {
        (
            address tokenAddress,
            uint16 tokenChain,
            uint256 amount,
            address to,
            uint16 toChain
        ) = abi.decode(payload, (address, uint16, uint256, address, uint16));
         //TODO handle your business
    }
}
```

# Contract Addresses

## Testnet

- Sepolia
  - chainId:119
  - Address:0xa8a4547Be2eCe6Dde2Dd91b4A5adFe4A043b21C7
- Binance Smart Chain
  - chainId:103
  - Address:0xa8a4547Be2eCe6Dde2Dd91b4A5adFe4A043b21C7
- EXPchain
  - chainId:131
  - Address:0xa8a4547Be2eCe6Dde2Dd91b4A5adFe4A043b21C7

# EVM (Solidity) Interfaces

## IZKBridge.sol

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IZKBridge {

  // @notice send a zkBridge message to the specified address at a zkBridge endpoint.
  // @param dstChainId - the destination chain identifier
  // @param dstAddress - the address on destination chain
  // @param payload - a custom bytes payload to send to the destination contract
  function send(uint16 dstChainId, address dstAddress, bytes memory payload) external payable returns (uint64 nonce);

  // @notice gets a quote in source native gas, for the amount that send() requires to pay for message delivery
  // @param dstChainId - the destination chain identifier
  function estimateFee(uint16 dstChainId) external view returns (uint256 fee);
}
```

## IZKBridgeReceiver.sol

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IZKBridgeReceiver {
  // @notice zkBridge endpoint will invoke this function to deliver the message on the destination
  // @param srcChainId - the source endpoint identifier
  // @param srcAddress - the source sending contract address from the source chain
  // @param nonce - the ordered message nonce
  // @param payload - a custom bytes payload from send chain
  function zkReceive(uint16 srcChainId, address srcAddress, uint64 nonce, bytes calldata payload) external;
}
```

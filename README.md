# 1inch Cross-Chain Resolver Example

A sample implementation of a cross-chain atomic swap resolver using 1inch's cross-chain SDK. This project demonstrates how to implement secure cross-chain token swaps with escrow contracts on both source and destination chains.

## Overview

This project implements a cross-chain atomic swap mechanism that allows users to swap tokens across different blockchain networks securely. The system uses:

- **Escrow contracts** to lock funds on both source and destination chains
- **Hash-time-locked contracts (HTLC)** for atomic swap execution
- **1inch Limit Order Protocol (LOP)** for order execution
- **Cross-chain SDK** for seamless integration

## Architecture

### Core Components

1. **Resolver Contract** (`contracts/src/Resolver.sol`)
   - Main contract that orchestrates cross-chain swaps
   - Deploys escrow contracts on source and destination chains
   - Handles order execution through 1inch LOP
   - Manages withdrawal and cancellation of escrows

2. **Escrow System**
   - `IBaseEscrow.sol` - Base interface for escrow contracts
   - `IEscrowFactory.sol` - Factory for creating escrow contracts
   - Supports both ERC-20 tokens and native tokens

3. **Libraries**
   - `TakerTraitsLib.sol` - Manages taker-specific parameters
   - `TimelocksLib.sol` - Handles time-based constraints
   - `ImmutablesLib.sol` - Manages immutable escrow parameters

### How It Works

1. **Source Chain Deployment**: The resolver deploys an escrow contract on the source chain and locks the maker's funds
2. **Order Execution**: Uses 1inch LOP to execute the swap order
3. **Destination Chain Deployment**: Deploys a corresponding escrow on the destination chain
4. **Atomic Swap**: The taker can withdraw funds by providing the secret hash
5. **Safety Mechanisms**: Includes timelocks and rescue functions for dispute resolution

## Prerequisites

- Node.js >= 22
- Yarn or npm
- Tron private keys for mainnet and testnet

## Installation

```bash
# Install dependencies
yarn install
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Private keys for Tron networks
PRIVATE_KEY_TRON=0xYourTronPrivateKeyHere
PRIVATE_KEY_NILE=0xYourTronPrivateKeyHere
```

### Network Configuration

The project supports:
- **Tron Mainnet** - Production network
- **Tron Nile Testnet** - Test network

Network configurations are defined in `tronbox-config.js`.

## Usage

### Compile Contracts

```bash
yarn run compile
```

### Deploy Contracts

#### Tron Mainnet
```bash
yarn deploy:tron:main
```

#### Tron Nile Testnet
```bash
yarn deploy:tron:nile
```

### Contract Functions

#### deploySrc
Deploys an escrow contract on the source chain and executes the swap order.

```solidity
function deploySrc(
    IBaseEscrow.Immutables calldata immutables,
    IOrderMixin.Order calldata order,
    bytes32 r,
    bytes32 vs,
    uint256 amount,
    TakerTraits takerTraits,
    bytes calldata args
) external payable
```

#### deployDst
Deploys an escrow contract on the destination chain.

```solidity
function deployDst(
    IBaseEscrow.Immutables calldata dstImmutables, 
    uint256 srcCancellationTimestamp
) external payable
```

#### withdraw
Withdraws funds from an escrow using the secret.

```solidity
function withdraw(
    IEscrow escrow, 
    bytes32 secret, 
    IBaseEscrow.Immutables calldata immutables
) external
```

#### cancel
Cancels an escrow and returns funds to the original owner.

```solidity
function cancel(
    IEscrow escrow, 
    IBaseEscrow.Immutables calldata immutables
) external
```

## Security Features

- **Ownable Pattern**: Only the contract owner can deploy escrows and make arbitrary calls
- **Timelocks**: Built-in time constraints for withdrawal and cancellation periods
- **Hash Verification**: Secure secret-based withdrawal mechanism
- **Rescue Functions**: Emergency fund recovery mechanisms
- **Atomic Operations**: Ensures either both chains complete or both fail

## Dependencies

### Core Dependencies
- `@1inch/cross-chain-sdk` - Cross-chain functionality
- `@1inch/solidity-utils` - Utility libraries
- `@openzeppelin/contracts` - Security and access control
- `ethers` - Ethereum interaction

### Development Dependencies
- `tronbox` - Tron blockchain development framework
- `jest` - Testing framework
- `eslint` - Code linting
- `typescript` - Type safety

## Testing

```bash
# Run tests
yarn test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For security issues, contact: security@1inch.io

## Disclaimer

This is an example implementation. Use at your own risk and ensure proper security audits before deploying to production.

# Decentralized Carbon Credit Marketplace

![D9FC6CBA-9915-4C47-AD0E-1D17D2E4183B](https://github.com/user-attachments/assets/8221e19c-8468-4c71-b513-b97a6b156daa)


## Overview

This project provides a comprehensive solution to the growing need for transparent, secure, and efficient carbon credit trading. By leveraging blockchain technology, zero-knowledge proofs, and specialized AI agents, we've created a fully decentralized marketplace for carbon credit generation, validation, trading, and offsetting.

## Table of Contents

- [Overview](#overview)
- [Core System Architecture](#core-system-architecture)
- [Technical Stack](#technical-stack)
- [DeFi Integration](#defi-integration)
- [Zero-Knowledge Proof System](#zero-knowledge-proof-system)
- [IAgent System](#iagent-system)
- [Contract Testing & Interaction](#contract-testing--interaction)
  - [Execute Commands](#execute-commands)
  - [Query Commands](#query-commands)
- [Unit Testing](#unit-testing)
- [Regulatory Landscape & Urgency](#regulatory-landscape--urgency)
- [Market Opportunity](#market-opportunity)
- [Competitive Advantage](#competitive-advantage)
- [Team](#team)

## Core System Architecture

- **Green Organizations**: Claim submission with geospatial validation
- **Smart Contract Infrastructure**: Multi-contract architecture with evidence verification
- **Zero-Knowledge Proof System**: Privacy-preserving eligibility verification
- **IAgent System**: Specialized AI agents for marketplace interaction

## Technical Stack

- **Smart Contracts**: CosmWasm (Cosmos ecosystem)
- **Blockchain**: Deployed on Injective Testnet
- **Contract Address**: `inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g`
- **Code ID**: `27281`
- **Frontend**: Next.js
- **Storage**: IPFS integration
- **ZK-Proof System**: Custom implementation (sample proofs available in `generated_proofs` directory)
- **AI Integration**: IAgent framework with specialized agent types

## DeFi Integration

Our platform incorporates advanced DeFi mechanisms to enhance the carbon market:

- **Carbon Credit Borrowing**: Organizations can borrow credits against future reduction commitments
- **Lending Pools**: Carbon-rich entities can lend excess credits at market rates
- **Tokenized Carbon Assets**: Fractional ownership of carbon projects
- **Reputation-Based Credit Scoring**: ZK-verified lending eligibility without data exposure
- **Automated Repayment Mechanisms**: Smart contract enforcement of lending terms
- **Cross-Chain Liquidity**: Future integration with major DeFi ecosystems

## Zero-Knowledge Proof System

Our ZK system enables organizations to verify eligibility without exposing sensitive data:

- **Private Inputs**: Emissions data, credit history, debt, available tokens
- **Circuit Construction**: Field element conversion, R1CS constraints
- **Proof Generation**: SNARK implementation with zero-knowledge property
- **On-Chain Verification**: Maintains privacy while ensuring compliance
- **Sample Proofs**: Pre-generated sample proofs available for testing in `generated_proofs` directory

## IAgent System: AI-Powered Experience

- **Create multiple Agent**: Assists with emissions documentation and also can be deployed on testnet and mainnet correspondingly 
- **Manage different AI agents**: Analyzes market conditions
- **Prompt AI agent**: Ensures regulatory requirements are met
- **Inter-Agent Communication**: Agents share information seamlessly

## Contract Testing & Interaction

The platform is fully deployed and can be tested using the following commands:

### Execute Commands

#### Update Organization Name
```bash
injectived tx wasm execute inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"update_organization_name":{"name":"Green Earth Initiative"}}' \
  --from new \
  --chain-id=injective-888 \
  --gas=250000 \
  --fees=400000000inj \
  --node=https://k8s.testnet.tm.injective.network:443 \
  -y
```

#### Add Organization Emission
```bash
injectived tx wasm execute inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"add_organization_emission":{"emissions":"5000"}}' \
  --from new \
  --chain-id=injective-888 \
  --gas=250000 \
  --fees=400000000inj \
  --node=https://k8s.testnet.tm.injective.network:443 \
  -y
```

#### Create Claim
```bash
injectived tx wasm execute inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"create_claim":{"longitudes":["12.345","12.346","12.347"],"latitudes":["45.678","45.679","45.680"],"time_started":1710691200,"time_ended":1710777600,"demanded_tokens":"1000","ipfs_hashes":["QmHash1","QmHash2"]}}' \
  --from new \
  --chain-id=injective-888 \
  --gas=250000 \
  --fees=400000000inj \
  --node=https://k8s.testnet.tm.injective.network:443 \
  -y
```

#### Create Lend Token
```bash
# Replace LENDER_ADDRESS with an actual address
injectived tx wasm execute inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"create_lend_token":{"lender":"inj1your_lender_address","amount":"5000"}}' \
  --from new \
  --chain-id=injective-888 \
  --gas=250000 \
  --fees=400000000inj \
  --node=https://k8s.testnet.tm.injective.network:443 \
  -y
```

#### Cast Vote
```bash 
injectived tx wasm execute inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"cast_vote":{"claim_id":1,"vote":"yes"}}' \
  --from new \
  --chain-id=injective-888 \
  --gas=250000 \
  --fees=400000000inj \
  --node=https://k8s.testnet.tm.injective.network:443 \
  -y
```

#### Finalize Voting
```bash
injectived tx wasm execute inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"finalize_voting":{"claim_id":1}}' \
  --from new \
  --chain-id=injective-888 \
  --gas=250000 \
  --fees=400000000inj \
  --node=https://k8s.testnet.tm.injective.network:443 \
  -y
```

#### Lend Tokens
```bash
injectived tx wasm execute inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"lend_tokens":{"lend_request_id":1,"response":"approved"}}' \
  --from new \
  --chain-id=injective-888 \
  --gas=250000 \
  --fees=400000000inj \
  --node=https://k8s.testnet.tm.injective.network:443 \
  -y
```

#### Repay Tokens
```bash
injectived tx wasm execute inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"repay_tokens":{"lender":"inj1your_lender_address","amount":"5000"}}' \
  --from new \
  --chain-id=injective-888 \
  --gas=250000 \
  --fees=400000000inj \
  --node=https://k8s.testnet.tm.injective.network:443 \
  -y
```

#### Verify Eligibility
```bash
injectived tx wasm execute inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"verify_eligibility":{"borrower":"inj1borrower_address","amount":"1000","lender":"inj1lender_address"}}' \
  --from new \
  --chain-id=injective-888 \
  --gas=250000 \
  --fees=400000000inj \
  --node=https://k8s.testnet.tm.injective.network:443 \
  -y
```

### Query Commands

#### Get Config
```bash
injectived query wasm contract-state smart inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"get_config":{}}' \
  --node=https://k8s.testnet.tm.injective.network:443
```

#### Get User Lend Requests
```bash
injectived query wasm contract-state smart inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"user_lend_requests":{"user":"inj1your_user_address","start_after":null,"limit":10}}' \
  --node=https://k8s.testnet.tm.injective.network:443
```

#### Get Claim
```bash
injectived query wasm contract-state smart inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"get_claim":{"id":1}}' \
  --node=https://k8s.testnet.tm.injective.network:443
```

#### Get All Organizations
```bash
injectived query wasm contract-state smart inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"get_all_organizations":{"start_after":null,"limit":10}}' \
  --node=https://k8s.testnet.tm.injective.network:443
```

#### Get Organization
```bash
injectived query wasm contract-state smart inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"get_organization":{"address":"inj1organization_address"}}' \
  --node=https://k8s.testnet.tm.injective.network:443
```

#### Get Total Carbon Credits
```bash
injectived query wasm contract-state smart inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"get_total_carbon_credits":{}}' \
  --node=https://k8s.testnet.tm.injective.network:443
```

#### Get Claims
```bash
injectived query wasm contract-state smart inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"get_claims":{"start_after":null,"limit":10}}' \
  --node=https://k8s.testnet.tm.injective.network:443
```

#### Get Claims By Status
```bash
injectived query wasm contract-state smart inj1k4vk8gfwcku3alk5sfkv4c7ad5vq3ee3pcp23g '{"get_claims_by_status":{"status":"pending","start_after":null,"limit":10}}' \
  --node=https://k8s.testnet.tm.injective.network:443
```

## Unit Testing

To run unit tests for the smart contracts, navigate to the `/contracts/src/` directory and execute the following command:

```bash
cargo test
```

This will run all the unit tests defined in the smart contract code, ensuring that the logic and functionality are working as expected.

## Regulatory Landscape & Urgency

- **EU Carbon Border Adjustment Mechanism**: Begins phased implementation in 2023-2026 (European Commission)
- **SEC Climate Disclosure Rules**: New requirements for public companies starting 2024 (SEC Announcement)
- **Corporate Net-Zero Pledges**: Over 1,500 companies representing $11.4 trillion in revenue have set net-zero targets (UN Climate Change, 2023)

## Market Opportunity

- **Voluntary carbon market projected to grow 15x by 2030 to $50B+ (TSVCM, 2023)**
- **Compliance markets expected to exceed $250B by 2030**
- **91% of companies plan to increase spending on carbon credits (S&P Global, 2023)**
- **Corporate climate investments estimated at $1T+ by 2030**

## Competitive Advantage

| Feature | Current Carbon Platforms | Our Solution |
|---------|--------------------------|--------------|
| Verification | Centralized auditors | Decentralized with immutable evidence |
| Privacy | Exposure of sensitive data | Zero-knowledge proofs |
| User Experience | Complex interfaces | AI-guided with IAgents |
| Integration | Siloed systems | Interoperable with existing markets |
| Trust | Depends on third parties | Trustless, algorithmic validation |
| Financial Tools | Limited/Traditional | Full DeFi integration |

## Team

- **Leadership**: Experienced founders from climate finance, blockchain, and AI sectors
- **Technical**: Core developers with expertise in ZK-proofs, smart contracts, and agent systems
- **Advisory**: Climate scientists, carbon market experts, and regulatory specialists
- **Partners**: Collaboration with leading environmental organizations and corporate sustainability programs
- **Contact**: [aaryanjain888@gmail.com](mailto:aaryanjain888@gmail.com)

The climate crisis won't wait. Neither should we.

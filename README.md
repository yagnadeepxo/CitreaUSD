# CitreaUSD (cUSD)

![Screenshot 2024-12-08 at 4 04 31 AM 2](https://github.com/user-attachments/assets/2eb2924c-75ad-4b86-8fd2-40aade20d428)

🧪 Our project introduces **cUSD**, a **Bitcoin-backed stablecoin** built on **Citrea**. By locking Bitcoin through **Citrea's BitcoinLightClient**, users can mint cUSD, a **stable asset designed for DeFi apps**. This enables seamless participation in defi while **leveraging Bitcoin's security** and value.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

### Stablecoin with Native Yield to Tap into the Bitcoin Economy, Enabled by Citrea  
1. **Bitcoin-Backed Store of Value**: Introducing **cUSD**, a stablecoin backed by Bitcoin, catering to DeFi and trading communities on Citrea with a reliable and secure value proposition.  
![Screenshot 2024-12-08 at 3 48 33 AM](https://github.com/user-attachments/assets/57a5b69e-42a1-4188-b0db-373860021619)

2. **Bitcoin-Native Yield**: Staking **cUSD** to **sCUSD** provides users with native Bitcoin yield, unlocking sustainable rewards for stablecoin holders.  

![Screenshot 2024-12-08 at 3 48 52 AM](https://github.com/user-attachments/assets/0c1e5740-b63d-4145-96c6-740b289af75f)

3. **Direct Staking from Bitcoin Blockchain**: Seamless integration enables users to stake directly from the Bitcoin blockchain, abstracting complexity while bridging Bitcoin with the DeFi ecosystem.  

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.

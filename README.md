# Fractal DID Registry demo dapp

A simple demo dapp for our DID Registry.

## Stack

- Gatsby v4
- Styled components (using web3.fractal.id's theme)
- [web3-react v6](https://github.com/Uniswap/web3-react/tree/v6)

## Setup

### Run development mode

```bash
yarn install

yarn start
```

### Local build

```
yarn clean && yarn build

yarn serve
```

## Deployment

This is deployed as a Netlify app: https://app.netlify.com/sites/fractal-did-registry-demo-dapp/overview. It has https://did-registry.demo.fractal.id/ as the primary name.

Every movement of the `main` branch will be published automatically.

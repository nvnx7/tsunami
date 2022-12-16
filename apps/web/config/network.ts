export const chains = {
  GOERLI: 5,
  POLYGON_MUMBAI: 80001,
};

export const defaultChainId = chains.GOERLI;

export const blockExplorers = {
  [chains.GOERLI]: 'https://goerli.etherscan.io',
  [chains.POLYGON_MUMBAI]: 'https://mumbai.polygonscan.com',
};

// Goerli
// export const registrarAddress = '0x20703B9e08b840A2Cb6AB3f7E8B8926C9ed3aF24';
// export const tsunamiAddress = '0x56aDcC1BaF658C19FA4B149270e351db01957ca4'; // ETH withdraws

// Polygon
// export const registrarAddress = '0x64946e44b69DC5fA6C9E37F6c7DA16DdE59fbdbe';
// export const tsunamiAddress = '0x15aB4Ee03Ea6dF8ff760a6B5DDe4a97C36e038Bb'; // ETH withdraws

// Shardeum
export const registrarAddress = '0x69e2566da33E5Dca2F62Bce053f822B60E265687';
export const tsunamiAddress = '0xb1f08CB84b42374237F14C035141e9c02e1A94f2';

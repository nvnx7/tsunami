import { FC, PropsWithChildren } from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Chain, chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { keyAlchemyGoerli, keyAlchemyMumbai, rpcUrlShardeumLiberty16 } from 'config/env';
import { APP_NAME } from 'config/constants';

const shardeum16Chain: Chain = {
  id: 8080,
  name: 'Shardeum Liberty 1.6',
  network: 'shardeum',
  rpcUrls: { public: rpcUrlShardeumLiberty16, default: rpcUrlShardeumLiberty16 },
  testnet: true,
};

const { chains, provider } = configureChains(
  [chain.goerli, chain.polygonMumbai, shardeum16Chain],
  [
    alchemyProvider({ apiKey: keyAlchemyGoerli }),
    alchemyProvider({ apiKey: keyAlchemyMumbai }),
    jsonRpcProvider({ rpc: () => ({ http: rpcUrlShardeumLiberty16 }) }),
  ],
);

const { connectors } = getDefaultWallets({
  appName: APP_NAME,
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const WalletProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WalletProvider;

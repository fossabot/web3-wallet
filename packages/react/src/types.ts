import type { Networkish } from '@ethersproject/networks';
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import type { Connector, WalletName, WalletState } from '@web3-wallet/core';

export interface Wallet<C extends Connector = Connector> {
  name: WalletName;
  connector: C;
  getState: () => WalletState;
  hooks: {
    useChainId: () => WalletState['chainId'];
    useAccounts: () => WalletState['accounts'];
    useIsConnecting: () => WalletState['isConnecting'];
    useAccount: () => string | undefined;
    useIsConnected: () => boolean;
    useProvider: <T extends BaseProvider = Web3Provider>(
      network?: Networkish,
      enabled?: boolean,
    ) => T | undefined;
    useENSNames: (provider?: BaseProvider) => (string | undefined)[];
    useENSName: (provider?: BaseProvider) => undefined | string;
  };
}

export type WalletProxyState = {
  currentWallet?: WalletName;
  connectionId?: number;
};

export type WalletProxy = Wallet['hooks'] & {
  wallets: Wallet[];
  setCurrentWallet: (walletName: WalletName) => void;
  useCurrentWallet: () => Wallet;
  useConnectionId: () => WalletProxyState['connectionId'];
  useConnect: () => Wallet['connector']['connect'];
  useAutoConnect: () => Wallet['connector']['autoConnect'];
  useAutoConnectOnce: () => Wallet['connector']['autoConnectOnce'];
  useDisconnect: () => Wallet['connector']['disconnect'];
};

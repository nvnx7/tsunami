import { ethers } from 'hardhat';
import { deployHasher } from './hasher';
const { utils, providers, Wallet } = ethers;

const rpcUrl = process.env.RPC_SHARDEUM16 as string;
const privateKeys = (process.env.PRIVATE_KEYS_TEST as string).split(',');
const provider = new providers.JsonRpcProvider(rpcUrl);
const wallet = new Wallet(privateKeys[0], provider);
const maxDepositAmt = utils.parseEther('10');

const treeHeight = 20;
const wSHMAddress = '0x30aa192dB60Cd750472D5E052E3210B75EaF3e98';
const hasherAddress = '0x37D729f076aeC9300b3F89691E9D62F8A0821D8E';
const proposalVerifierAddress = '0x01979D8318AEF8646b6ee15Ce4139408DbcB34f4';
const withdrawVerifierAddress = '0x1AB819bC0090a4e6360e6a4CEc34995f32c7e709';
const revokeVerifierAddress = '0xe45eA7249E88d833318A9Aa20Dd0AE916F9230b8';
const registrarAddress = '0x69e2566da33E5Dca2F62Bce053f822B60E265687';
const tsunamiAddress = '0xb1f08CB84b42374237F14C035141e9c02e1A94f2'; // ETH withdraws

export async function deployContract(contractName: string, ...args: any[]) {
  const Factory = await ethers.getContractFactory(contractName);
  const instance = await Factory.connect(wallet).deploy(...args);
  return instance.deployed();
}

async function main() {
  //   const hasher = await deployHasher(wallet);
  //   console.log('hasher', hasher.address);
  //   const proposalVerifier = await deployContract(
  //     'contracts/verifiers/ProposalVerifier.sol:Verifier',
  //   );
  //   console.log('ProposalVerifier:', proposalVerifier.address);
  //   const withdrawVerifier = await deployContract(
  //     'contracts/verifiers/WithdrawVerifier.sol:Verifier',
  //   );
  //   console.log('WithdrawVerifier:', withdrawVerifier.address);
  //   const revokeVerifier = await deployContract('contracts/verifiers/RevokeVerifier.sol:Verifier');
  //   console.log('RevokeVerifier:', revokeVerifier.address);
  //   const registrar = await deployContract('Registrar');
  //   console.log('Registrar:', registrar.address);
  const tsunami = await deployContract(
    'Tsunami',
    treeHeight,
    maxDepositAmt,
    hasherAddress,
    wSHMAddress,
    proposalVerifierAddress,
    withdrawVerifierAddress,
    revokeVerifierAddress,
  );
  console.log('Tsunami:', tsunami.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

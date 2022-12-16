import { ethers } from 'hardhat';
import { deployHasher } from './hasher';
const { utils, providers, Wallet } = ethers;

const rpcUrl = process.env.RPC_POLYGON_MUMBAI as string;
const privateKeys = (process.env.PRIVATE_KEYS_TEST as string).split(',');
const provider = new providers.JsonRpcProvider(rpcUrl);
const wallet = new Wallet(privateKeys[0], provider);
const maxDepositAmt = utils.parseEther('10');

const treeHeight = 20;
const wMaticAddress = '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889';
const hasherAddress = '0xD1a5cc3e2081393Fe6b0ffbc6c6de3D4484D1a8F';
const proposalVerifierAddress = '0x9b18e1Dd030817Fc1B1b07a9eb005AFe818b2C03';
const withdrawVerifierAddress = '0x8D92191963B82c947B16B9019E23A020625Ed216';
const revokeVerifierAddress = '0x4f133995b5777C3C82CB79EC7F27A68ee28b3b54';
const registrarAddress = '0x64946e44b69DC5fA6C9E37F6c7DA16DdE59fbdbe';
const tsunamiAddress = '0x15aB4Ee03Ea6dF8ff760a6B5DDe4a97C36e038Bb'; // ETH withdraws

export async function deployContract(contractName: string, ...args: any[]) {
  const Factory = await ethers.getContractFactory(contractName);
  const instance = await Factory.connect(wallet).deploy(...args);
  return instance.deployed();
}

async function main() {
  // const hasher = await deployHasher(wallet);
  // console.log('hasher', hasher.address);

  // const proposalVerifier = await deployContract(
  //   'contracts/verifiers/ProposalVerifier.sol:Verifier',
  // );
  // console.log('ProposalVerifier:', proposalVerifier.address);
  // const withdrawVerifier = await deployContract(
  //   'contracts/verifiers/WithdrawVerifier.sol:Verifier',
  // );
  // console.log('WithdrawVerifier:', withdrawVerifier.address);
  // const revokeVerifier = await deployContract('contracts/verifiers/RevokeVerifier.sol:Verifier');
  // console.log('RevokeVerifier:', revokeVerifier.address);
  // const registrar = await deployContract('Registrar');
  // console.log('Registrar:', registrar.address);
  const tsunami = await deployContract(
    'Tsunami',
    treeHeight,
    maxDepositAmt,
    hasherAddress,
    wMaticAddress,
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

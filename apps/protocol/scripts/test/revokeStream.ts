import { ethers } from 'hardhat';
import {
  currentTimestamp,
  getTsunami,
  receiverKeyPair,
  scanStreamUTXOFor,
  senderKeyPair,
  tsunamiAddress,
  recipient,
} from './common';
import { prepareRevoke } from './proof';

const keyPairs = { sender: senderKeyPair, receiver: receiverKeyPair };
const readStream = async () => {
  const tsunami = await getTsunami();

  const streams = await scanStreamUTXOFor(keyPairs, 'sender', tsunami);
  const stream = streams?.[0];
  console.log({ stream });

  return stream;
};

const main = async () => {
  const tsunami = await getTsunami();

  const streamUtxo = await readStream();

  const newStopTime = (await currentTimestamp()) + 300;

  const { proofArgs, extData } = await prepareRevoke({
    tsunami,
    input: streamUtxo,
    newStopTime,
    keyPairs,
    recipient,
  });

  const tx = await tsunami.callStatic.revoke(proofArgs, extData, { gasLimit: 2_000_000 });
  //   console.log('tx', tx);

  const receipt = await tx.wait();
  console.log('receipt', receipt);
};

main();

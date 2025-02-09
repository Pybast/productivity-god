import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import { IAgentRuntime } from "@elizaos/core";

export async function slashUser(
  runtime: IAgentRuntime,
  user: string,
  slashingPercentage: number
) {
  console.log("### Slashing user ###");

  Coinbase.configure({
    privateKey: process.env.COINBASE_PRIVATE_KEY,
    apiKeyName: process.env.COINBASE_API_KEY,
  });

  const wallet = await Wallet.createWithSeed({
    networkId: Coinbase.networks.BaseMainnet,
    seed: process.env.COINBASE_GENERATED_WALLET_HEX_SEED,
  });

  console.log(`Coinbase SDK wallet: ${wallet.getDefaultAddress()}`);

  const abi = [
    {
      type: "function",
      name: "slashUser",
      inputs: [
        { name: "_user", type: "address", internalType: "address" },
        { name: "_amount", type: "uint256", internalType: "uint256" },
      ],
      outputs: [],
      stateMutability: "nonpayable",
    },
  ];

  const transferArgs = {
    _user: user,
    _amount: ((slashingPercentage * 10e18) / 100).toString(),
  };

  const contractInvocation = await wallet.invokeContract({
    contractAddress: "0x58944BCE9ccbd9C512c61CAab35fD4C892793bB1", // sepolia base USDC
    method: "slashUser",
    args: transferArgs,
    abi,
  });

  await contractInvocation.wait();

  console.log(`transaction sent ${contractInvocation.getTransactionHash()}`);

  return contractInvocation.getTransactionHash();
}

import { Coinbase, Wallet } from "@coinbase/coinbase-sdk";
import { IAgentRuntime } from "@elizaos/core";

export async function slashUser(runtime: IAgentRuntime, user: string) {
  console.log("### Slashing user ###");

  Coinbase.configure({
    privateKey: process.env.COINBASE_PRIVATE_KEY,
    apiKeyName: process.env.COINBASE_API_KEY,
  });

  const wallet = await Wallet.createWithSeed({
    networkId: Coinbase.networks.BaseSepolia,
    seed: process.env.COINBASE_GENERATED_WALLET_HEX_SEED,
  });

  console.log(`Coinbase SDK wallet: ${wallet.getDefaultAddress()}`);

  const abi = [
    {
      name: "transfer",
      type: "function",
      inputs: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
      ],
      outputs: [{ name: "", type: "bool" }],
      stateMutability: "nonpayable",
    },
  ];

  const transferArgs = {
    to: user,
    value: "1",
  };

  const contractInvocation = await wallet.invokeContract({
    contractAddress: "0x036cbd53842c5426634e7929541ec2318f3dcf7e", // sepolia base USDC
    method: "transfer",
    args: transferArgs,
    abi,
  });

  await contractInvocation.wait();

  console.log(`transaction sent ${contractInvocation.getTransactionHash()}`);
}

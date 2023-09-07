import { Contract } from "ethers";
import { SelfServeRegistryOperator } from "./types/SelfServeRegistryOperator";

export type { SelfServeRegistryOperator };

export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "registryAddr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "fractalId",
        type: "bytes32",
      },
    ],
    name: "addSelf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "listId",
        type: "string",
      },
    ],
    name: "addSelfToList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "fractalId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "listId",
        type: "string",
      },
    ],
    name: "addSelfToRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "removeSelf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "listId",
        type: "string",
      },
    ],
    name: "removeSelfFromList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "listId",
        type: "string",
      },
    ],
    name: "removeSelfFromRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export const address = "0x2e190e260EcCd70f8b73F646F37a72D1271a8854";

export const selfServeRegistryOperator = new Contract(
  address,
  abi
) as SelfServeRegistryOperator;

export default selfServeRegistryOperator;

export const CurationABI = [
  { inputs: [], name: 'InvalidURI', type: 'error' },
  { inputs: [], name: 'SelfCuration', type: 'error' },
  { inputs: [], name: 'TransferFailed', type: 'error' },
  { inputs: [], name: 'ZeroAddress', type: 'error' },
  { inputs: [], name: 'ZeroAmount', type: 'error' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: true,
        internalType: 'contract IERC20',
        name: 'token',
        type: 'address',
      },
      { indexed: false, internalType: 'string', name: 'uri', type: 'string' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Curation',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      { indexed: false, internalType: 'string', name: 'uri', type: 'string' },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Curation',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to_', type: 'address' },
      { internalType: 'contract IERC20', name: 'token_', type: 'address' },
      { internalType: 'uint256', name: 'amount_', type: 'uint256' },
      { internalType: 'string', name: 'uri_', type: 'string' },
    ],
    name: 'curate',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to_', type: 'address' },
      { internalType: 'string', name: 'uri_', type: 'string' },
    ],
    name: 'curate',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId_', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

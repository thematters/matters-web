export const BillboardOperatorABI = [
  {
    type: 'function',
    name: 'getLatestEpoch',
    inputs: [
      {
        name: 'tokenId_',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'epoch',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getBid',
    inputs: [
      {
        name: 'tokenId_',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'epoch_',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: 'bidder_',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'bid',
        type: 'tuple',
        internalType: 'struct IBillboardRegistry.Bid',
        components: [
          {
            name: 'price',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'tax',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'contentURI',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'redirectURI',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'placedAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'updatedAt',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'isWon',
            type: 'bool',
            internalType: 'bool',
          },
          {
            name: 'isWithdrawn',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
] as const

export const BillboardRegistryABI = [
  {
    type: 'function',
    name: 'highestBidder',
    inputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
] as const

export const BillboardABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId_',
        type: 'uint256',
      },
    ],
    name: 'getBoard',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'creator',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'location',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'contentURI',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'redirectURI',
            type: 'string',
          },
        ],
        internalType: 'struct IBillboardRegistry.Board',
        name: 'board',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const

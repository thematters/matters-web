const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

export const contract = {
  Ethereum: isProd
    ? {
        traveloggersAddress:
          '0x8515ba8ef2cf2f2ba44b26ff20337d7a2bc5e6d8' as `0x${string}`,
      }
    : {
        traveloggersAddress:
          '0xae89d81ab5c668661200fa9c6ed45fe1707f7097' as `0x${string}`,
      },
  Polygon: isProd
    ? {
        logbookAddress:
          '0xcdf8D568EC808de5fCBb35849B5bAFB5d444D4c0' as `0x${string}`,
        curationAddress:
          '0x5edebbdae7B5C79a69AaCF7873796bb1Ec664DB8' as `0x${string}`,
        curationBlockNum: '34564355',
        tokenAddress:
          '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as `0x${string}`,
        tokenDecimals: 6,
      }
    : {
        logbookAddress:
          '0x203197e074b7a2f4ff6890815e4657a9c47c68b1' as `0x${string}`,
        curationAddress:
          '0xa219C6722008aa22828B31A13ab9Ba93bB91222c' as `0x${string}`,
        curationBlockNum: '28675517' as `0x${string}`,
        tokenAddress:
          '0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1' as `0x${string}`,
        tokenDecimals: 6,
      },
  Optimism: isProd
    ? {
        curationAddress: '' as `0x${string}`, // TODO
        curationBlockNum: '' as `0x${string}`, // TODO
        tokenAddress:
          '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58' as `0x${string}`,
        tokenDecimals: 6,
      }
    : {
        curationAddress:
          '0x92a117aeA74963Cd0CEdF9C50f99435451a291F7' as `0x${string}`,
        curationBlockNum: '8438904',
        tokenAddress:
          '0x5fd84259d66Cd46123540766Be93DFE6D43130D7' as `0x${string}`,
        tokenDecimals: 6,
      },
}

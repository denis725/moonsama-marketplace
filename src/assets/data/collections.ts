export const collections = {
  name: 'MoonSama List',
  timestamp: '2021-08-18T00:00:00.000Z',
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  keywords: [
    'susu',
    'carbonswap',
    'marketplace',
    'finance',
    'dex',
    'green',
    'sustainable',
  ],
  logoURI: 'https://',
  tags: {
    wrapped: {
      name: 'wrapped',
      description:
        'Assets that are a wrapped version of their original, holding the same value',
    },
    bridged: {
      name: 'bridged',
      description: 'Assets that are bridged over from another chain',
    },
    meme: {
      name: 'meme',
      description: 'Assets that were created with no specific purpose, for fun',
    },
    native: {
      name: 'native',
      description: 'Assets that are native to Moonriver',
    },
  },
  types: ['ERC20', 'ERC721', 'ERC1155'],
  indexing: ['none', 'sequential'],
  collections: [
    /*
    {
      chainId: 1285,
      address: '0xaF1F85aD24Bc45fb19f5F8B5166e1Aed41c60844',
      display_name: 'SamaMoo',
      symbol: 'SAMAMOO',
      type: 'ERC721',
      indexing: 'sequential',
      contractURI: 'ipfs://QmQzz765Q6j2LjWJHPmComm1i7Kpeccz27x6tpTeHFFCxg',
      tags: ['native', 'green'],
    },
    {
      chainId: 1285,
      address: '0x63228048121877A9e0f52020834A135074e8207C',
      display_name: 'TestCollection',
      symbol: 'TC',
      type: 'ERC1155',
      indexing: 'sequential',
      contractURI: 'ipfs://QmfZtbgLDmcDNf4tvhm1LuLmbBYSASmk6zcSBY2GRzh72S',
      tags: ['native', 'green'],
      subgraph: 'https://moonriver-subgraph.moonsama.com/subgraphs/name/moonsama/nft-1155-test'
      
    },
    */
    {
      chainId: 1285,
      address: '0xb654611F84A8dc429BA3cb4FDA9Fad236C505a1a',
      display_name: 'Moonsama',
      symbol: 'MSAMA',
      type: 'ERC721',
      indexing: 'sequential',
      contractURI: 'ipfs://QmPhFz5mKCtndGLLZBwGockGAWz7o7nef4Kgf37gYsTid5',
      tags: ['native', 'green'],
      subgraph: 'https://moonriver-subgraph.moonsama.com/subgraphs/name/moonsama/nft'
    },
    {
      chainId: 1285,
      address: '0x1974eEAF317Ecf792ff307F25A3521C35eECde86',
      display_name: '???',
      symbol: '???',
      type: 'ERC1155',
      indexing: 'sequential',
      contractURI: 'ipfs://QmWox8YqUaYVxSSB7GRhPAuczv6auL8QrkDrkMTcqGEGKA',
      tags: ['native', 'green'],
      subgraph: 'https://moonriver-subgraph.moonsama.com/subgraphs/name/moonsama/nft-1155-mx'
    }
  ],
};

export default collections;

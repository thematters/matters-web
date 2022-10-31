const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

export const EXTERNAL_LINKS = {
  FACEBOOK: 'https://www.facebook.com/MattersLab2018',
  WEIBO: 'https://weibo.com/6695370718/profile?topnav=1&wvr=6',
  TELEGRAM: 'https://t.me/joinchat/BXzlWUhXaWNZ-TXJZJCzDQ',
  CIVIC_LIKER_SUPPORT:
    'https://docs.like.co/v/zh/user-guide/civic-liker?utm_source=Matters&utm_medium=website',
  CIVIC_LIKER_JOIN: isProd
    ? 'https://liker.land/civic?is_popup=1&utm_source=Matters&utm_medium=website&utm_campaign=regular_funnel'
    : 'https://rinkeby.liker.land/civic?is_popup=1&utm_source=Matters&utm_medium=website&utm_campaign=regular_funnel',
  CIVIC_LIKER: (likerId: string) =>
    isProd
      ? `https://liker.land/${likerId}/civic?utm_source=Matters`
      : `https://rinkeby.liker.land/${likerId}/civic?utm_source=Matters`,
  SUPER_LIKE:
    'https://docs.like.co/v/zh/user-guide/likecoin-button/superlike?utm_source=Matters&utm_medium=website&utm_campaign=superlike_funnel',
  PLANET: 'https://www.planetable.xyz/',
}

export const GUIDE_LINKS = {
  readerToolbox: {
    zh_hant:
      'https://matters.news/@hi176/255829-matters-%E8%AE%80%E8%80%85%E5%B7%A5%E5%85%B7%E7%AE%B1-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2022-03-%E6%9B%B4%E6%96%B0-bafyreibgaprnoj2yqeaiaox6tzl74id3yrxyynodthfby6m4fzqqzrmiym',
    zh_hans:
      'https://matters.news/zh-Hans/@hi176/255829-matters-%E8%AE%80%E8%80%85%E5%B7%A5%E5%85%B7%E7%AE%B1-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2022-03-%E6%9B%B4%E6%96%B0-bafyreibgaprnoj2yqeaiaox6tzl74id3yrxyynodthfby6m4fzqqzrmiym',
    en: 'https://matters.news/en/@hi176/255829-matters-%E8%AE%80%E8%80%85%E5%B7%A5%E5%85%B7%E7%AE%B1-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2022-03-%E6%9B%B4%E6%96%B0-bafyreibgaprnoj2yqeaiaox6tzl74id3yrxyynodthfby6m4fzqqzrmiym',
  },
  authorToolbox: {
    zh_hant:
      'https://matters.news/@hi176/255830-matters-%E4%BD%9C%E8%80%85%E5%B7%A5%E5%85%B7%E7%AE%B1-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2022-03-%E6%9B%B4%E6%96%B0-bafyreierks3n7n7aohc7to26wn7vgohspcxprxlakvdjt4g4ex74qqxuci',
    zh_hans:
      'https://matters.news/zh-Hans/@hi176/255830-matters-%E4%BD%9C%E8%80%85%E5%B7%A5%E5%85%B7%E7%AE%B1-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2022-03-%E6%9B%B4%E6%96%B0-bafyreierks3n7n7aohc7to26wn7vgohspcxprxlakvdjt4g4ex74qqxuci',
    en: 'https://matters.news/en/@hi176/255830-matters-%E4%BD%9C%E8%80%85%E5%B7%A5%E5%85%B7%E7%AE%B1-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2022-03-%E6%9B%B4%E6%96%B0-bafyreierks3n7n7aohc7to26wn7vgohspcxprxlakvdjt4g4ex74qqxuci',
  },
  connectWallet: {
    zh_hant:
      'https://matters.news/@hi176/340008-matters-%E5%8A%A0%E5%AF%86%E9%8C%A2%E5%8C%85%E6%8C%87%E5%8D%97-2022-10-%E6%9B%B4%E6%96%B0-bafyreibjlc7znkrl5ljk7cwa2htagm6uhzdupbc37clgxelh6nkpvfqdtu',
    zh_hans:
      'https://matters.news/zh-Hans/@hi176/340008-matters-%E5%8A%A0%E5%AF%86%E9%8C%A2%E5%8C%85%E6%8C%87%E5%8D%97-2022-10-%E6%9B%B4%E6%96%B0-bafyreibjlc7znkrl5ljk7cwa2htagm6uhzdupbc37clgxelh6nkpvfqdtu',
    en: 'https://matters.news/en/@hi176/340008-matters-%E5%8A%A0%E5%AF%86%E9%8C%A2%E5%8C%85%E6%8C%87%E5%8D%97-2022-10-%E6%9B%B4%E6%96%B0-bafyreibjlc7znkrl5ljk7cwa2htagm6uhzdupbc37clgxelh6nkpvfqdtu',
  },
  payment: {
    zh_hant:
      'https://matters.news/@hi176/340009-matters-%E6%94%AF%E4%BB%98%E8%88%87%E6%8F%90%E7%8F%BE%E6%8C%87%E5%8D%97-2022-10-%E6%9B%B4%E6%96%B0-bafyreihtziqrqalppvjcnjxno4vwwiuate75jmefomrziyv64jiaje62mi',
    zh_hans:
      'https://matters.news/zh-Hans/@hi176/340009-matters-%E6%94%AF%E4%BB%98%E8%88%87%E6%8F%90%E7%8F%BE%E6%8C%87%E5%8D%97-2022-10-%E6%9B%B4%E6%96%B0-bafyreihtziqrqalppvjcnjxno4vwwiuate75jmefomrziyv64jiaje62mi',
    en: 'https://matters.news/en/@hi176/340009-matters-%E6%94%AF%E4%BB%98%E8%88%87%E6%8F%90%E7%8F%BE%E6%8C%87%E5%8D%97-2022-10-%E6%9B%B4%E6%96%B0-bafyreihtziqrqalppvjcnjxno4vwwiuate75jmefomrziyv64jiaje62mi',
  },
  tagUsage: {
    zh_hant:
      'https://matters.news/@hi176/59632-matters-%E6%A8%99%E7%B1%A4%E5%8A%9F%E8%83%BD%E5%A4%A7%E9%80%B2%E5%8C%96-%E9%96%B1%E8%AE%80%E5%88%86%E9%A1%9E-%E5%80%8B%E4%BA%BA%E5%B0%88%E6%AC%84-%E5%AE%83%E9%83%BD%E8%83%BD%E6%BB%BF%E8%B6%B3%E4%BD%A0-bafyreifdlhuy33h6235jt5vk2k7fyxendykkhgixfvnzr6izu4677xtwui',
    zh_hans:
      'https://matters.news/zh-Hans/@hi176/59632-matters-%E6%A8%99%E7%B1%A4%E5%8A%9F%E8%83%BD%E5%A4%A7%E9%80%B2%E5%8C%96-%E9%96%B1%E8%AE%80%E5%88%86%E9%A1%9E-%E5%80%8B%E4%BA%BA%E5%B0%88%E6%AC%84-%E5%AE%83%E9%83%BD%E8%83%BD%E6%BB%BF%E8%B6%B3%E4%BD%A0-bafyreifdlhuy33h6235jt5vk2k7fyxendykkhgixfvnzr6izu4677xtwui',
    en: 'https://matters.news/en/@hi176/59632-matters-%E6%A8%99%E7%B1%A4%E5%8A%9F%E8%83%BD%E5%A4%A7%E9%80%B2%E5%8C%96-%E9%96%B1%E8%AE%80%E5%88%86%E9%A1%9E-%E5%80%8B%E4%BA%BA%E5%B0%88%E6%AC%84-%E5%AE%83%E9%83%BD%E8%83%BD%E6%BB%BF%E8%B6%B3%E4%BD%A0-bafyreifdlhuy33h6235jt5vk2k7fyxendykkhgixfvnzr6izu4677xtwui',
  },
  circleUsage: {
    zh_hant:
      'https://matters.news/@hi176/161255-%E5%9C%8D%E7%88%90%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2021-07-30%E6%9B%B4%E6%96%B0-bafyreiccncpjoyj7jhiheljwpbwsz33wvfqyyxc6vuhf5xtb4mvpooevfy',
    zh_hans:
      'https://matters.news/zh-Hans/@hi176/161255-%E5%9C%8D%E7%88%90%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2021-07-30%E6%9B%B4%E6%96%B0-bafyreiccncpjoyj7jhiheljwpbwsz33wvfqyyxc6vuhf5xtb4mvpooevfy',
    en: 'https://matters.news/en/@hi176/161255-%E5%9C%8D%E7%88%90%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2021-07-30%E6%9B%B4%E6%96%B0-bafyreiccncpjoyj7jhiheljwpbwsz33wvfqyyxc6vuhf5xtb4mvpooevfy',
  },
  PWA: {
    zh_hant:
      'https://matters.news/@hi176/342215-%E6%8C%87%E5%8D%97-%E6%83%B3%E5%9C%A8%E6%89%8B%E6%A9%9F%E4%B8%8A%E6%96%B9%E4%BE%BF%E5%9C%B0%E4%BD%BF%E7%94%A8-matters-%E9%80%99%E8%A3%A1%E6%9C%89%E4%B8%80%E5%80%8B%E5%BE%88%E5%A5%BD%E7%9A%84%E6%96%B9%E6%B3%95-bafyreiclzb52uisucbf7gch2k2ll7mcc6kiivaxxqdqo7drnx5oj4sqvu4',
    zh_hans:
      'https://matters.news/zh-Hans/@hi176/342215-%E6%8C%87%E5%8D%97-%E6%83%B3%E5%9C%A8%E6%89%8B%E6%A9%9F%E4%B8%8A%E6%96%B9%E4%BE%BF%E5%9C%B0%E4%BD%BF%E7%94%A8-matters-%E9%80%99%E8%A3%A1%E6%9C%89%E4%B8%80%E5%80%8B%E5%BE%88%E5%A5%BD%E7%9A%84%E6%96%B9%E6%B3%95-bafyreiclzb52uisucbf7gch2k2ll7mcc6kiivaxxqdqo7drnx5oj4sqvu4',
    en: 'https://matters.news/en/@hi176/342215-%E6%8C%87%E5%8D%97-%E6%83%B3%E5%9C%A8%E6%89%8B%E6%A9%9F%E4%B8%8A%E6%96%B9%E4%BE%BF%E5%9C%B0%E4%BD%BF%E7%94%A8-matters-%E9%80%99%E8%A3%A1%E6%9C%89%E4%B8%80%E5%80%8B%E5%BE%88%E5%A5%BD%E7%9A%84%E6%96%B9%E6%B3%95-bafyreiclzb52uisucbf7gch2k2ll7mcc6kiivaxxqdqo7drnx5oj4sqvu4',
  },
  RSS: {
    zh_hant:
      'https://matters.news/@hi176/338013-%E5%8A%9F%E8%83%BD%E6%8C%87%E5%8D%97-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-%E5%85%A7%E5%AE%B9%E8%A8%82%E9%96%B1-%E4%BE%86%E8%BF%BD%E8%B9%A4%E4%BD%A0%E5%96%9C%E6%84%9B%E7%9A%84-matters-%E4%BD%9C%E8%80%85-bafyreidb42pruxqy75tybjarp6kebmf7quyn3etd6mtv7fopwve6a7mjaa',
    zh_hans:
      'https://matters.news/zh-Hans/@hi176/338013-%E5%8A%9F%E8%83%BD%E6%8C%87%E5%8D%97-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-%E5%85%A7%E5%AE%B9%E8%A8%82%E9%96%B1-%E4%BE%86%E8%BF%BD%E8%B9%A4%E4%BD%A0%E5%96%9C%E6%84%9B%E7%9A%84-matters-%E4%BD%9C%E8%80%85-bafyreidb42pruxqy75tybjarp6kebmf7quyn3etd6mtv7fopwve6a7mjaa',
    en: 'https://matters.news/en/@hi176/338013-%E5%8A%9F%E8%83%BD%E6%8C%87%E5%8D%97-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-%E5%85%A7%E5%AE%B9%E8%A8%82%E9%96%B1-%E4%BE%86%E8%BF%BD%E8%B9%A4%E4%BD%A0%E5%96%9C%E6%84%9B%E7%9A%84-matters-%E4%BD%9C%E8%80%85-bafyreidb42pruxqy75tybjarp6kebmf7quyn3etd6mtv7fopwve6a7mjaa',
  },
}

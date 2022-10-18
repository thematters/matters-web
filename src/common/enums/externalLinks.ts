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
  readerToolbox:
    'https://matters.news/@hi176/matters-%E8%AE%80%E8%80%85%E5%B7%A5%E5%85%B7%E7%AE%B1-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2022-03-%E6%9B%B4%E6%96%B0-bafyreibgaprnoj2yqeaiaox6tzl74id3yrxyynodthfby6m4fzqqzrmiym',
  authorToolbox:
    'https://matters.news/@hi176/matters-%E4%BD%9C%E8%80%85%E5%B7%A5%E5%85%B7%E7%AE%B1-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2022-03-%E6%9B%B4%E6%96%B0-bafyreiawbvrvnzhfdefybdxgq5k6llgxiuba2s2epvxy3h7ljnnnnhcmlu',
  connectWallet:
    'https://matters.news/@hi176/%E5%8A%9F%E8%83%BD%E6%9B%B4%E6%96%B0%E9%80%9A%E5%91%8A-matters-%E6%94%AF%E6%8F%B4%E5%8A%A0%E5%AF%86%E9%8C%A2%E5%8C%85%E8%A8%BB%E5%86%8A%E8%88%87%E7%99%BB%E5%85%A5-bafyreibeky22nzniyyuggrpwt62sx6dbmvlsuv3g5stkm2i34kwfyuugqi',
  payment:
    'https://matters.news/@hi176/matters-%E6%94%AF%E4%BB%98%E8%88%87%E6%8F%90%E7%8F%BE%E5%8A%9F%E8%83%BD%E6%8C%87%E5%8D%97-2020-08-14%E6%9B%B4%E6%96%B0-bafyreicfgnpk4jamnhkjecq32kdlmhhtp6xrwpkxoalp37wayd4sqmjo54',
  withdrawal:
    'https://matters.news/@hi176/matters-%E6%8F%90%E7%8F%BE%E6%8C%87%E5%8D%97-%E8%B7%9F%E8%91%97%E6%AD%A5%E9%A9%9F%E8%B5%B0-%E6%8A%8A%E9%8C%A2%E9%A0%98%E5%88%B0%E4%BD%A0%E7%9A%84%E6%88%B6%E9%A0%AD%E8%A3%A1-bafyreihdpedvodp3pk66blu545oti2yu7tufvrlxrwlevfuk7vei2hgpli',
  tagUsage:
    'https://matters.news/@hi176/matters-%E6%A8%99%E7%B1%A4%E5%8A%9F%E8%83%BD%E5%A4%A7%E9%80%B2%E5%8C%96-%E9%96%B1%E8%AE%80%E5%88%86%E9%A1%9E-%E5%80%8B%E4%BA%BA%E5%B0%88%E6%AC%84-%E5%AE%83%E9%83%BD%E8%83%BD%E6%BB%BF%E8%B6%B3%E4%BD%A0-bafyreifdlhuy33h6235jt5vk2k7fyxendykkhgixfvnzr6izu4677xtwui',
  circleUsage:
    'https://matters.news/@hi176/%E5%9C%8D%E7%88%90%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97-%E6%96%B0%E6%89%8B%E5%BF%85%E7%9C%8B-2021-07-30%E6%9B%B4%E6%96%B0-bafyreiccncpjoyj7jhiheljwpbwsz33wvfqyyxc6vuhf5xtb4mvpooevfy',
}

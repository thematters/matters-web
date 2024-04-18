const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production'

export const EXTERNAL_LINKS = {
  FACEBOOK: 'https://www.facebook.com/MattersLab2018',
  WEIBO: 'https://weibo.com/6695370718/profile?topnav=1&wvr=6',
  TELEGRAM: 'https://t.me/joinchat/BXzlWUhXaWNZ-TXJZJCzDQ',
  LIKECOIN_LEGACY: 'https://like.co/in?legacy=1',
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
  ENS_DOCS: 'https://docs.ens.domains/',
  METAMASK: 'https://metamask.io/download/',
  MATTERS_LAB: 'https://matters-lab.io/',
  DEVELOPER_RESOURCE: 'https://thematters.github.io/developer-resource/',
  SECURITY_LINK:
    'https://thematters.github.io/developer-resource/SECURITY.html',
  BUG_REPORT: 'https://feedback.matters.town/bug-reports',
}

export const GUIDE_LINKS = {
  readerToolbox: {
    zh_hant: `https://matters.town/@hi176/387122`,
    zh_hans: `https://matters.town/@hi176/387122?locale=zh-Hans`,
    en: `https://matters.town/@hi176/387122?locale=en`,
  },
  authorToolbox: {
    zh_hant: `https://matters.town/@hi176/387126`,
    zh_hans: `https://matters.town/@hi176/387126?locale=zh-Hans`,
    en: `https://matters.town/@hi176/387126?locale=en`,
  },
  connectWallet: {
    zh_hant: `https://matters.town/@hi176/387112`,
    zh_hans: `https://matters.town/@hi176/387112?locale=zh-Hans`,
    en: `https://matters.town@hi176/387112?locale=en`,
  },
  payment: {
    zh_hant: `https://matters.town/@hi176/387119`,
    zh_hans: `https://matters.town/@hi176/387119?locale=zh-Hans`,
    en: `https://matters.town/@hi176/387119?locale=en`,
  },
  usdt: {
    zh_hant: `https://matters.town/@hi176/537407`,
    zh_hans: `https://matters.town/@hi176/537407?locale=zh-Hans`,
    en: `https://matters.town/@hi176/537407?locale=en`,
  },
  PWA: {
    zh_hant: `https://matters.town/@hi176/387115`,
    zh_hans: `https://matters.town/@hi176/387115?locale=zh-Hans`,
    en: `https://matters.town/@hi176/387115?locale=en`,
  },
  RSS: {
    zh_hant: `https://matters.town/@hi176/387116`,
    zh_hans: `https://matters.town/@hi176/387116?locale=zh-Hans`,
    en: `https://matters.town/@hi176/387116?locale=en`,
  },
  mobilePayment: {
    zh_hant: `https://matters.town/@hi176/387120`,
    zh_hans: `https://matters.town/zh_Hans/@hi176/387120?locale=zh-Hans`,
    en: `https://matters.town/@hi176/387120?locale=en`,
  },
  billboard: {
    zh_hant: `https://matters.town/@hi176/554162`,
    zh_hans: `https://matters.town/@hi176/554162?locale=zh-Hans`,
    en: `https://matters.town/@web3/554164?locale=en`,
  },
}

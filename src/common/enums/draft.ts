import { ArticleLicenseType } from '~/gql/graphql'

export const LICENSE_TEXT = {
  1: {
    [ArticleLicenseType.CcByNcNd_4]: {
      title: {
        zh_hant: '不上鎖，CC BY-NC-ND 4.0',
        zh_hans: '不上锁，CC BY-NC-ND 4.0',
        en: 'Public, CC BY-NC-ND 4.0 License',
      },
      subtitle: {
        zh_hant: '可分享，需姓名標示、非商業用途、禁止改作',
        zh_hans: '可分享，需姓名标示、非商业用途、禁止改作',
        en: 'Free to Share, Attribution, Non-Commercial, No Derivatives',
      },
      extra: {
        zh_hant: '關於 CC 4.0',
        zh_hans: '关于 CC 4.0',
        en: 'About CC 4.0',
      },
    },
    [ArticleLicenseType.Cc_0]: {
      title: {
        zh_hant: '不上鎖，CC0 公眾領域貢獻宣告',
        zh_hans: '不上锁，CC0 公众领域贡献宣告',
        en: 'Public, CC0 License',
      },
      subtitle: {
        zh_hant: '可分享，不需姓名標示、可商業用途及改作',
        zh_hans: '可分享，不需姓名标示、可商业用途及改作',
        en: 'No Copyright',
      },
      extra: { zh_hant: '', zh_hans: '', en: '' },
    },
    [ArticleLicenseType.Arr]: {
      title: {
        zh_hant: '上鎖，作者保留所有權利',
        zh_hans: '上锁，作者保留所有权利',
        en: 'Paywalled, All Rights Reserved',
      },
      subtitle: {
        zh_hant: '未訂閱者無法閱讀摘要外的正文',
        zh_hans: '未订阅者无法阅读摘要外的正文',
        en: 'Only circle members can read the full article.',
      },
      extra: { zh_hant: '', zh_hans: '', en: '' },
    },
  },
  0: {
    [ArticleLicenseType.CcByNcNd_4]: {
      title: {
        zh_hant: 'CC BY-NC-ND 4.0 授權',
        zh_hans: 'CC BY-NC-ND 4.0 许可',
        en: 'CC BY-NC-ND 4.0 License',
      },
      subtitle: {
        zh_hant: '可分享，需姓名標示、非商業用途、禁止改作',
        zh_hans: '可分享，需署名、非商业用途、禁止改作',
        en: 'Free to Share, Attribution, Non-Commercial, No Derivatives',
      },
      extra: {
        zh_hant: '關於 CC 4.0',
        zh_hans: '关于 CC 4.0',
        en: 'About CC 4.0',
      },
    },
    [ArticleLicenseType.Cc_0]: {
      title: {
        zh_hant: 'CC0 公眾領域貢獻宣告',
        zh_hans: 'CC0 公共领域贡献声明',
        en: 'CC0 Public Domain Dedication',
      },
      subtitle: {
        zh_hant: '可分享，不需姓名標示、可商業用途及改作',
        zh_hans: '可分享，无需署名、可商业用途及改作',
        en: 'No Copyright',
      },
      extra: { zh_hant: '', zh_hans: '', en: '' },
    },
    [ArticleLicenseType.Arr]: {
      title: {
        zh_hant: '作者保留所有權利',
        zh_hans: '作者保留所有权利',
        en: 'All Rights Reserved',
      },
      subtitle: {
        zh_hant: '非經作者同意，不得分享、商業用途及改作',
        zh_hans: '未经作者同意，不得分享、商业用途及改作',
        en: "No sharing, commercial use, or derivatives without the author's consent",
      },
      extra: { zh_hant: '', zh_hans: '', en: '' },
    },
  },
}

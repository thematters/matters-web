import { useContext } from 'react'

import { Form, LanguageContext, Translate } from '~/components'
import { ArticleLicenseType } from '~/gql/graphql'

interface Props {
  isInCircle: boolean
  license: ArticleLicenseType
  onChange: (license: ArticleLicenseType) => void
}

const LICENSE_TEXT = {
  1: {
    [ArticleLicenseType.CcByNcNd_4]: {
      title: {
        zh_hant: '不上鎖，CC BY-NC-ND 4.0 聲明',
        zh_hans: '不上锁，CC BY-NC-ND 4.0 声明',
        en: 'Public, CC BY-NC-ND 4.0 License',
      },
      subtitle: {
        zh_hant: '可分享，需姓名標示、非商業用途、禁止改作',
        zh_hans: '可分享，需姓名标示、非商业用途、禁止改作',
        en: 'Free to Share, Attribution, Non-Commercial, No Derivatives',
      },
    },
    [ArticleLicenseType.CcByNcNd_2]: {
      title: {
        zh_hant: '不上鎖，CC BY-NC-ND 2.0 聲明',
        zh_hans: '不上锁，CC BY-NC-ND 2.0 声明',
        en: 'Public, CC BY-NC-ND 2.0 License',
      },
      subtitle: {
        zh_hant: '可分享，需姓名標示、非商業用途、禁止改作',
        zh_hans: '可分享，需姓名标示、非商业用途、禁止改作',
        en: 'Free to Share, Attribution, Non-Commercial, No Derivatives',
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
    },
  },
  0: {
    [ArticleLicenseType.CcByNcNd_4]: {
      title: {
        zh_hant: 'CC BY-NC-ND 4.0 聲明',
        zh_hans: 'CC BY-NC-ND 4.0 声明',
        en: 'CC BY-NC-ND 4.0 License',
      },
      subtitle: {
        zh_hant: '可分享，需姓名標示、非商業用途、禁止改作',
        zh_hans: '可分享，需姓名标示、非商业用途、禁止改作',
        en: 'Free to Share, Attribution, Non-Commercial, No Derivatives',
      },
    },
    [ArticleLicenseType.CcByNcNd_2]: {
      title: {
        zh_hant: 'CC BY-NC-ND 2.0 聲明',
        zh_hans: 'CC BY-NC-ND 2.0 声明',
        en: 'CC BY-NC-ND 2.0 License',
      },
      subtitle: {
        zh_hant: '可分享，需姓名標示、非商業用途、禁止改作',
        zh_hans: '可分享，需姓名标示、非商业用途、禁止改作',
        en: 'Free to Share, Attribution, Non-Commercial, No Derivatives',
      },
    },
    [ArticleLicenseType.Cc_0]: {
      title: {
        zh_hant: 'CC0 公眾領域貢獻宣告',
        zh_hans: 'CC0 公众领域贡献宣告',
        en: 'CC0 License',
      },
      subtitle: {
        zh_hant: '可分享，不需姓名標示、可商業用途及改作',
        zh_hans: '可分享，不需姓名标示、可商业用途及改作',
        en: 'No Copyright',
      },
    },
    [ArticleLicenseType.Arr]: {
      title: {
        zh_hant: '作者保留所有權利',
        zh_hans: '作者保留所有权利',
        en: 'All Rights Reserved',
      },
      subtitle: { zh_hant: '', zh_hans: '', en: '' },
    },
  },
}

const SelectLicense = ({ isInCircle, license, onChange }: Props) => {
  const { lang } = useContext(LanguageContext)

  const options = [
    ArticleLicenseType.CcByNcNd_4,
    ArticleLicenseType.Cc_0,
    ArticleLicenseType.Arr,
  ]

  return (
    <Form.Select
      name="select-license"
      label={<Translate id="license" />}
      labelVisHidden
      title={<Translate id="license" />}
      onChange={(option) => onChange(option.value)}
      options={options.map((value) => ({
        name: LICENSE_TEXT[isInCircle ? 1 : 0][value].title[lang],
        subtitle: LICENSE_TEXT[isInCircle ? 1 : 0][value].subtitle[lang],
        value,
        selected: license === value,
      }))}
      size="sm"
    />
  )
}

export default SelectLicense

import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { Form, LanguageContext } from '~/components'
import { ArticleLicenseType } from '~/gql/graphql'

import About from './About'

interface Props {
  isInCircle: boolean
  license: ArticleLicenseType
  onChange: (license: ArticleLicenseType) => void
}

const LICENSE_TEXT = {
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
        zh_hans: 'CC BY-NC-ND 4.0 授权',
        en: 'CC BY-NC-ND 4.0 License',
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
        zh_hant: 'CC0 公眾領域貢獻宣告',
        zh_hans: 'CC0 公众领域贡献宣告',
        en: 'CC0 License',
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
        zh_hant: '作者保留所有權利',
        zh_hans: '作者保留所有权利',
        en: 'All Rights Reserved',
      },
      subtitle: { zh_hant: '', zh_hans: '', en: '' },
      extra: { zh_hant: '', zh_hans: '', en: '' },
    },
  },
}

const SelectLicense = ({ isInCircle, license, onChange }: Props) => {
  const { lang } = useContext(LanguageContext)

  const options = [
    ArticleLicenseType.CcByNcNd_4,
    ArticleLicenseType.Cc_0,
    ArticleLicenseType.Arr,
  ] as const
  const cc4link = 'https://creativecommons.org/licenses/by-nc-nd/4.0/'

  return (
    <Form.Select<ArticleLicenseType>
      label={<FormattedMessage defaultMessage="License" id="HBxXD/" />}
      onChange={(option) => onChange(option.value)}
      options={options.map((value) => {
        const extraDesc = LICENSE_TEXT[isInCircle ? 1 : 0][value].extra[lang]
        let extra: string | React.ReactNode = ''
        if (extraDesc) {
          extra = <About desc={extraDesc} url={cc4link} />
        }
        return {
          name: LICENSE_TEXT[isInCircle ? 1 : 0][value].title[lang],
          subtitle: LICENSE_TEXT[isInCircle ? 1 : 0][value].subtitle[lang],
          extra,
          value,
          selected: license === value,
        }
      })}
      size={14}
    />
  )
}

export default SelectLicense

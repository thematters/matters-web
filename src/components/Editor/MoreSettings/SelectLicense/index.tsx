import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import { LICENSE_TEXT } from '~/common/enums'
import { Form, LanguageContext } from '~/components'
import { ArticleLicenseType } from '~/gql/graphql'

import About from './About'

interface Props {
  isInCircle: boolean
  license: ArticleLicenseType
  onChange: (license: ArticleLicenseType) => void
}

const SelectLicense = ({ license, onChange }: Props) => {
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
        const extraDesc = LICENSE_TEXT[value].extra[lang]
        let extra: string | React.ReactNode = ''
        if (extraDesc) {
          extra = <About desc={extraDesc} url={cc4link} />
        }
        return {
          name: LICENSE_TEXT[value].title[lang],
          subtitle: LICENSE_TEXT[value].subtitle[lang],
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

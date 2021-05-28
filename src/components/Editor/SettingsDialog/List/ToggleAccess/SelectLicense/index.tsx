import { useContext } from 'react'

import {
  DropdownDialog,
  LanguageContext,
  Menu,
  Select,
  Translate,
} from '~/components'

import { Z_INDEX } from '~/common/enums'

import { ArticleLicenseType } from '@/__generated__/globalTypes'

interface Props {
  isInCircle: boolean
  license: ArticleLicenseType
  onSelect: (license: ArticleLicenseType) => void
}

const SelectLicenseTitle = (
  <Translate zh_hant="版權聲明" zh_hans="版权声明" en="Article License" />
)

const LICENSE_TEXT = {
  1: {
    [ArticleLicenseType.cc_by_nc_nd_2]: {
      title: { zh_hant: '不上鎖，CC BY-NC-ND 2.0 聲明', zh_hans: '', en: '' },
      subtitle: {
        zh_hant: '可分享，需姓名標示、非商業用途、禁止改作',
        zh_hans: '',
        en: '',
      },
    },
    [ArticleLicenseType.cc_0]: {
      title: { zh_hant: '不上鎖，CC0 公眾領域貢獻宣告', zh_hans: '', en: '' },
      subtitle: {
        zh_hant: '可分享，不需姓名標示、可商業用途及改作',
        zh_hans: '',
        en: '',
      },
    },
    [ArticleLicenseType.arr]: {
      title: { zh_hant: '上鎖，作者保留所有權利', zh_hans: '', en: '' },
      subtitle: {
        zh_hant: '未訂閱者無法閱讀摘要外的正文',
        zh_hans: '',
        en: '',
      },
    },
  },
  0: {
    [ArticleLicenseType.cc_by_nc_nd_2]: {
      title: { zh_hant: 'CC BY-NC-ND 2.0 聲明', zh_hans: '', en: '' },
      subtitle: {
        zh_hant: '可分享，需姓名標示、非商業用途、禁止改作',
        zh_hans: '',
        en: '',
      },
    },
    [ArticleLicenseType.cc_0]: {
      title: { zh_hant: 'CC0 公眾領域貢獻宣告', zh_hans: '', en: '' },
      subtitle: {
        zh_hant: '可分享，不需姓名標示、可商業用途及改作',
        zh_hans: '',
        en: '',
      },
    },
    [ArticleLicenseType.arr]: {
      title: { zh_hant: '', zh_hans: '', en: '' },
      subtitle: { zh_hant: '', zh_hans: '', en: '' },
    },
  },
}

/**
 * This sub component is for rendering options of article license.
 *
 * Usage:
 *
 * ```tsx
 *   <LicenseOptions isInCircle={isInCircle} license={license} onSelect={onSelect} />
 * ```
 */
const LicenseOptions = ({
  isInCircle,
  license,
  onSelect,
  isInDropdown,
}: Props & { isInDropdown?: boolean }) => {
  const { lang } = useContext(LanguageContext)
  const options = isInCircle
    ? [
        ArticleLicenseType.cc_by_nc_nd_2,
        ArticleLicenseType.cc_0,
        ArticleLicenseType.arr,
      ]
    : [ArticleLicenseType.cc_by_nc_nd_2, ArticleLicenseType.cc_0]

  return (
    <Menu width={isInDropdown ? 'md' : undefined}>
      {options.map((option) => {
        const licenseText = LICENSE_TEXT[isInCircle ? 1 : 0][option]
        return (
          <Select.Option
            title={licenseText.title[lang]}
            subtitle={licenseText.subtitle[lang]}
            selected={option === license}
            expanded
            key={option}
            onClick={() => onSelect(option)}
          />
        )
      })}
    </Menu>
  )
}

/**
 * This component is for rendering selected option of article license.
 *
 * Usage:
 *
 * ```tsx
 *   <SelectLicense isInCircle={isInCircle} license={license} onSelect={onSelect}/>
 * ```
 */
const SelectLicense = (props: Props) => {
  const { lang } = useContext(LanguageContext)
  const licenseText = LICENSE_TEXT[props.isInCircle ? 1 : 0][props.license]

  return (
    <Select>
      <DropdownDialog
        dropdown={{
          appendTo: 'parent',
          content: <LicenseOptions {...props} isInDropdown />,
          placement: 'bottom-end',
          zIndex: Z_INDEX.OVER_DIALOG,
        }}
        dialog={{
          content: <LicenseOptions {...props} />,
          title: SelectLicenseTitle,
        }}
      >
        {({ open, ref }) => (
          <Select.Option
            title={licenseText.title[lang]}
            subtitle={licenseText.subtitle[lang]}
            selected
            onClick={open}
            ref={ref}
          />
        )}
      </DropdownDialog>
    </Select>
  )
}

export default SelectLicense

import { useContext } from 'react'

import {
  DropdownDialog,
  LanguageContext,
  Menu,
  Select,
  Translate,
} from '~/components'

import { PAYOUT_COUNTRY, Z_INDEX } from '~/common/enums'

import styles from './styles.css'

interface Props {
  country: PAYOUT_COUNTRY
  onClick: (country: PAYOUT_COUNTRY) => void
}

const COUNTRY_TEXT = {
  Australia: { zh_hant: '澳大利亞', zh_hans: '澳大利亚', en: '' },
  Austria: { zh_hant: '奧地利', zh_hans: '奥地利', en: '' },
  Belgium: { zh_hant: '比利時', zh_hans: '比利时', en: '' },
  Bulgaria: { zh_hant: '保加利亞', zh_hans: '保加利亚', en: '' },
  Canada: { zh_hant: '加拿大', zh_hans: '加拿大', en: '' },
  Cyprus: { zh_hant: '塞浦路斯', zh_hans: '塞浦路斯', en: '' },
  Denmark: { zh_hant: '丹麥', zh_hans: '丹麦', en: '' },
  Estonia: { zh_hant: '愛沙尼亞', zh_hans: '爱沙尼亚', en: '' },
  Finland: { zh_hant: '芬蘭', zh_hans: '芬兰', en: '' },
  France: { zh_hant: '法國', zh_hans: '法国', en: '' },
  Germany: { zh_hant: '德國', zh_hans: '德国', en: '' },
  Greece: { zh_hant: '希臘', zh_hans: '希腊', en: '' },
  HongKong: { zh_hant: '香港', zh_hans: '香港', en: 'Hong Kong' },
  Ireland: { zh_hant: '愛爾蘭', zh_hans: '爱尔兰', en: '' },
  Italy: { zh_hant: '意大利', zh_hans: '意大利', en: '' },
  Latvia: { zh_hant: '拉脫維亞', zh_hans: '拉脱维亚', en: '' },
  Lithuania: { zh_hant: '立陶宛', zh_hans: '立陶宛', en: '' },
  Luxembourg: { zh_hant: '盧森堡', zh_hans: '卢森堡', en: '' },
  Malta: { zh_hant: '馬耳他', zh_hans: '马耳他', en: '' },
  Netherlands: { zh_hant: '荷蘭', zh_hans: '荷兰', en: '' },
  NewZealand: { zh_hant: '新西蘭', zh_hans: '新西兰', en: 'New Zealand' },
  Norway: { zh_hant: '挪威', zh_hans: '挪威', en: '' },
  Poland: { zh_hant: '波蘭', zh_hans: '波兰', en: '' },
  Portugal: { zh_hant: '葡萄牙', zh_hans: '葡萄牙', en: '' },
  Romania: { zh_hant: '羅馬尼亞', zh_hans: '罗马尼亚', en: '' },
  Singapore: { zh_hant: '新加坡', zh_hans: '新加坡', en: '' },
  Slovakia: { zh_hant: '斯洛伐克', zh_hans: '斯洛伐克', en: '' },
  Slovenia: { zh_hant: '斯洛文尼亞', zh_hans: '斯洛文尼亚', en: '' },
  Spain: { zh_hant: '西班牙', zh_hans: '西班牙', en: '' },
  Sweden: { zh_hant: '瑞典', zh_hans: '瑞典', en: '' },
  UnitedKingdom: { zh_hant: '英國', zh_hans: '英国', en: 'United Kingdom' },
  UnitedStates: { zh_hant: '美國', zh_hans: '美国', en: 'United States' },
}

const options = Object.keys(COUNTRY_TEXT) as PAYOUT_COUNTRY[]

const SelectCountryTitle = (
  <Translate
    zh_hant="選擇你的提現帳號的國家地區"
    zh_hans="选择你的提现帐号的国家地区"
    en="Select your country to payout"
  />
)

const SelectCountryText = ({ country }: { country: PAYOUT_COUNTRY }) => {
  const { lang } = useContext(LanguageContext)
  return <>{COUNTRY_TEXT[country][lang] || country}</>
}

/**
 * This sub component is for options of Stripe supported countries.
 *
 * Usage:
 *
 * ```tsx
 *   <CountryOptions country={country} onClick={onClick} />
 * ```
 */
const CountryOptions = ({
  country,
  onClick,
  isInDropdown,
}: Props & { isInDropdown?: boolean }) => (
  <section className="optionContent">
    <Menu width={isInDropdown ? 'md' : undefined}>
      {options.map((option) => (
        <Select.Option
          title={<SelectCountryText country={option} />}
          onClick={() => onClick(option)}
          selected={country === option}
          expanded
          key={option}
        />
      ))}
    </Menu>

    <style jsx>{styles}</style>
  </section>
)

/**
 * This component is for rendering selected option of Stripe supported countries.
 *
 * Usage:
 *
 * ```tsx
 *   <SelectCountry country={country} onClick={onClick}/>
 * ```
 */
const SelectCountry = ({ country, onClick }: Props) => (
  <section className="container">
    <h3 className="title">{SelectCountryTitle}</h3>

    <Select>
      <DropdownDialog
        dropdown={{
          appendTo: 'parent',
          content: (
            <CountryOptions country={country} onClick={onClick} isInDropdown />
          ),
          placement: 'bottom-end',
          zIndex: Z_INDEX.OVER_DIALOG,
        }}
        dialog={{
          content: <CountryOptions country={country} onClick={onClick} />,
          title: SelectCountryTitle,
        }}
      >
        {({ open, ref }) => (
          <Select.Option
            title={<SelectCountryText country={country} />}
            selected
            onClick={open}
            ref={ref}
          />
        )}
      </DropdownDialog>
    </Select>

    <style jsx>{styles}</style>
  </section>
)

export default SelectCountry

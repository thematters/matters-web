import { useContext } from 'react'

import { PAYOUT_COUNTRY } from '~/common/enums'
import { Form, LanguageContext, Translate } from '~/components'

interface Props {
  country: PAYOUT_COUNTRY
  onChange: (country: PAYOUT_COUNTRY) => void
}

const COUNTRY_TEXT = {
  Australia: { zh_hant: '澳大利亞', zh_hans: '澳大利亚', en: 'Australia' },
  Austria: { zh_hant: '奧地利', zh_hans: '奥地利', en: 'Austria' },
  Belgium: { zh_hant: '比利時', zh_hans: '比利时', en: 'Belgium' },
  Bulgaria: { zh_hant: '保加利亞', zh_hans: '保加利亚', en: 'Bulgaria' },
  Canada: { zh_hant: '加拿大', zh_hans: '加拿大', en: 'Canada' },
  Cyprus: { zh_hant: '塞浦路斯', zh_hans: '塞浦路斯', en: 'Cyprus' },
  Denmark: { zh_hant: '丹麥', zh_hans: '丹麦', en: 'Denmark' },
  Estonia: { zh_hant: '愛沙尼亞', zh_hans: '爱沙尼亚', en: 'Estonia' },
  Finland: { zh_hant: '芬蘭', zh_hans: '芬兰', en: 'Finland' },
  France: { zh_hant: '法國', zh_hans: '法国', en: 'France' },
  Germany: { zh_hant: '德國', zh_hans: '德国', en: 'Germany' },
  Greece: { zh_hant: '希臘', zh_hans: '希腊', en: 'Greece' },
  HongKong: { zh_hant: '香港', zh_hans: '香港', en: 'Hong Kong' },
  Ireland: { zh_hant: '愛爾蘭', zh_hans: '爱尔兰', en: 'Ireland' },
  Italy: { zh_hant: '意大利', zh_hans: '意大利', en: 'Italy' },
  Latvia: { zh_hant: '拉脫維亞', zh_hans: '拉脱维亚', en: 'Latvia' },
  Lithuania: { zh_hant: '立陶宛', zh_hans: '立陶宛', en: 'Lithuania' },
  Luxembourg: { zh_hant: '盧森堡', zh_hans: '卢森堡', en: 'Luxembourg' },
  Malta: { zh_hant: '馬耳他', zh_hans: '马耳他', en: 'Malta' },
  Netherlands: { zh_hant: '荷蘭', zh_hans: '荷兰', en: 'Netherlands' },
  NewZealand: { zh_hant: '新西蘭', zh_hans: '新西兰', en: 'New Zealand' },
  Norway: { zh_hant: '挪威', zh_hans: '挪威', en: 'Norway' },
  Poland: { zh_hant: '波蘭', zh_hans: '波兰', en: 'Poland' },
  Portugal: { zh_hant: '葡萄牙', zh_hans: '葡萄牙', en: 'Portugal' },
  Romania: { zh_hant: '羅馬尼亞', zh_hans: '罗马尼亚', en: 'Romania' },
  Singapore: { zh_hant: '新加坡', zh_hans: '新加坡', en: 'Singapore' },
  Slovakia: { zh_hant: '斯洛伐克', zh_hans: '斯洛伐克', en: 'Slovakia' },
  Slovenia: { zh_hant: '斯洛文尼亞', zh_hans: '斯洛文尼亚', en: 'Slovenia' },
  Spain: { zh_hant: '西班牙', zh_hans: '西班牙', en: 'Spain' },
  Sweden: { zh_hant: '瑞典', zh_hans: '瑞典', en: 'Sweden' },
  UnitedKingdom: { zh_hant: '英國', zh_hans: '英国', en: 'United Kingdom' },
  UnitedStates: { zh_hant: '美國', zh_hans: '美国', en: 'United States' },
}

const SelectCountry = ({ country, onChange }: Props) => {
  const { lang } = useContext(LanguageContext)

  const options = Object.keys(COUNTRY_TEXT) as PAYOUT_COUNTRY[]

  return (
    <Form.Select<string>
      label={
        <Translate
          zh_hant="選擇你的提現帳號的國家地區"
          zh_hans="选择你的提现帐号的国家地区"
          en="Select your country to payout"
        />
      }
      onChange={(option) => onChange(option.value as PAYOUT_COUNTRY)}
      options={options.map((value) => ({
        name: COUNTRY_TEXT[value][lang],
        value,
        selected: country === value,
      }))}
    />
  )
}

export default SelectCountry

import { Translate } from '~/components'

import AnalyticsSelect from '../AnalyticsSelect'

interface Props {
  period: number
  onChange: (period: number) => void
}

const SelectPeriod = ({ period, onChange }: Props) => {
  const options = [
    {
      label: 7,
      value: (
        <>
          <Translate id="lately" /> 7{' '}
          <Translate en="days" zh_hans="天" zh_hant="天" />
        </>
      ),
    },
    {
      label: 30,
      value: (
        <>
          <Translate id="lately" /> 1{' '}
          <Translate en="month" zh_hans="个月" zh_hant="個月" />
        </>
      ),
    },
    {
      label: 90,
      value: (
        <>
          <Translate id="lately" /> 3{' '}
          <Translate en="months" zh_hans="个月" zh_hant="個月" />
        </>
      ),
    },
    {
      label: 0,
      value: (
        <>
          <Translate id="all" />
        </>
      ),
    },
  ]

  return (
    <AnalyticsSelect
      name="select-period"
      label=""
      onChange={(option) => onChange(option.value.label)}
      options={options.map((value) => ({
        name: value.value,
        value,
        selected: period === value.label,
      }))}
    />
  )
}

export default SelectPeriod

import { Form, Translate } from '~/components'

interface Props {
  period: number
  onChange: (period: number) => void
}

const SelectPeriod = ({ period, onChange }: Props) => {
  const options = [30, 90, 180, 360]

  return (
    <Form.Select
      name="period-country"
      label={
        <Translate
          zh_hant="免費資格時長"
          zh_hans="免费资格时长"
          en="Free trial period"
        />
      }
      onChange={(option) => onChange(option.value)}
      options={options.map((value) => ({
        name: (
          <>
            {value} <Translate id="days" />
          </>
        ),
        value,
        selected: period === value,
      }))}
    />
  )
}

export default SelectPeriod

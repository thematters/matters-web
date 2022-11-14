import { Form, Translate } from '~/components'

interface Props {
  period: number
  onChange: (period: number) => void
}

const SelectPeriod = ({ period, onChange }: Props) => {
  const options = [7, 30, 90, 'All']

  return (
    <Form.Select
      name="select-period"
      label=""
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

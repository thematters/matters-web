import { FormattedMessage } from 'react-intl'

import { Form } from '~/components'

interface Props {
  period: number
  onChange: (period: number) => void
}

const SelectPeriod = ({ period, onChange }: Props) => {
  const options = [30, 90, 180, 360]

  return (
    <Form.Select<number>
      label={
        <FormattedMessage defaultMessage="Free trial period" id="FmWYRt" />
      }
      onChange={(option) => onChange(option.value)}
      options={options.map((value) => ({
        name: (
          <>
            {value}
            <FormattedMessage defaultMessage="days" id="Bc20la" />
          </>
        ),
        value,
        selected: period === value,
      }))}
    />
  )
}

export default SelectPeriod

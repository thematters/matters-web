import { FormattedMessage } from 'react-intl'

import { Form } from '~/components'

interface Props {
  period: number
  onChange: (period: number) => void
}

const SelectPeriod = ({ period, onChange }: Props) => {
  const options = [30, 90, 180, 360]

  return (
    <Form.Select
      name="select-period"
      label={
        <FormattedMessage defaultMessage="Free trial period" description="src/views/Circle/Settings/ManageInvitation/AddInvitationDialog/SelectPeriod/index.tsx" />
      }
      onChange={(option) => onChange(option.value)}
      options={options.map((value) => ({
        name: (
          <>
            {value}
            <FormattedMessage defaultMessage="days" description='days' />
          </>
        ),
        value,
        selected: period === value,
      }))}
    />
  )
}

export default SelectPeriod

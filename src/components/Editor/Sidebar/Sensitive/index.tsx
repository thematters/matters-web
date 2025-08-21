import { FormattedMessage, useIntl } from 'react-intl'

import { Switch } from '~/components'

import Box from '../Box'

export type SidebarSensitiveProps = {
  sensitive: boolean
  toggleSensitive: (sensitive: boolean) => void
  sensitiveSaving: boolean
}

const SidebarSensitive: React.FC<SidebarSensitiveProps> = ({
  sensitive,
  toggleSensitive,
  sensitiveSaving,
}) => {
  const intl = useIntl()

  return (
    <Box
      title={
        <FormattedMessage defaultMessage="Restricted content" id="d5+b8r" />
      }
      subtitle={
        <FormattedMessage
          defaultMessage="Includes content that is sexual, violent, bloody, etc."
          id="PvVnlo"
        />
      }
      rightButton={
        <Switch
          name="sensitive"
          label={intl.formatMessage({
            defaultMessage: 'Restricted content',
            id: 'd5+b8r',
          })}
          checked={!!sensitive}
          onChange={() => toggleSensitive(!sensitive)}
          loading={sensitiveSaving}
        />
      }
    />
  )
}

export default SidebarSensitive

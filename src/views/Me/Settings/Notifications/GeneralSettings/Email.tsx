import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Form, Switch, ViewerContext } from '~/components'
import { ViewerNotificationsGeneralSettingsQuery } from '~/gql/graphql'

type NotificationType = NonNullable<
  NonNullable<
    ViewerNotificationsGeneralSettingsQuery['viewer']
  >['settings']['notification']
>

interface EmailProps {
  settings: NotificationType
  toggle: (type: keyof NotificationType) => void
}

const Email = ({ settings, toggle }: EmailProps) => {
  const intl = useIntl()
  const label = intl.formatMessage({
    defaultMessage: 'Matters daily report',
    description: 'src/views/Me/Settings/Notifications/Email.tsx',
  })

  const viewer = useContext(ViewerContext)
  const hasEmail = !!viewer.info.email

  return (
    <Form.List
      groupName={intl.formatMessage({
        defaultMessage: 'Email',
        description: 'src/views/Me/Settings/Notifications/Email.tsx',
      })}
      spacingX={0}
    >
      <Form.List.Item
        title={label}
        subtitle={
          <FormattedMessage
            defaultMessage="Selected activities related to you in the past 24 hours"
            description="src/views/Me/Settings/Notifications/Email.tsx"
          />
        }
        right={
          hasEmail && (
            <Switch
              name="notification-email"
              label={label}
              checked={settings.email}
              onChange={() => toggle('email')}
            />
          )
        }
        rightText={
          !hasEmail && (
            <FormattedMessage
              defaultMessage="Please add email first"
              description="src/views/Me/Settings/Notifications/GeneralSettings/Email.tsx"
            />
          )
        }
        rightTextColor={!hasEmail ? 'grey' : undefined}
      />
    </Form.List>
  )
}
export default Email

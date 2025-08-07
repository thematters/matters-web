import { FormattedMessage, useIntl } from 'react-intl'

import { Switch } from '~/components'
import {
  ArticleLicenseType,
  DigestRichCirclePublicFragment,
} from '~/gql/graphql'

import Box from '../Box'

export type SidebarCircleProps = {
  license: ArticleLicenseType
  circle?: DigestRichCirclePublicFragment | null
  editAccess: (
    addToCircle: boolean,
    paywalled: boolean,
    license: ArticleLicenseType
  ) => void
  saving: boolean
}

const SidebarCircle: React.FC<SidebarCircleProps> = ({
  license,
  circle,
  editAccess,
  saving,
}) => {
  const intl = useIntl()

  const displayName = circle?.displayName

  return (
    <Box
      title={<FormattedMessage defaultMessage="Join the Circle" id="0r9bbv" />}
      subtitle={
        <>
          {!!circle ? (
            displayName
          ) : (
            <FormattedMessage
              defaultMessage="Connect long-term interactions between you and your readers"
              id="q7nV87"
            />
          )}
        </>
      }
      rightButton={
        <Switch
          name="circle"
          label={intl.formatMessage({
            defaultMessage: 'Join the Circle',
            id: '0r9bbv',
          })}
          checked={!!circle}
          onChange={() =>
            editAccess(!circle, license === ArticleLicenseType.Arr, license)
          }
          loading={saving}
        />
      }
    />
  )
}

export default SidebarCircle

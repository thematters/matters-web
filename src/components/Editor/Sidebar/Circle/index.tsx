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
  checked: boolean
}

const SidebarCircle: React.FC<SidebarCircleProps> = ({
  license,
  circle,
  editAccess,
  saving,
  checked,
}) => {
  const intl = useIntl()

  const displayName = circle?.displayName

  return (
    <Box
      title={<FormattedMessage defaultMessage="Join the Circle" id="0r9bbv" />}
      subtitle={<>{displayName}</>}
      rightButton={
        <Switch
          name="circle"
          label={intl.formatMessage({
            defaultMessage: 'Join the Circle',
            id: '0r9bbv',
          })}
          checked={checked}
          onChange={() =>
            editAccess(!checked, license === ArticleLicenseType.Arr, license)
          }
          loading={saving}
        />
      }
    />
  )
}

export default SidebarCircle

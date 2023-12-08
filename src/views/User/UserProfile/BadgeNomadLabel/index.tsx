import { FormattedMessage } from 'react-intl'

import { Tooltip } from '~/components'
import { UserStatus } from '~/gql/graphql'

import { BadgeNomadDialog } from '../BadgeNomadDialog'
import { NomadBadge } from '../Badges'
import styles from './styles.module.css'

type BadgeNomadLabelProps = {
  hasTooltip?: boolean
  nomadBadgeLevel: 1 | 2 | 3 | 4
  totalReferredCount?: UserStatus['totalReferredCount']
  shareLink?: string
  // defaultShowDialog: boolean
}

export const BadgeNomadLabel: React.FC<BadgeNomadLabelProps> = ({
  hasTooltip,
  nomadBadgeLevel,
  totalReferredCount,
  shareLink,
  // defaultShowDialog,
}) => (
  <BadgeNomadDialog
    nomadBadgeLevel={nomadBadgeLevel}
    totalReferredCount={totalReferredCount}
    shareLink={shareLink}
  >
    {({ openDialog }) => {
      const Content = (
        <span
          className={styles.badge}
          onClick={() => {
            openDialog()
          }}
        >
          <NomadBadge level={nomadBadgeLevel!} />
        </span>
      )

      return (
        <>
          {hasTooltip && (
            <Tooltip
              content={
                <FormattedMessage
                  defaultMessage="Badge Name"
                  id="iIa+u8"
                  description="src/views/User/UserProfile/BadgeNomadLabel/index.tsx"
                />
              }
              placement="top"
            >
              {Content}
            </Tooltip>
          )}

          {!hasTooltip && Content}
        </>
      )
    }}
  </BadgeNomadDialog>
)

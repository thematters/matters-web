import { useIntl } from 'react-intl'

import { Drawer } from '~/components'

import { Content } from './Content'
import styles from './styles.module.css'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  shortHash: string
  totalParticipants: number
}

export const ParticipantsDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  shortHash,
  totalParticipants,
}) => {
  const intl = useIntl()
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <Drawer.Header
        title={
          <>
            {intl.formatMessage({
              defaultMessage: 'Writers',
              description:
                'src/views/CampaignDetail/SideParticipants/index.tsx',
              id: 'xl95XN',
            })}{' '}
            {totalParticipants > 0 && (
              <span className={styles.count}>{totalParticipants}</span>
            )}
          </>
        }
        closeDrawer={onClose}
        fixedWidth
      />
      <Drawer.Content fixedWidth>
        <Content />
      </Drawer.Content>
    </Drawer>
  )
}

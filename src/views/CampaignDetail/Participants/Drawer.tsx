import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'

import { Drawer, SpinnerBlock } from '~/components'

import styles from './styles.module.css'

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  totalParticipants: number
}

export const ParticipantsDrawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  totalParticipants,
}) => {
  const intl = useIntl()
  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <Drawer.Header
        title={
          <>
            {intl.formatMessage({
              defaultMessage: 'Participants',
              id: 'zx0myy',
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
        <DynamicContent type="drawer" />
      </Drawer.Content>
    </Drawer>
  )
}

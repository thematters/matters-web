import IconTimes from '@/public/static/icons/24px/times.svg'
import { Avatar, Button, Icon } from '~/components'

import Assets from '../Assets'
import styles from './styles.module.css'

interface MomentDigestDetailPlaceholderProps {
  onClose: () => void
}

const Placeholder = ({ onClose }: MomentDigestDetailPlaceholderProps) => {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <section className={styles.left}>
          <section className={styles.author}>
            <Avatar.Placeholder size={40} />

            <section className={styles.info}>
              <section className={styles.top}>
                <div className={styles.displayNamePlaceholder} />
              </section>
              <div className={styles.createdAtPlaceholder} />
            </section>
          </section>
        </section>
        <section className={styles.right}>
          <Button textColor="greyDarker" textActiveColor="black">
            <Icon icon={IconTimes} onClick={onClose} size={22} />
          </Button>
        </section>
      </header>
      <section className={styles.content}>
        <div className={styles.contentPlaceholder} />
        <div className={styles.contentPlaceholder} />
      </section>
      <Assets.Placeholder />
    </section>
  )
}

export default Placeholder

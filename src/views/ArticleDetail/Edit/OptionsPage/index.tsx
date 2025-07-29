import { FormattedMessage } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { Button, Icon } from '~/components'

import styles from './styles.module.css'

const OptionsPage = ({ children }: { children: React.ReactNode }) => {
  const goBack = () => {
    window.history.back()
  }

  return (
    <section className={styles.container}>
      <section className={styles.header}>
        <section>
          <h1>
            <FormattedMessage defaultMessage="Options" id="NDV5Mq" />
          </h1>
        </section>
        <section>
          <Button
            textColor="black"
            textActiveColor="greyDarker"
            onClick={goBack}
          >
            <Icon icon={IconTimes} size={24} />
          </Button>
        </section>
      </section>
      {children}
    </section>
  )
}

export default OptionsPage

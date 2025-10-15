import { FormattedMessage } from 'react-intl'

import styles from './styles.module.css'

const Header = () => {
  return (
    <section className={styles.header}>
      <h1>
        <FormattedMessage
          defaultMessage="Events"
          id="JyfFVp"
          description="src/views/Campaigns/index.tsx"
        />
      </h1>
      <p className={styles.description}>
        <FormattedMessage
          defaultMessage="Connecting through literature, exchanging art, and engaging with the community"
          id="7hgQbi"
          description="src/views/Campaigns/index.tsx"
        />
      </p>
    </section>
  )
}

export default Header

import { FormattedMessage } from 'react-intl'

import styles from './styles.module.css'

type EndOfResultsProps = {
  message?: React.ReactNode
}

const EndOfResults: React.FC<EndOfResultsProps> = ({ message }) => {
  return (
    <section className={styles.endOfResults}>
      {typeof message === 'boolean' && message ? (
        <FormattedMessage
          defaultMessage="That's all"
          id="B2As08"
          description="src/components/Interaction/InfiniteScroll/EndOfResults/index.tsx"
        />
      ) : (
        message
      )}
    </section>
  )
}

export default EndOfResults

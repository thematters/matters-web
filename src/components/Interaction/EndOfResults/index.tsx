import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import { capitalizeFirstLetter } from '~/common/utils'

import styles from './styles.module.css'

type EndOfResultsProps = {
  message?: React.ReactNode
  spacingTop?: 'base' | 'xLoose'
}

const EndOfResults: React.FC<EndOfResultsProps> = ({
  message,
  spacingTop = 'xLoose',
}) => {
  const containerClasses = classNames({
    [styles.endOfResults]: true,
    [styles[`spacingTop${capitalizeFirstLetter(spacingTop)}`]]: true,
    ['endOfResults']: true,
  })
  return (
    <section className={containerClasses}>
      <span className={styles.endOfResultsIcon} />
      {typeof message === 'boolean' && message ? (
        <FormattedMessage
          defaultMessage="Done"
          id="UMCQ4G"
          description="src/components/Interaction/"
        />
      ) : (
        message
      )}
      <span className={styles.endOfResultsIcon} />
    </section>
  )
}

export default EndOfResults

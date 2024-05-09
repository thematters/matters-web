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
  })
  return (
    <section className={containerClasses}>
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

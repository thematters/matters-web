import { FormattedMessage } from 'react-intl'

import { Button, ButtonProps, Spinner } from '~/components'

import styles from './styles.module.css'

type ViewMoreButtonProps = {
  loading?: boolean
} & ButtonProps

export const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  loading,
  ...props
}) => (
  <div className={styles.container}>
    {loading ? (
      <Spinner />
    ) : (
      <Button
        spacing={['xtight', 'base']}
        borderColor="greyLighter"
        borderRadius="5rem"
        textColor="black"
        {...props}
      >
        <FormattedMessage defaultMessage="View All" id="wbcwKd" />
      </Button>
    )}
  </div>
)

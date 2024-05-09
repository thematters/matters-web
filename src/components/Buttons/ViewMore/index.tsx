import { FormattedMessage } from 'react-intl'

import { Button, ButtonProps, SpinnerBlock, TextIcon } from '~/components'

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
      <SpinnerBlock />
    ) : (
      <Button
        spacing={[8, 16]}
        borderColor="greyLighter"
        borderRadius="5rem"
        textColor="black"
        {...props}
      >
        <TextIcon size={14}>
          <FormattedMessage defaultMessage="View All" id="wbcwKd" />
        </TextIcon>
      </Button>
    )}
  </div>
)

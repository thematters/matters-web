import { FormattedMessage } from 'react-intl'

import { ReactComponent as IconDown } from '@/public/static/icons/24px/down.svg'
import { Button, ButtonProps, Icon, SpinnerBlock, TextIcon } from '~/components'

import styles from './styles.module.css'

type ViewMoreCommentButtonProps = {
  loading?: boolean
  placeholder?: React.ReactNode
} & ButtonProps

export const ViewMoreCommentButton: React.FC<ViewMoreCommentButtonProps> = ({
  loading,
  placeholder,
  ...props
}) => (
  <div className={styles.container}>
    {loading ? (
      placeholder || <SpinnerBlock />
    ) : (
      <Button spacing={['xtight', 0]} textColor="greyDarker" {...props}>
        <TextIcon icon={<Icon icon={IconDown} />} spacing="xxtight">
          <FormattedMessage defaultMessage="View More" id="QQSdHP" />
        </TextIcon>
      </Button>
    )}
  </div>
)

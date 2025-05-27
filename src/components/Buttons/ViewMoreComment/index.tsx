import { FormattedMessage } from 'react-intl'

import IconDown from '@/public/static/icons/24px/down.svg'
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
      <Button spacing={[8, 0]} textColor="greyDarker" {...props}>
        <TextIcon icon={<Icon icon={IconDown} />} spacing={4}>
          <FormattedMessage defaultMessage="View More" id="QQSdHP" />
        </TextIcon>
      </Button>
    )}
  </div>
)

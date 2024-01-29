import { FormattedMessage } from 'react-intl'

import {
  Button,
  ButtonProps,
  IconArrowDown16,
  Spinner,
  TextIcon,
} from '~/components'

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
      !!placeholder ? (
        placeholder
      ) : (
        <Spinner />
      )
    ) : (
      <Button spacing={['xtight', 0]} textColor="greyDarker" {...props}>
        <TextIcon icon={<IconArrowDown16 />} spacing="xxtight">
          <FormattedMessage defaultMessage="View More" id="QQSdHP" />
        </TextIcon>
      </Button>
    )}
  </div>
)

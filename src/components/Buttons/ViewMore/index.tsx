import { FormattedMessage } from 'react-intl'

import {
  Button,
  ButtonProps,
  IconArrowDown16,
  Spinner,
  TextIcon,
} from '~/components'

import styles from './styles.css'

type ViewMoreButtonProps = {
  loading?: boolean
} & ButtonProps

export const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  loading,
  ...props
}) => (
  <div className="container">
    {loading ? (
      <Spinner />
    ) : (
      <Button
        size={[null, '1.25rem']}
        spacing={[0, 'xtight']}
        bgColor="green"
        {...props}
      >
        <TextIcon
          icon={<IconArrowDown16 size="xs" />}
          size="xs"
          color="white"
          weight="md"
          textPlacement="left"
        >
          <FormattedMessage defaultMessage="View More" description="src/components/Buttons/ViewMore/index.tsx" />
        </TextIcon>
      </Button>
    )}

    <style jsx>{styles}</style>
  </div>
)

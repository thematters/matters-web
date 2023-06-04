import {
  Button,
  ButtonProps,
  IconArrowDown16,
  Spinner,
  TextIcon,
  Translate,
} from '~/components'

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
          <Translate zh_hans="查看更多" zh_hant="查看更多" en="View More" />
        </TextIcon>
      </Button>
    )}
  </div>
)

import {
  Button,
  ButtonProps,
  Icon,
  Spinner,
  TextIcon,
  Translate
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
          icon={<Icon.Down size="xs" />}
          size="xs"
          color="white"
          weight="md"
          textPlacement="left"
        >
          <Translate zh_hans="查看更多" zh_hant="查看更多" />
        </TextIcon>
      </Button>
    )}

    <style jsx>{styles}</style>
  </div>
)

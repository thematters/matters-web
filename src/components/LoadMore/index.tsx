import { Button, Icon, TextIcon, Translate } from '~/components'

import { Spinner } from '../Spinner'
import styles from './styles.css'

export const LoadMore = ({
  onClick,
  text,
  loading
}: {
  onClick: () => void
  text?: any
  loading?: boolean
}) => (
  <div className="container">
    {loading ? (
      <Spinner />
    ) : (
      <Button
        size={[null, '1.25rem']}
        spacing={[0, 'xtight']}
        bgColor="green"
        onClick={onClick}
      >
        <TextIcon
          size="xs"
          color="white"
          weight="md"
          textPlacement="left"
          icon={<Icon.Down size="xs" />}
        >
          {text ? text : <Translate zh_hans="查看更多" zh_hant="查看更多" />}
        </TextIcon>
      </Button>
    )}

    <style jsx>{styles}</style>
  </div>
)

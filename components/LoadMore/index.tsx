import { Button, Translate } from '~/components'

import styles from './styles.css'

export const LoadMore = ({
  onClick,
  text
}: {
  onClick: () => void
  text?: any
}) => (
  <div className="container">
    <Button
      bgColor="green-lighter"
      outlineColor="green"
      spacing="loose"
      onClick={onClick}
    >
      {text ? text : <Translate zh_hans="查看更多" zh_hant="查看更多" />}
    </Button>
    <style jsx>{styles}</style>
  </div>
)

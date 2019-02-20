import styles from './styles.css'

import { Button, Translate } from '~/components'

export const LoadMore = ({ onClick }: { onClick: () => void }) => (
  <div className="container">
    <Button
      bgColor="green-lighter"
      outlineColor="green"
      spacing="loose"
      onClick={onClick}
    >
      <Translate zh_hans="查看更多" zh_hant="查看更多" />
    </Button>
    <style jsx>{styles}</style>
  </div>
)

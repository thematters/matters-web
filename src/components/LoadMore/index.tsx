import { Button, Translate } from '~/components'

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
        bgColor="green-lighter"
        outlineColor="green"
        spacing="x-loose"
        onClick={onClick}
      >
        {text ? text : <Translate zh_hans="查看更多" zh_hant="查看更多" />}
      </Button>
    )}

    <style jsx>{styles}</style>
  </div>
)

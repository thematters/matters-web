import ArticleDigestFeedPlaceholder from '~/components/ArticleDigest/Feed/Placeholder'

import styles from './styles.module.css'

type PlaceholderProps = {
  count?: number
  spacing?: boolean
}

export default function Placeholder({ count = 10, spacing }: PlaceholderProps) {
  const className = spacing ? styles.spacing16 : ''
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <ArticleDigestFeedPlaceholder key={index} />
      ))}
    </div>
  )
}

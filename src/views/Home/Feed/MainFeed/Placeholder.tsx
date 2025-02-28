import ArticleDigestFeedPlaceholder from '~/components/ArticleDigest/Feed/Placeholder'

import styles from './styles.module.css'

type PlaceholderProps = {
  spacing?: boolean
}

export default function Placeholder({ spacing }: PlaceholderProps) {
  const className = spacing ? styles.spacing16 : ''
  return (
    <div className={className}>
      <ArticleDigestFeedPlaceholder />
      <ArticleDigestFeedPlaceholder />
      <ArticleDigestFeedPlaceholder />
      <ArticleDigestFeedPlaceholder />
      <ArticleDigestFeedPlaceholder />
      <ArticleDigestFeedPlaceholder />
      <ArticleDigestFeedPlaceholder />
      <ArticleDigestFeedPlaceholder />
      <ArticleDigestFeedPlaceholder />
      <ArticleDigestFeedPlaceholder />
    </div>
  )
}

import React from 'react'

import ArticleDigestFeedPlaceholder from '~/components/ArticleDigest/Feed/Placeholder'

import styles from './styles.module.css'

interface ArticleFeedPlaceholderProps {
  count?: number
  spacing?: boolean
}

export const ArticleFeedPlaceholder: React.FC<ArticleFeedPlaceholderProps> = ({
  count = 10,
  spacing = false,
}) => {
  const className = spacing ? styles.spacing16 : ''
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <ArticleDigestFeedPlaceholder key={index} />
      ))}
    </div>
  )
}

import React from 'react'

import { ArticleDigestFeed } from '~/components'

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
        <ArticleDigestFeed.Placeholder key={index} />
      ))}
    </div>
  )
}

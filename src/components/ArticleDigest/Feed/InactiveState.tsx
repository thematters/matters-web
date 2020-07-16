import { gql } from '@apollo/client'

import { IconArchiveMedium, TextIcon, Translate } from '~/components'

import styles from './styles.css'

import { InactiveStateArticle } from './__generated__/InactiveStateArticle'

const fragments = {
  article: gql`
    fragment InactiveStateArticle on Article {
      id
      articleState: state
    }
  `,
}

const InactiveState = ({ article }: { article: InactiveStateArticle }) => {
  if (article.articleState === 'active') {
    return null
  }

  return (
    <span className="inactive-state">
      <TextIcon icon={<IconArchiveMedium />} size="xs">
        <Translate zh_hant="已站內隱藏" zh_hans="已站内隐藏" />
      </TextIcon>

      <style jsx>{styles}</style>
    </span>
  )
}

InactiveState.fragments = fragments

export default InactiveState

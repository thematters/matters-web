import gql from 'graphql-tag'

import { Icon } from '~/components'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import styles from './styles.css'

import { StateActionsArticle } from './__generated__/StateActionsArticle'

const fragments = {
  article: gql`
    fragment StateActionsArticle on Article {
      articleState: state
    }
  `
}

const State = ({ article }: { article: StateActionsArticle }) => {
  if (article.articleState === 'active') {
    return null
  }

  return (
    <span className="state">
      <TextIcon icon={<Icon.Archive />} size="xs">
        <Translate zh_hant="已站內隱藏" zh_hans="已站内隐藏" />
      </TextIcon>

      <style jsx>{styles}</style>
    </span>
  )
}

State.fragments = fragments

export default State

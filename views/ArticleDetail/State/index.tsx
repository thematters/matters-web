import gql from 'graphql-tag'

import { Translate } from '~/components/Language'
import { Toast } from '~/components/Toast'

import { StateArticle } from './__generated__/StateArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment StateArticle on Article {
      state
    }
  `
}

const BannedHeader = () => (
  <Translate
    zh_hant="此文章因違反用戶協定而被強制隱藏。"
    zh_hans="此文章因违反用户协定而被强制隐藏。"
  />
)
const ArchivedHeader = () => (
  <Translate zh_hant="此文章已在站內隱藏。" zh_hans="此文章已在站內隐藏。" />
)

const State = ({ article }: { article: StateArticle }) => {
  const isBanned = article.state === 'banned'
  const isArchived = article.state === 'archived'

  if (article.state === 'active') {
    return null
  }

  return (
    <section className="container">
      {isBanned && <Toast color="grey" header={<BannedHeader />} />}
      {isArchived && <Toast color="grey" header={<ArchivedHeader />} />}
      <style jsx>{styles}</style>
    </section>
  )
}

State.fragments = fragments

export default State

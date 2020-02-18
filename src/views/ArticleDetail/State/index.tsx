import gql from 'graphql-tag'

import { Toast, Translate } from '~/components'

import styles from './styles.css'

import { StateArticle } from './__generated__/StateArticle'

const fragments = {
  article: gql`
    fragment StateArticle on Article {
      state
    }
  `,
  response: gql`
    fragment StateResponse on Article {
      articleState: state
    }
  `
}

const BannedHeader = () => (
  <Translate
    zh_hant="此作品因違反用戶協定而被強制隱藏。"
    zh_hans="此作品因违反用户协定而被强制隐藏。"
  />
)
const ArchivedHeader = () => (
  <Translate zh_hant="此作品已在站內隱藏。" zh_hans="此作品已在站內隐藏。" />
)

const State = ({ article }: { article: StateArticle }) => {
  const isBanned = article.state === 'banned'
  const isArchived = article.state === 'archived'

  if (article.state === 'active') {
    return null
  }

  return (
    <section className="container">
      {isBanned && <Toast.Instance color="grey" content={<BannedHeader />} />}
      {isArchived && (
        <Toast.Instance color="grey" content={<ArchivedHeader />} />
      )}
      <style jsx>{styles}</style>
    </section>
  )
}

State.fragments = fragments

export default State

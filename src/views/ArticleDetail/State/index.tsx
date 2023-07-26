import gql from 'graphql-tag'

import { Layout, Translate } from '~/components'
import { StateArticleFragment } from '~/gql/graphql'

import styles from './styles.module.css'

const fragments = {
  article: gql`
    fragment StateArticle on Article {
      state
    }
  `,
}

const BannedHeader = () => (
  <Translate
    zh_hant="此作品因違反用戶協定而被強制歸檔。"
    zh_hans="此作品因违反用户协定而被强制封存。"
    en="This work is archived due to violation of user agreement."
  />
)
const ArchivedHeader = () => (
  <Translate
    zh_hant="此作品已在站內歸檔。"
    zh_hans="此作品已在站內封存。"
    en="This work is archived on Matters."
  />
)

const State = ({ article }: { article: StateArticleFragment }) => {
  const isBanned = article.state === 'banned'
  const isArchived = article.state === 'archived'

  if (article.state === 'active') {
    return null
  }

  return (
    <section className={styles.container}>
      {isBanned && <Layout.Notice color="grey" content={<BannedHeader />} />}
      {isArchived && (
        <Layout.Notice color="grey" content={<ArchivedHeader />} />
      )}
    </section>
  )
}

State.fragments = fragments

export default State

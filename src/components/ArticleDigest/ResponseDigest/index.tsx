import gql from 'graphql-tag'

import { ArticleDigest, Icon } from '~/components'
import { Translate } from '~/components/Language'
import { UserDigest } from '~/components/UserDigest'

import { TEXT } from '~/common/enums'

import Actions, { ActionsControls } from '../Actions'
import styles from './styles.css'

import { ResponseDigestArticle } from './__generated__/ResponseDigestArticle'

const fragments = {
  response: gql`
    fragment ResponseDigestArticle on Article {
      id
      title
      slug
      cover
      summary
      mediaHash
      live
      author {
        id
        userName
        ...UserDigestMiniUser
      }
      ...ResponseDigestActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${Actions.fragments.response}
  `
}

const ResponseDigest = ({
  article,
  hasFingerprint,
  ...actionControls
}: { article: ResponseDigestArticle } & {
  hasFingerprint?: boolean
} & ActionsControls) => {
  const { author, slug, mediaHash, live } = article

  if (!author || !author.userName || !slug || !mediaHash) {
    return null
  }

  const remadeArticle = { ...article, state: article.articleState }

  return (
    <section className="container">
      <div className="header">
        <div className="avatar">
          <UserDigest.Mini user={author} avatarSize="lg" textWeight="md" />
          <span className="collected">
            <Translate
              zh_hant={TEXT.zh_hant.collected}
              zh_hans={TEXT.zh_hans.collected}
            />
          </span>
        </div>
        {live && <Icon.Live />}
      </div>

      <div className="digest-wrap">
        <ArticleDigest.Sidebar
          type="collection"
          article={remadeArticle}
          extraContainerClass="no-padding"
          {...actionControls}
        />
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

ResponseDigest.fragments = fragments

export default ResponseDigest

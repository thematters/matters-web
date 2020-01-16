import gql from 'graphql-tag'

import { ArticleDigest, Icon } from '~/components'
import { Translate } from '~/components/Language'
import { UserDigest } from '~/components/UserDigest'

import { TEXT } from '~/common/enums'

import FooterActions from '../FooterActions'
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
      ...FooterActionsArticle
    }
    ${UserDigest.Mini.fragments.user}
    ${FooterActions.fragments.article}
  `
}

const ResponseDigest = ({ article }: { article: ResponseDigestArticle }) => {
  const { author, slug, mediaHash, live } = article

  if (!author || !author.userName || !slug || !mediaHash) {
    return null
  }

  const remadeArticle = { ...article, state: article.articleState }

  return (
    <section className="container">
      <div className="header">
        <div className="avatar">
          <UserDigest.Mini
            user={author}
            avatarSize="lg"
            textSize="md-s"
            textWeight="md"
            hasAvatar
            hasDisplayName
          />

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
        />
      </div>

      <style jsx>{styles}</style>
    </section>
  )
}

ResponseDigest.fragments = fragments

export default ResponseDigest

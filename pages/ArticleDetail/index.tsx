import gql from 'graphql-tag'
import _get from 'lodash/get'
import { withRouter, WithRouterProps } from 'next/router'
import { Query, QueryResult } from 'react-apollo'

import {
  DateTime,
  Empty,
  Error,
  Footer,
  Icon,
  Placeholder,
  Spinner,
  Title,
  Translate
} from '~/components'
import { BookmarkButton } from '~/components/Button/Bookmark'
import { UserDigest } from '~/components/UserDigest'
import Content from './Content'
import MATButton from './MATButton'

import { ArticleDetail as ArticleDetailType } from './__generated__/ArticleDetail'
import styles from './styles.css'

const ARTICLE_DETAIL = gql`
  query ArticleDetail($mediaHash: String!) {
    article(input: { mediaHash: $mediaHash }) {
      id
      title
      state
      public
      live
      createdAt
      author {
        ...UserDigestFullDescUser
      }
      ...BookmarkArticle
      ...MATArticle
      ...ContentArticle
    }
  }
  ${UserDigest.FullDesc.fragments.user}
  ${BookmarkButton.fragments.article}
  ${MATButton.fragments.article}
  ${Content.fragments.article}
`

const ArticleDetail: React.FC<WithRouterProps> = ({ router }) => {
  let mediaHash = router && router.query && router.query.mediaHash
  mediaHash = mediaHash instanceof Array ? mediaHash[0] : mediaHash

  if (!mediaHash) {
    return <span>Empty</span> // TODO
  }

  return (
    <main className="l-row">
      <article className="l-col-4 l-col-md-5 l-col-lg-8">
        <Query query={ARTICLE_DETAIL} variables={{ mediaHash }}>
          {({
            data,
            loading,
            error
          }: QueryResult & { data: ArticleDetailType }) => {
            if (loading) {
              return <Placeholder.ArticleDetail />
            }

            if (error) {
              return <Error error={error} />
            }

            return (
              <>
                <section className="author">
                  <UserDigest.FullDesc user={data.article.author} />
                </section>
                <section className="title">
                  <Title type="article">{data.article.title}</Title>
                  <p className="date">
                    <DateTime date={data.article.createdAt} />
                  </p>
                </section>
                <section className="content">
                  <Content article={data.article} />
                </section>
              </>
            )
          }}
        </Query>
      </article>

      <aside className="l-col-4 l-col-md-3 l-col-lg-4">
        <Footer />
      </aside>

      <style jsx>{styles}</style>
    </main>
  )
}

export default withRouter(ArticleDetail)

import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { FormattedMessage } from 'react-intl'

import { Media } from '~/components'
import { ArticleCommentsQuery } from '~/gql/graphql'

import LatestComments from './LatestComments'
import { Placeholder } from './Placeholder'
import styles from './styles.module.css'

const ARTICLE_COMMENTS = gql`
  query ArticleComments(
    $id: ID! # $after: String # $first: first_Int_min_0 = 8
  ) {
    article: node(input: { id: $id }) {
      ... on Article {
        id
        canComment
        author {
          id
          isBlocking
        }
      }
    }
  }
`

const Comments = ({ id, lock }: { id: string; lock: boolean }) => {
  const { data, loading } = useQuery<ArticleCommentsQuery>(ARTICLE_COMMENTS, {
    variables: { id },
  })

  if (loading || !data?.article) {
    return <Placeholder />
  }

  const { article } = data

  const canComment = article.__typename === 'Article' && article.canComment
  if (!canComment) {
    return null
  }

  return (
    <section className={styles.responses}>
      <Media lessThan="md">
        <section className={styles.smTitle}>
          <FormattedMessage defaultMessage="Comment" id="LgbKvU" />
        </section>
      </Media>
      <LatestComments id={article.id} lock={lock} />
    </section>
  )
}

Comments.fragments = {
  article: gql`
    fragment CommentsArticle on Article {
      id
      author {
        id
        isBlocking
      }
    }
  `,
}

Comments.Placeholder = Placeholder

export default Comments

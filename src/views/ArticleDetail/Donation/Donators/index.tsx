import { useQuery, gql } from '@apollo/client'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import { useEventListener } from '~/components/Hook'

import { IMAGE_PIXEL, REFETCH_DONATORS } from '~/common/enums'
import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { ArticleDonators } from './__generated__/ArticleDonators'

const ARTICLE_DONATORS = gql`
  query ArticleDonators($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      transactionsReceivedBy(input: { first: 10, purpose: donation }) {
        totalCount
        edges {
          cursor
          node {
            ... on User {
              id
              ...AvatarUser
            }
          }
        }
      }
    }
  }
  ${Avatar.fragments.user}
`

const Donators = ({ mediaHash }: { mediaHash: string }) => {
  const { data, loading, refetch } = useQuery<ArticleDonators>(
    ARTICLE_DONATORS,
    {
      variables: { mediaHash },
    }
  )

  useEventListener(REFETCH_DONATORS, refetch)

  if (loading) {
    return null
  }

  if (!data || !data.article) {
    return null
  }

  const { article } = data
  const edges = article.transactionsReceivedBy.edges
  const donatorsCount = article.transactionsReceivedBy.totalCount
  const donators = (
    edges?.map(({ node }) => node).filter((user) => !!user) || []
  ).slice(0, 10)

  return (
    <section className="container">
      {donatorsCount > 0 && (
        <section className="count">
          {numAbbr(donatorsCount)}
          <Translate zh_hant={' 人支持了作者'} zh_hans={' 人支持了作者'} />
        </section>
      )}

      <section className="avatar-list">
        {donators.map((user, index) => (
          <Avatar
            user={user || undefined}
            src={user ? undefined : IMAGE_PIXEL}
            size="sm"
            key={index}
          />
        ))}
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

export default Donators

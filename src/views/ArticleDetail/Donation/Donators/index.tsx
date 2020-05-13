import gql from 'graphql-tag'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'

import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { DonatorsArticle } from './__generated__/DonatorsArticle'

const fragments = {
  article: gql`
    fragment DonatorsArticle on Article {
      id
      transactionsReceivedBy(input: { first: 15, purpose: donation }) {
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
    ${Avatar.fragments.user}
  `,
}

const Donators =({ article }: { article: DonatorsArticle }) => {
  const edges = article.transactionsReceivedBy.edges
  const donatorsCount = article.transactionsReceivedBy.totalCount
  const donators = [
    ...(edges?.map(({ node }) => node).filter((user) => !!user) || []),
  ].slice(0, 15)

  return (
    <section className="container">
      {donatorsCount > 0 && (
        <section className="count">
          <Translate
            zh_hant={`${numAbbr(donatorsCount)} 人支持了作者`}
            zh_hans={`${numAbbr(donatorsCount)} 人支持了作者`}
          />
        </section>
      )}

      <section className="avatar-list">
        {donators.map((user, index) => (
          <Avatar
            user={user || undefined}
            src={user ? undefined : 'data:image/gif;base64,'}
            size="sm"
            key={index}
          />
        ))}
      </section>
      <style jsx>{styles}</style>
    </section>
  )
}

Donators.fragments = fragments

export default Donators

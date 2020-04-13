import gql from 'graphql-tag'
import _get from 'lodash/get'

import { AppreciatorsDialog, Translate } from '~/components'
import { Avatar } from '~/components/Avatar'

import { TEXT } from '~/common/enums'
import { numAbbr } from '~/common/utils'

import styles from './styles.css'

import { AppreciatorsArticle } from './__generated__/AppreciatorsArticle'

const fragments = {
  article: gql`
    fragment AppreciatorsArticle on Article {
      id
      appreciationsReceivedTotal
      received: appreciationsReceived(input: { first: 4 }) {
        totalCount
        edges {
          cursor
          node {
            ... on Appreciation {
              sender {
                id
                ...AvatarUser
              }
            }
          }
        }
      }
      ...AppreciatorsDialogArticle
    }
    ${AppreciatorsDialog.fragments.article}
    ${Avatar.fragments.user}
  `,
}

const Appreciators = ({ article }: { article: AppreciatorsArticle }) => {
  const edges = article.received.edges
  const totalReceivedCount = article.appreciationsReceivedTotal
  const appreciatorCount = Math.min(article.received.totalCount, 99)
  const appreciators = [
    ...(edges?.map(({ node }) => node.sender).filter((user) => !!user) || []),
    null,
    null,
    null,
    null,
  ].slice(0, appreciatorCount > 4 ? 3 : 4)

  return (
    <AppreciatorsDialog article={article}>
      {({ open }) => (
        <button
          type="button"
          className="container"
          onClick={open}
          aria-label={TEXT.zh_hant.viewAppreciators}
          aria-haspopup="true"
        >
          {totalReceivedCount > 0 ? (
            <p className="received-count highlight">
              <Translate
                zh_hant={`${numAbbr(totalReceivedCount)} 贊賞`}
                zh_hans={`${numAbbr(totalReceivedCount)} 赞赏`}
              />
            </p>
          ) : (
            <p className="received-count">
              <Translate zh_hant="還沒有讚賞" zh_hans="还没有赞赏" />
            </p>
          )}

          <section className="avatar-list">
            {appreciators.map((user, index) => (
              <Avatar
                user={user || undefined}
                src={user ? undefined : 'data:image/gif;base64,'}
                size="sm"
                key={index}
              />
            ))}
            {appreciatorCount > 4 && (
              <span className="appreciator-count">{appreciatorCount}</span>
            )}
          </section>

          <style jsx>{styles}</style>
        </button>
      )}
    </AppreciatorsDialog>
  )
}

Appreciators.fragments = fragments

export default Appreciators

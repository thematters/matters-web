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
      received: appreciationsReceived(input: { first: 4 }) {
        totalCount
        edges {
          cursor
          node {
            ... on Transaction {
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
  `
}

const Appreciators = ({ article }: { article: AppreciatorsArticle }) => {
  const edges = article.received.edges
  const count = numAbbr(article.received.totalCount)
  const hasAppreciators = edges && edges.length > 0
  const appreciators = [
    ...(edges?.map(({ node }) => node.sender).filter(user => !!user) || []),
    null,
    null,
    null,
    null
  ].slice(0, 4)

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
          {hasAppreciators ? (
            <p className="count highlight">
              <Translate
                zh_hant={`${count} 人贊賞`}
                zh_hans={`${count} 人赞赏`}
              />
            </p>
          ) : (
            <p className="count">
              <Translate zh_hant="還沒有人讚賞" zh_hans="还没有人赞赏" />
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
          </section>

          <style jsx>{styles}</style>
        </button>
      )}
    </AppreciatorsDialog>
  )
}

Appreciators.fragments = fragments

export default Appreciators

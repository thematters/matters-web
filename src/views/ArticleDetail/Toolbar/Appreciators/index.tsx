import gql from 'graphql-tag'
import { useContext } from 'react'

import { IMAGE_PIXEL } from '~/common/enums'
import { numAbbr, translate } from '~/common/utils'
import { AppreciatorsDialog, LanguageContext, Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import { AppreciatorsArticleFragment } from '~/gql/graphql'

import styles from './styles.css'

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

const Appreciators = ({
  article,
}: {
  article: AppreciatorsArticleFragment
}) => {
  const { lang } = useContext(LanguageContext)

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
      {({ openDialog }) => (
        <button
          type="button"
          className="container"
          onClick={openDialog}
          disabled={totalReceivedCount <= 0}
          aria-label={translate({ id: 'viewAppreciators', lang })}
          aria-haspopup="dialog"
        >
          {totalReceivedCount > 0 ? (
            <p className="received-count highlight">
              <Translate
                zh_hant={`${numAbbr(totalReceivedCount)} 贊賞`}
                zh_hans={`${numAbbr(totalReceivedCount)} 赞赏`}
                en={`${numAbbr(totalReceivedCount)} likes`}
              />
            </p>
          ) : (
            <p className="received-count">
              <Translate
                zh_hant="還沒有讚賞"
                zh_hans="还没有赞赏"
                en="no likes yet"
              />
            </p>
          )}

          <section className="avatar-list">
            {appreciators.map((user, index) => (
              <Avatar
                user={user || undefined}
                src={user ? undefined : IMAGE_PIXEL}
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

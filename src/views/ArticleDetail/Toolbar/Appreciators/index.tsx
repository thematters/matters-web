import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Translate } from '~/components'
import { Avatar } from '~/components/Avatar'
import { ModalSwitch } from '~/components/ModalManager'

import { numAbbr } from '~/common/utils'

import { AppreciatorsArticle } from './__generated__/AppreciatorsArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment AppreciatorsArticle on Article {
      id
      appreciationsReceived(input: { first: 5 }) {
        totalCount
        edges {
          cursor
          node {
            ... on Transaction {
              sender {
                id
                userName
                displayName
                ...AvatarUser
              }
            }
          }
        }
      }
    }
    ${Avatar.fragments.user}
  `
}

const Appreciators = ({ article }: { article: AppreciatorsArticle }) => {
  const edges = article.appreciationsReceived.edges

  if (!edges || edges.length <= 0) {
    return null
  }

  return (
    <ModalSwitch modalId="appreciatorsModal">
      {(open: any) => (
        <button
          type="button"
          className="container"
          aria-label="查看所有讚賞者"
          onClick={() => open()}
        >
          <section className="avatar-list">
            {edges
              .slice(0, 5)
              .map(
                ({ node, cursor }) =>
                  node.sender && (
                    <Avatar user={node.sender} size="xsmall" key={cursor} />
                  )
              )}
          </section>
          <section className="name-list">
            <p>
              {edges
                .slice(0, 3)
                .map(({ node }) => node.sender && node.sender.displayName)
                .join('、')}
            </p>

            <p className="highlight">
              <Translate
                zh_hant={({ count }) => `等 ${count} 人贊賞了作品`}
                zh_hans={({ count }) => `等 ${count} 人赞赏了作品`}
                data={{
                  count: numAbbr(article.appreciationsReceived.totalCount)
                }}
              />
            </p>
          </section>

          <style jsx>{styles}</style>
        </button>
      )}
    </ModalSwitch>
  )
}

Appreciators.fragments = fragments

export default Appreciators

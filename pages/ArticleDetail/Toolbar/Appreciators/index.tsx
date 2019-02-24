import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Avatar } from '~/components/Avatar'

import { Translate } from '~/components'
import { AppreciatorsArticle } from './__generated__/AppreciatorsArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment AppreciatorsArticle on Article {
      id
      appreciators(input: { first: 5 }) {
        totalCount
        edges {
          cursor
          node {
            id
            userName
            displayName
            ...AvatarUser
          }
        }
      }
    }
    ${Avatar.fragments.user}
  `
}

const Appreciators = ({ article }: { article: AppreciatorsArticle }) => {
  const edges = _get(article, 'appreciators.edges')

  if (edges.length <= 0) {
    return null
  }

  return (
    <button
      type="button"
      className="container"
      aria-label="查看所有讚賞者"
      onClick={() => alert('TODO: popup modal')}
    >
      <section className="avatar-list">
        {edges
          .slice(0, 5)
          .map(({ node, cursor }: { node: any; cursor: any }) => (
            <Avatar user={node} size="xsmall" key={cursor} />
          ))}
      </section>
      <section className="name-list">
        <p>
          {edges
            .slice(0, 3)
            .map(({ node }: { node: any }) => node.displayName)
            .join('、')}
        </p>
        <p className="highlight">
          <Translate
            zh_hant={({ count }) => `等 ${count} 人贊賞了文章`}
            zh_hans={({ count }) => `等 ${count} 人赞赏了文章`}
            data={{ count: article.appreciators.totalCount }}
          />
        </p>
      </section>
      <style jsx>{styles}</style>
    </button>
  )
}

Appreciators.fragments = fragments

export default Appreciators

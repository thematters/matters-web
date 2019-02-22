import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'
import { Mutation } from 'react-apollo'

import { Icon } from '~/components'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'
import ICON_MAT_WHITE from '~/static/icons/mat-white.svg?sprite'

import { MATArticle } from './__generated__/MATArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment MATArticle on Article {
      id
      MAT
      hasAppreciate
      appreciateLimit
      appreciateLeft
    }
  `
}

const APPRECIATE_ARTICLE = gql`
  mutation AppreciateArticle($id: ID!) {
    appreciateArticle(input: { id: $id, amount: 1 }) {
      id
      MAT
      hasAppreciate
    }
  }
`

const MATButton = ({ article }: { article: MATArticle }) => {
  const containerClasses = classNames({
    container: true,
    active: article.hasAppreciate
  })
  const buttonClasses = classNames({
    'mat-button': true,
    'u-motion-icon-hover': article.appreciateLeft > 0
  })

  return (
    <Mutation
      mutation={APPRECIATE_ARTICLE}
      variables={{ id: article.id }}
      optimisticResponse={{
        appreciateArticle: {
          id: article.id,
          MAT: article.MAT + 1,
          hasAppreciate: true,
          __typename: 'Article'
        }
      }}
    >
      {(appreciate, { data }) => (
        <section className={containerClasses}>
          <button
            className={buttonClasses}
            type="button"
            onClick={() => appreciate()}
          >
            <Icon
              id={article.hasAppreciate ? ICON_MAT_WHITE.id : ICON_MAT_GOLD.id}
              viewBox={
                article.hasAppreciate
                  ? ICON_MAT_WHITE.viewBox
                  : ICON_MAT_GOLD.viewBox
              }
              style={{ width: 28, height: 28 }}
            />
          </button>
          <span className="mat-count">{article.MAT}</span>
          <style jsx>{styles}</style>
        </section>
      )}
    </Mutation>
  )
}

MATButton.fragments = fragments

export default MATButton

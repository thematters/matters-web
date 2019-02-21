import classNames from 'classnames'
import gql from 'graphql-tag'
import _get from 'lodash/get'

import { Icon } from '~/components'
import ICON_MAT_GOLD from '~/static/icons/mat-gold.svg?sprite'
import ICON_MAT_WHITE from '~/static/icons/mat-white.svg?sprite'

import { MATArticle } from './__generated__/MATArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment MATArticle on Article {
      MAT
      hasAppreciate
    }
  `
}

const MATButton = ({ article }: { article: MATArticle }) => {
  const classes = classNames({
    container: true,
    active: article.hasAppreciate
  })

  return (
    <span className={classes}>
      <button className="mat-button u-motion-icon-hover" type="button">
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
    </span>
  )
}

MATButton.fragments = fragments

export default MATButton

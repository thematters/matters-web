import gql from 'graphql-tag'

import { Icon } from '~/components/Icon'
import { Translate } from '~/components/Language'
import { TextIcon } from '~/components/TextIcon'

import ICON_ARCHIVE from '~/static/icons/archive.svg?sprite'

import { StateArticle } from './__generated__/StateArticle'
import styles from './styles.css'

const fragments = {
  article: gql`
    fragment StateArticle on Article {
      state
    }
  `
}

const State = ({ article }: { article: StateArticle }) => {
  if (article.state === 'active') {
    return null
  }

  return (
    <span className="state">
      <TextIcon
        icon={
          <Icon
            id={ICON_ARCHIVE.id}
            viewBox={ICON_ARCHIVE.viewBox}
            size="small"
          />
        }
        size="xs"
      >
        <Translate zh_hant="已站內隱藏" zh_hans="已站内隐藏" />
      </TextIcon>

      <style jsx>{styles}</style>
    </span>
  )
}

State.fragments = fragments

export default State

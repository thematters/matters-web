// import classNames from 'classnames'
import gql from 'graphql-tag'
import _uniq from 'lodash/uniq'
// import { useContext } from 'react'

import { Translate } from '~/components'
// import { HeaderContext } from '~/components/GlobalHeader/Context'

import Collapsable from '../Collapsable'
import { CollectArticlesDraft } from './__generated__/CollectArticlesDraft'
import styles from './styles.css'

const fragments = {
  draft: gql`
    fragment CollectArticlesDraft on Draft {
      id
      publishState
    }
  `
}

const CollectArticles = ({ draft }: { draft: CollectArticlesDraft }) => {
  // const { updateHeaderState } = useContext(HeaderContext)
  // const draftId = draft.id
  // const hasCollectedArticles = .length > 0
  // const isPending = draft.publishState === 'pending'
  // const isPublished = draft.publishState === 'published'
  // const containerClasses = classNames({
  //   container: true,
  //   'u-area-disable': isPending || isPublished
  // })

  return (
    <Collapsable
      title={<Translate zh_hans="關聯" zh_hant="关联" />}
      // defaultCollapsed={!hasCollectedArticles}
      defaultCollapsed
    >
      <p className="intro">
        <Translate
          zh_hant="關聯自己或他人的作品，幫助讀者更好地發現內容。"
          zh_hans="关联自己或他人的作品，帮助读者更好地发现内容。"
        />
      </p>

      <style jsx>{styles}</style>
    </Collapsable>
  )
}

CollectArticles.fragments = fragments

export default CollectArticles

import { useQuery } from '@apollo/react-hooks'
import classNames from 'classnames'
import gql from 'graphql-tag'

import { BookmarkButton, ShareButton } from '~/components'
import DropdownActions from '~/components/ArticleDigest/DropdownActions'

import AppreciationButton from './AppreciationButton'
import Appreciators from './Appreciators'
import ResponseButton from './ResponseButton'
import styles from './styles.css'

import { ArticleTool } from './__generated__/ArticleTool'

const ARTICLE_TOOL = gql`
  query ArticleTool($mediaHash: String) {
    article(input: { mediaHash: $mediaHash }) {
      id
      ...AppreciationArticleDetail
      ...AppreciatorsArticle
      ...BookmarkArticle
      ...ResponseButtonArticle
      ...DropdownActionsArticle
    }
  }
  ${AppreciationButton.fragments.article}
  ${Appreciators.fragments.article}
  ${BookmarkButton.fragments.article}
  ${ResponseButton.fragments.article}
  ${DropdownActions.fragments.article}
`

const Toolbar = ({
  mediaHash,
  placement,
  fixed,
  mobile
}: {
  mediaHash: string
  placement: 'bottom' | 'left'
  fixed?: boolean
  mobile?: boolean
}) => {
  const { data, loading } = useQuery<ArticleTool>(ARTICLE_TOOL, {
    variables: { mediaHash }
  })

  if (loading || !data || !data.article) {
    return null
  }

  const { article } = data

  if (placement === 'left') {
    return (
      <section className="toolbar-left">
        <div className="container">
          <AppreciationButton article={article} />
          <ResponseButton article={article} textPlacement="bottom" />
          <BookmarkButton article={article} size="md-s" />
          <ShareButton size="md-s" />
        </div>
        <style jsx>{styles}</style>
      </section>
    )
  }

  const bottomToolbarClass = classNames({
    'toolbar-bottom': true,
    fixed
  })

  return (
    <section className={bottomToolbarClass}>
      <section className="left">
        <AppreciationButton article={article} />
        <Appreciators article={article} />
      </section>

      <section className="right">
        {mobile && fixed && (
          <AppreciationButton article={article} inFixedToolbar />
        )}
        <ResponseButton article={article} />
        <BookmarkButton article={article} size="md-s" />
        <ShareButton size="md-s" />
        {!fixed && (
          <DropdownActions article={article} color="black" size="md-s" />
        )}
      </section>

      <style jsx>{styles}</style>
    </section>
  )
}

export default Toolbar

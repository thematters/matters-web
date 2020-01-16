import gql from 'graphql-tag'

import { BookmarkButton } from '~/components/Button/Bookmark'
import ShareButton from '~/components/Button/Share'

import { toPath } from '~/common/utils'

import Appreciation from './Appreciation'
import ResponseCount from './ResponseCount'
import styles from './styles.css'

import { FooterActionsArticle } from './__generated__/FooterActionsArticle'

interface FooterActionsProps {
  article: FooterActionsArticle
}

const fragments = {
  article: gql`
    fragment FooterActionsArticle on Article {
      id
      title
      slug
      mediaHash
      author {
        id
        userName
      }
      ...AppreciationArticle
      ...ActionsResponseCountArticle
      ...BookmarkArticle
    }
    ${Appreciation.fragments.article}
    ${ResponseCount.fragments.article}
    ${BookmarkButton.fragments.article}
  `
}

const FooterActions = ({ article }: FooterActionsProps) => {
  const { title, author, slug, mediaHash } = article
  const path = toPath({
    page: 'articleDetail',
    userName: author.userName || '',
    slug: slug || '',
    mediaHash: mediaHash || ''
  })

  return (
    <footer>
      <section className="left">
        <Appreciation article={article} size="sm" />
        <ResponseCount article={article} size="sm" />
      </section>

      <section className="right">
        {/* <DropdownActions article={article} /> */}
        <BookmarkButton article={article} size="sm" />
        <ShareButton title={title} path={path.as} color="grey" />
      </section>

      <style jsx>{styles}</style>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions

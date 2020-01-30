import gql from 'graphql-tag'

import { BookmarkButton } from '~/components/Button/Bookmark'
import ShareButton from '~/components/Button/Share'

import { toPath } from '~/common/utils'

import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import Appreciation from './Appreciation'
import ResponseCount from './ResponseCount'
import styles from './styles.css'

import { FooterActionsArticle } from './__generated__/FooterActionsArticle'

export type FooterActionsControls = DropdownActionsControls

type FooterActionsProps = {
  article: FooterActionsArticle
} & FooterActionsControls

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
      ...DropdownActionsArticle
    }
    ${Appreciation.fragments.article}
    ${ResponseCount.fragments.article}
    ${BookmarkButton.fragments.article}
    ${DropdownActions.fragments.article}
  `
}

const FooterActions = ({ article, ...controls }: FooterActionsProps) => {
  const { title } = article
  const path = toPath({
    page: 'articleDetail',
    article
  })

  return (
    <footer>
      <section className="left">
        <Appreciation article={article} size="sm" />
        <ResponseCount article={article} size="sm" />
      </section>

      <section className="right">
        <DropdownActions article={article} {...controls} />
        <BookmarkButton article={article} />
        <ShareButton title={title} path={path.as} color="grey" />
      </section>

      <style jsx>{styles}</style>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions

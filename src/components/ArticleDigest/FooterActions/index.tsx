import gql from 'graphql-tag'

import { BookmarkButton } from '~/components/Button/Bookmark'

import DropdownActions from '../DropdownActions'
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

const FooterActions = ({ article }: FooterActionsProps) => {
  return (
    <footer>
      <section className="left">
        <Appreciation article={article} size="sm" />
        <ResponseCount article={article} size="sm" />
      </section>

      <section className="right">
        <BookmarkButton article={article} size="sm" />
      </section>

      <style jsx>{styles}</style>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions

import gql from 'graphql-tag'

import { BookmarkButton } from '~/components/Buttons/Bookmark'

import DropdownActions, { DropdownActionsControls } from '../DropdownActions'
import Appreciation from './Appreciation'
import DonationCount from './DonationCount'
import styles from './styles.css'

import { FooterActionsArticlePublic } from './__generated__/FooterActionsArticlePublic'

export type FooterActionsControls = DropdownActionsControls

type FooterActionsProps = {
  article: FooterActionsArticlePublic
} & FooterActionsControls

const fragments = {
  article: {
    public: gql`
      fragment FooterActionsArticlePublic on Article {
        id
        title
        slug
        mediaHash
        author {
          id
          userName
        }
        ...AppreciationArticle
        ...DropdownActionsArticle
        ...DonationCountArticle
      }
      ${Appreciation.fragments.article}
      ${DropdownActions.fragments.article}
      ${DonationCount.fragments.article}
    `,
    private: gql`
      fragment FooterActionsArticlePrivate on Article {
        ...BookmarkArticlePrivate
      }
      ${BookmarkButton.fragments.article.private}
    `,
  },
}

const FooterActions = ({ article, ...controls }: FooterActionsProps) => {
  return (
    <footer
      aria-label={`讚賞 ${article.appreciationsReceivedTotal}、支持 ${article.transactionsReceivedBy.totalCount}`}
    >
      <section className="left">
        <Appreciation article={article} />
        {/* <ResponseCount article={article} /> */}
        <DonationCount article={article} />
      </section>

      <section className="right">
        <DropdownActions article={article} {...controls} />
        <BookmarkButton article={article} inCard={controls.inCard} />
      </section>

      <style jsx>{styles}</style>
    </footer>
  )
}

FooterActions.fragments = fragments

export default FooterActions

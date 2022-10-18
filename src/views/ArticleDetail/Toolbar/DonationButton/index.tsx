import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  Button,
  DonationDialog,
  IconDonate24,
  LanguageContext,
  LoginButton,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, TEXT } from '~/common/enums'
import { analytics, numAbbr, translate } from '~/common/utils'

import { ArticleDetailPublic_article } from '../../__generated__/ArticleDetailPublic'
import { DonationButtonArticle } from './__generated__/DonationButtonArticle'

interface DonationButtonProps {
  article: DonationButtonArticle
  disabled: boolean
  articleDetail: ArticleDetailPublic_article
}

const fragments = {
  article: gql`
    fragment DonationButtonArticle on Article {
      id
      donationsToolbar: transactionsReceivedBy(
        input: { first: 0, purpose: donation }
      ) {
        totalCount
      }
      author {
        ...UserDonationRecipient
      }
    }
    ${DonationDialog.fragments.recipient}
  `,
}

const DonationButton = ({
  article,
  disabled,
  articleDetail,
}: DonationButtonProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const forbid = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: <Translate id="FORBIDDEN_BY_STATE" />,
        },
      })
    )
  }

  const showLoginToast = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="請登入／註冊支持作者"
              zh_hans="请登入／注册支持作者"
              en="Please log in to support the author"
            />
          ),
          customButton: <LoginButton isPlain />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  const donationCount =
    article.donationsToolbar.totalCount > 0
      ? article.donationsToolbar.totalCount
      : 0

  return (
    <section className="container">
      <DonationDialog
        recipient={article.author}
        targetId={article.id}
        article={articleDetail}
      >
        {({ openDialog }) => (
          <Button
            spacing={['xtight', 'xtight']}
            bgActiveColor="grey-lighter"
            aria-label={translate({
              zh_hant: `${TEXT.zh_hant.donation}（當前 ${donationCount} 次支持）`,
              zh_hans: `${TEXT.zh_hans.donation}（当前 ${donationCount} 次支持）`,
              en: `${TEXT.en.donation} (current ${donationCount} supports)`,
              lang,
            })}
            disabled={disabled || article.author.id === viewer.id}
            onClick={() => {
              analytics.trackEvent('click_button', { type: 'donate' })
              if (!viewer.isAuthed) {
                showLoginToast()
                return
              }
              if (viewer.isFrozen) {
                forbid()
                return
              }
              openDialog()
            }}
          >
            <TextIcon
              icon={<IconDonate24 size="md-s" />}
              weight="md"
              spacing="xtight"
              size="sm"
            >
              {article.donationsToolbar.totalCount > 0
                ? numAbbr(article.donationsToolbar.totalCount)
                : undefined}
            </TextIcon>
          </Button>
        )}
      </DonationDialog>
    </section>
  )
}

DonationButton.fragments = fragments

export default DonationButton

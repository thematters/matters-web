import gql from 'graphql-tag'
import { useContext } from 'react'

import {
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEXT,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { analytics, numAbbr, translate } from '~/common/utils'
import {
  Button,
  DonationDialog,
  IconDonate24,
  LanguageContext,
  TextIcon,
  toast,
  Translate,
  ViewerContext,
} from '~/components'
import {
  ArticleDetailPublicQuery,
  DonationButtonArticleFragment,
} from '~/gql/graphql'

interface DonationButtonProps {
  article: DonationButtonArticleFragment
  disabled: boolean
  articleDetail: NonNullable<ArticleDetailPublicQuery['article']>
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
    toast.error({
      message: <Translate id="FORBIDDEN_BY_STATE" />,
    })
  }

  const donationCount =
    article.donationsToolbar.totalCount > 0
      ? article.donationsToolbar.totalCount
      : 0

  return (
    <DonationDialog
      recipient={article.author}
      targetId={article.id}
      article={articleDetail}
    >
      {({ openDialog }) => (
        <Button
          spacing={['xtight', 'xtight']}
          bgActiveColor="greyLighter"
          aria-label={translate({
            zh_hant: `${TEXT.zh_hant.donation}（當前 ${donationCount} 次支持）`,
            zh_hans: `${TEXT.zh_hans.donation}（当前 ${donationCount} 次支持）`,
            en: `${TEXT.en.donation} (current ${donationCount} supports)`,
            lang,
          })}
          aria-haspopup="dialog"
          disabled={disabled || article.author.id === viewer.id}
          onClick={() => {
            analytics.trackEvent('click_button', { type: 'donate' })
            if (!viewer.isAuthed) {
              window.dispatchEvent(
                new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                  detail: { source: UNIVERSAL_AUTH_SOURCE.support },
                })
              )
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
            icon={<IconDonate24 size="mdS" />}
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
  )
}

DonationButton.fragments = fragments

export default DonationButton

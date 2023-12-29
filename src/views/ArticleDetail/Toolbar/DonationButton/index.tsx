import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  TEXT,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics, numAbbr, translate } from '~/common/utils'
import {
  Button,
  ButtonProps,
  DonationDialog,
  IconMoney20,
  LanguageContext,
  TextIcon,
  toast,
  ViewerContext,
} from '~/components'
import {
  ArticleDetailPublicQuery,
  DonationButtonArticleFragment,
} from '~/gql/graphql'

export type DonationButtonProps = {
  article: DonationButtonArticleFragment
  articleDetail: NonNullable<ArticleDetailPublicQuery['article']>
  iconSize?: 'mdS' | 'md'
  textIconSpacing?: 'xxtight' | 'xtight' | 'basexxtight'
} & ButtonProps

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
  articleDetail,
  iconSize = 'mdS',
  textIconSpacing = 'basexxtight',
  ...buttonProps
}: DonationButtonProps) => {
  const viewer = useContext(ViewerContext)
  const { lang } = useContext(LanguageContext)

  const forbid = () => {
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
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
          aria-label={translate({
            zh_hant: `${TEXT.zh_hant.donation}（當前 ${donationCount} 次支持）`,
            zh_hans: `${TEXT.zh_hans.donation}（当前 ${donationCount} 次支持）`,
            en: `${TEXT.en.donation} (current ${donationCount} supports)`,
            lang,
          })}
          aria-haspopup="dialog"
          disabled={article.author.id === viewer.id}
          onClick={() => {
            analytics.trackEvent('click_button', { type: 'donate' })
            if (!viewer.isAuthed) {
              window.dispatchEvent(
                new CustomEvent(OPEN_UNIVERSAL_AUTH_DIALOG, {
                  detail: { trigger: UNIVERSAL_AUTH_TRIGGER.support },
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
          {...buttonProps}
        >
          <TextIcon
            icon={<IconMoney20 size={iconSize} />}
            weight="md"
            spacing={textIconSpacing}
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

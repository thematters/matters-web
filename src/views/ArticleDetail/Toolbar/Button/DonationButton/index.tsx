import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconMoney from '@/public/static/icons/24px/money.svg'
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics, numAbbr } from '~/common/utils'
import {
  Button,
  ButtonProps,
  Icon,
  TextIcon,
  toast,
  ViewerContext,
} from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'
import { SupportDialog } from '~/views/ArticleDetail/Support/SupportDialog'

export type DonationButtonProps = {
  articleDetail: NonNullable<ArticleDetailPublicQuery['article']>
  iconSize?: 20 | 24
  textWeight?: 'medium' | 'normal'
  textIconSpacing?: 4 | 6 | 8
  resideIn?: string
} & ButtonProps

const fragments = {
  article: gql`
    fragment DonationButtonArticle on Article {
      id
      author {
        ...UserDonationRecipient
      }
    }
    ${SupportDialog.fragments.recipient}
  `,
}

const DonationButton = ({
  articleDetail,
  iconSize = 20,
  textWeight = 'medium',
  textIconSpacing = 6,
  resideIn,
  ...buttonProps
}: DonationButtonProps) => {
  const viewer = useContext(ViewerContext)
  const intl = useIntl()

  const forbid = () => {
    toast.error({
      message: (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  const donationCount =
    articleDetail.donations.totalCount > 0
      ? articleDetail.donations.totalCount
      : 0

  return (
    <SupportDialog article={articleDetail}>
      {({ openDialog }) => (
        <Button
          spacing={[8, 8]}
          aria-label={intl.formatMessage(
            {
              defaultMessage:
                'Support author (current {donationCount} supports)',

              id: 'KBeSFM',
            },
            { donationCount }
          )}
          aria-haspopup="dialog"
          disabled={articleDetail.author.id === viewer.id}
          onClick={() => {
            analytics.trackEvent('click_button', {
              type: resideIn === 'fixedToolbar' ? 'support_open' : 'donate',
              pageType: 'article_detail',
              pageComponent:
                resideIn === 'fixedToolbar'
                  ? 'article_fixed_toolbar'
                  : undefined,
            })
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
            icon={<Icon icon={IconMoney} size={iconSize} />}
            weight={textWeight}
            spacing={donationCount > 0 ? textIconSpacing : 0}
            size={14}
          >
            {donationCount > 0 ? numAbbr(donationCount) : undefined}
          </TextIcon>
        </Button>
      )}
    </SupportDialog>
  )
}

DonationButton.fragments = fragments

export default DonationButton

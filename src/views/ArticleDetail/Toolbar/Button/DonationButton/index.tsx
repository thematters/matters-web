import gql from 'graphql-tag'
import { useContext } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import IconMoney from '@/public/static/icons/24px/money.svg'
import {
  BREAKPOINTS,
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
  Tooltip,
  useMediaQuery,
  ViewerContext,
} from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'
import { SupportDialog } from '~/views/ArticleDetail/Support/SupportDialog'

import styles from '../styles.module.css'

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
  const isMdUp = useMediaQuery(`(min-width: ${BREAKPOINTS.LG}px)`)

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

  const isDisabled = articleDetail.author.id === viewer.id

  return (
    <SupportDialog article={articleDetail}>
      {({ openDialog }) => (
        <Tooltip
          disabled={!isMdUp || isDisabled}
          content={
            <span className={styles.hotKeyTooltip}>
              <FormattedMessage
                defaultMessage="Support Author"
                id="iqS81J"
                description="src/views/ArticleDetail/Toolbar/FixedToolbar/index.tsx"
              />
              &nbsp;
              <span className={styles.key}>(d)</span>
            </span>
          }
          placement="top"
          delay={[500, null]}
        >
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
            disabled={isDisabled}
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
        </Tooltip>
      )}
    </SupportDialog>
  )
}

DonationButton.fragments = fragments

export default DonationButton

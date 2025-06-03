import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ERROR_CODES,
  ERROR_MESSAGES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  UNIVERSAL_AUTH_TRIGGER,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import { Media, toast, Translate, ViewerContext } from '~/components'
import DonationButton from '~/components/Buttons/DonationButton'
import {
  ArticleDetailPublicQuery,
  UserDonationRecipientFragment,
} from '~/gql/graphql'

import { SupportDialog } from '../../SupportDialog'

interface SupportButtonProps {
  recipient: UserDonationRecipientFragment
  article: NonNullable<ArticleDetailPublicQuery['article']>
  supported?: boolean
  toggleDonationDrawer: () => void
}

const SupportButton = ({
  recipient,
  article,
  supported = false,
  toggleDonationDrawer,
}: SupportButtonProps) => {
  const viewer = useContext(ViewerContext)

  const forbid = (isAuthor?: boolean) => {
    toast.error({
      message: isAuthor ? (
        <Translate zh_hant="去支持其他用戶吧" zh_hans="去支持其他用户吧" />
      ) : (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  const Content = ({ onClick }: { onClick: () => void }) => {
    return (
      <>
        <DonationButton
          supported={supported}
          onClick={() => {
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

            if (recipient.id === viewer.id) {
              forbid(true)
              return
            }

            onClick()
          }}
        />
      </>
    )
  }

  return (
    <>
      <Media at="sm">
        <SupportDialog article={article}>
          {({ openDialog }) => (
            <Content
              onClick={() => {
                analytics.trackEvent('click_button', {
                  type: 'support_open',
                  pageType: 'article_detail',
                  pageComponent: 'article_end',
                })
                openDialog()
              }}
            />
          )}
        </SupportDialog>
      </Media>
      <Media greaterThan="sm">
        <Content onClick={toggleDonationDrawer} />
      </Media>
    </>
  )
}

export default SupportButton

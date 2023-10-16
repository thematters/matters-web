import { useContext } from 'react'
import { FormattedMessage } from 'react-intl'

import {
  ERROR_CODES,
  OPEN_UNIVERSAL_AUTH_DIALOG,
  REFETCH_DONATORS,
  UNIVERSAL_AUTH_SOURCE,
} from '~/common/enums'
import { analytics } from '~/common/utils'
import {
  DonationDialog,
  ERROR_MESSAGES,
  toast,
  Translate,
  ViewerContext,
} from '~/components'
import DonationButton from '~/components/Buttons/DonationButton'
import {
  ArticleDetailPublicQuery,
  UserDonationRecipientFragment,
} from '~/gql/graphql'

interface SupportButtonProps {
  recipient: UserDonationRecipientFragment
  targetId: string
  article: NonNullable<ArticleDetailPublicQuery['article']>
  supported?: boolean
}

const SupportButton = ({
  recipient,
  targetId,
  article,
  supported = false,
}: SupportButtonProps) => {
  const viewer = useContext(ViewerContext)

  const completeCallback = () => {
    window.dispatchEvent(new CustomEvent(REFETCH_DONATORS, {}))
  }

  const forbid = (isAuthor?: boolean) => {
    toast.error({
      message: isAuthor ? (
        <Translate zh_hant="去支持其他用戶吧" zh_hans="去支持其他用户吧" />
      ) : (
        <FormattedMessage {...ERROR_MESSAGES[ERROR_CODES.FORBIDDEN_BY_STATE]} />
      ),
    })
  }

  return (
    <DonationDialog
      completeCallback={completeCallback}
      recipient={recipient}
      targetId={targetId}
      article={article}
    >
      {({ openDialog }) => (
        <>
          <DonationButton
            supported={supported}
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

              if (recipient.id === viewer.id) {
                forbid(true)
                return
              }

              openDialog()
            }}
          />
        </>
      )}
    </DonationDialog>
  )
}

export default SupportButton

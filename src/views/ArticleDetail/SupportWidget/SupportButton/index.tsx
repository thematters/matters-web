import { useContext } from 'react'

import {
  DonationDialog,
  LoginButton,
  Translate,
  ViewerContext,
} from '~/components'
import DonationButton from '~/components/Buttons/DonationButton'

import { ADD_TOAST, REFETCH_DONATORS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'
import { ArticleDetailPublic_article } from '../../__generated__/ArticleDetailPublic'

interface SupportButtonProps {
  recipient: UserDonationRecipient
  targetId: string
  article: ArticleDetailPublic_article
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
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'red',
          content: isAuthor ? (
            <Translate zh_hant="去支持其他用戶吧" zh_hans="去支持其他用户吧" />
          ) : (
            <Translate id="FORBIDDEN_BY_STATE" />
          ),
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
              en="Please log in to support author"
            />
          ),
          customButton: <LoginButton isPlain />,
          buttonPlacement: 'center',
        },
      })
    )
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
                showLoginToast()
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

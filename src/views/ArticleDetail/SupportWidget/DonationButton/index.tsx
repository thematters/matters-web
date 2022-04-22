import { useContext } from 'react'

import {
  Button,
  DonationDialog,
  IconDonate24,
  LoginButton,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST, REFETCH_DONATORS } from '~/common/enums'
import { analytics } from '~/common/utils'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'

interface DonationButtonProps {
  recipient: UserDonationRecipient
  targetId: string
}

const DonationButton = ({ recipient, targetId }: DonationButtonProps) => {
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
    >
      {({ openDialog }) => (
        <Button
          size={['10.5rem', '2.5rem']}
          bgColor="gold"
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
        >
          <TextIcon icon={<IconDonate24 />} weight="md" color="white">
            <Translate id="donation" />
          </TextIcon>
        </Button>
      )}
    </DonationDialog>
  )
}

export default DonationButton

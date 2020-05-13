import { useContext } from 'react'

import {
  Button,
  DonationDialog,
  Icon,
  LikeCoinDialog,
  LoginButton,
  TextIcon,
  Translate,
  ViewerContext,
} from '~/components'

import { ADD_TOAST } from '~/common/enums'

import styles from './styles.css'

import { UserDonationRecipient } from '~/components/Dialogs/DonationDialog/__generated__/UserDonationRecipient'

interface DonationButtonProps {
  recipient: UserDonationRecipient
  targetId: string
}

const DonationButton = ({
  recipient,
  targetId,
}: DonationButtonProps) => {
  const viewer = useContext(ViewerContext)

  const showLoginToast = () => {
    window.dispatchEvent(
      new CustomEvent(ADD_TOAST, {
        detail: {
          color: 'green',
          content: (
            <Translate
              zh_hant="請登入／註冊支持作者"
              zh_hans="请登入／注册支持作者"
            />
          ),
          customButton: <LoginButton isPlain />,
          buttonPlacement: 'center',
        },
      })
    )
  }

  return (
    <section className="container">
      <DonationDialog recipient={recipient} targetId={targetId}>
        {({ open }) => (
          <Button
            size={['10.5rem', '2.5rem']}
            bgColor="red"
            onClick={() => {
              if (!viewer.isAuthed) {
                showLoginToast()
                return
              }
              open()
            }}
          >
            <TextIcon icon={<Icon.Heart size="sm" />} weight="md" color="white">
              <Translate id="donation" />
            </TextIcon>
          </Button>
        )}
      </DonationDialog>

      <LikeCoinDialog allowEventTrigger />

      <style jsx>{styles}</style>
    </section>
  )
}

export default DonationButton

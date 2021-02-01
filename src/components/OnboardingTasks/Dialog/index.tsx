import { Dialog, Translate, useDialogSwitch } from '~/components'
import { useEventListener } from '~/components/Hook'

import { CLOSE_ONBOARDING_TASKS_DIALOG } from '~/common/enums'

import Tasks from '../Tasks'
import styles from './styles.css'

interface OnboardingTasksDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseOnboardingTasksDialog: React.FC<OnboardingTasksDialogProps> = ({
  children,
}) => {
  const { show, open, close } = useDialogSwitch(true)

  useEventListener(CLOSE_ONBOARDING_TASKS_DIALOG, close)

  return (
    <>
      {children({ open })}

      <Dialog size="sm" isOpen={show} onDismiss={close} fixedHeight>
        <Dialog.Header
          title={
            <Translate
              zh_hant="歡迎遨遊 Matters 星際網絡"
              zh_hans="欢迎遨游 Matters 星际网络"
            />
          }
          close={close}
          closeTextId="close"
        />
        <Dialog.Content hasGrow spacing={[0, 0]}>
          <p>
            <Translate
              zh_hant="導航帶你發現更多寶藏作者和優質作品。"
              zh_hans="导航带你发现更多宝藏作者和优质作品。"
            />
            <br />
            <Translate
              zh_hant="留下創作足跡，獲得更多支持！🙌"
              zh_hans="留下创作足迹，获得更多支持！🙌"
            />
          </p>

          <Tasks />
        </Dialog.Content>
      </Dialog>

      <style jsx>{styles}</style>
    </>
  )
}

const OnboardingTasksDialog = (props: OnboardingTasksDialogProps) => (
  <Dialog.Lazy mounted={<BaseOnboardingTasksDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

export default OnboardingTasksDialog

import { Dialog, Translate, useDialogSwitch } from '~/components'
import { useEventListener } from '~/components/Hook'

import { CLOSE_ONBOARDING_TASKS_DIALOG } from '~/common/enums'

import Tasks from '../Tasks'
import styles from './styles.css'

interface OnboardingTasksDialogProps {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const BaseOnboardingTasksDialog: React.FC<OnboardingTasksDialogProps> = ({
  children,
}) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  useEventListener(CLOSE_ONBOARDING_TASKS_DIALOG, closeDialog)

  return (
    <>
      {children({ openDialog })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog} fixedHeight>
        <Dialog.Header
          title={
            <Translate
              zh_hant="歡迎遨遊 Matters 星際網絡"
              zh_hans="欢迎遨游 Matters 星际网络"
              en="Welcome to the Matters galaxy"
            />
          }
          closeDialog={closeDialog}
          closeTextId="close"
        />
        <Dialog.Content hasGrow spacing={[0, 0]}>
          <p>
            <Translate
              zh_hant="導航帶你發現更多寶藏作者和優質作品。"
              zh_hans="导航带你发现更多宝藏作者和优质作品。"
              en="The guide will lead you to more precious creators and marvelous work."
            />
            <br />
            <Translate
              zh_hant="留下創作足跡，獲得更多支持！🙌"
              zh_hans="留下创作足迹，获得更多支持！🙌"
              en="Leave the footprint of your creation and receive more support! 🙌"
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
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

export default OnboardingTasksDialog

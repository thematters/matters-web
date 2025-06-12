import dynamic from 'next/dynamic'
import { useIntl } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { Dialog, Icon, SpinnerBlock, useDialogSwitch } from '~/components'

import styles from './styles.module.css'
interface ParticipantsDialogProps {
  totalParticipants: number
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
}

const DynamicContent = dynamic(() => import('./Content'), {
  loading: () => <SpinnerBlock />,
})

const BaseParticipantsDialog = ({
  totalParticipants,
  children,
}: ParticipantsDialogProps) => {
  const intl = useIntl()
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            <>
              {intl.formatMessage({
                defaultMessage: 'Writers',
                description:
                  'src/views/CampaignDetail/SideParticipants/index.tsx',
                id: 'xl95XN',
              })}{' '}
              {totalParticipants > 0 && (
                <span className={styles.count}>{totalParticipants}</span>
              )}
            </>
          }
          titleLeft
          rightBtn={
            <button
              onClick={() => {
                closeDialog()
              }}
            >
              <Icon icon={IconTimes} size={24} />
            </button>
          }
        />

        <DynamicContent type="dialog" />
      </Dialog>
    </>
  )
}

export const ParticipantsDialog = (props: ParticipantsDialogProps) => (
  <Dialog.Lazy mounted={<BaseParticipantsDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

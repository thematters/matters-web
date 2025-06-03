import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import IconTimes from '@/public/static/icons/24px/times.svg'
import { Dialog, Icon, SpinnerBlock, useDialogSwitch } from '~/components'
import { ArticleDetailPublicQuery } from '~/gql/graphql'

import { Step as SupportStep } from '../SupportAuthor/types'
import { fragments } from './gql'

type SupportDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
  article: NonNullable<ArticleDetailPublicQuery['article']>
}

const DynamicSupportAuthor = dynamic(() => import('../SupportAuthor'), {
  loading: () => <SpinnerBlock />,
})

const BaseDonationDialog = ({ children, article }: SupportDialogProps) => {
  const {
    show,
    openDialog: baseOpenDialog,
    closeDialog: baseCloseDialog,
  } = useDialogSwitch(true)

  const openDialog = () => {
    baseOpenDialog()
  }

  const closeDialog = () => {
    baseCloseDialog()
  }

  const intl = useIntl()

  const [supportStep, setSupportStep] = useState<SupportStep>('setAmount')

  const isTopup = supportStep === 'topup'

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <Dialog.Header
          title={
            isTopup
              ? intl.formatMessage({
                  defaultMessage: 'Top up',
                  id: 'Y47aYU',
                })
              : intl.formatMessage({
                  defaultMessage: 'Support Author',
                  id: 'ezYuE2',
                })
          }
          titleLeft
          rightBtn={
            <Dialog.TextButton
              onClick={closeDialog}
              aria-label={intl.formatMessage({
                defaultMessage: 'Close',
                id: 'rbrahO',
              })}
              text={<Icon icon={IconTimes} size={24} />}
              color="black"
            />
          }
        />
        <Dialog.Content fixedHeight noSpacingTop>
          <DynamicSupportAuthor
            recipient={article.author}
            targetId={article.id}
            article={article}
            updateSupportStep={setSupportStep}
            onClose={closeDialog}
          />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export const SupportDialog = (props: SupportDialogProps) => (
  <Dialog.Lazy mounted={<BaseDonationDialog {...props} />}>
    {({ openDialog }) => <>{props.children({ openDialog })}</>}
  </Dialog.Lazy>
)

SupportDialog.fragments = fragments

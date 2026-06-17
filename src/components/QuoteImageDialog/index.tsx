import dynamic from 'next/dynamic'

import { Dialog, SpinnerBlock, useDialogSwitch } from '~/components'

import { type QuoteImageDialogContentProps } from './Content'

export type QuoteImageDialogProps = {
  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & Omit<QuoteImageDialogContentProps, 'closeDialog'>

const DynamicContent = dynamic(() => import('./Content'), {
  ssr: false,
  loading: () => <SpinnerBlock />,
})

const BaseDialog = ({ children, ...props }: QuoteImageDialogProps) => {
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog })}

      <Dialog isOpen={show} onDismiss={closeDialog}>
        <DynamicContent {...props} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

export const QuoteImageDialog = (props: QuoteImageDialogProps) => {
  return (
    <Dialog.Lazy mounted={<BaseDialog {...props} />}>
      {({ openDialog }) => <>{props.children({ openDialog })}</>}
    </Dialog.Lazy>
  )
}

export { fragments, isSevenDayBookArticle } from './gql'

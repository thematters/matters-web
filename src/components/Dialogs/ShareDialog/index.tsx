import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { isMobile } from '~/common/utils'

import { ShareDialogContentProps } from './Content'

export type ShareDialogProps = {
  title?: string
  path?: string

  children: ({ open }: { open: () => void }) => React.ReactNode
} & Pick<
  ShareDialogContentProps,
  'description' | 'footerButtons' | 'headerTitle'
>

type BaseShareDialogProps = {
  onShare: (fallbackShare: () => void) => void
  shareTitle: string
  shareLink: string
} & Pick<
  ShareDialogProps,
  'children' | 'headerTitle' | 'description' | 'footerButtons'
>

const DynamicContent = dynamic(() => import('./Content'), {
  ssr: false,
  loading: Spinner,
})

const BaseShareDialog = ({
  onShare,

  children,

  ...props
}: BaseShareDialogProps) => {
  const { show, open, close } = useDialogSwitch(true)

  return (
    <>
      {children({ open: () => onShare(open) })}

      <Dialog size="sm" isOpen={show} onDismiss={close}>
        <DynamicContent {...props} />
      </Dialog>
    </>
  )
}

export const ShareDialog = (props: ShareDialogProps) => {
  const { title, path } = props
  const shareLink = process.browser
    ? path
      ? `${window.location.origin}${path}`
      : window.location.href
    : ''
  const shareTitle =
    title || (process.browser ? window.document.title || '' : '')

  const onShare = async (fallbackShare: () => void) => {
    const navigator = window.navigator as any

    if (navigator.share && isMobile()) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareLink,
        })
      } catch (e) {
        console.error(e)
      }
    } else {
      fallbackShare()
    }
  }

  return (
    <Dialog.Lazy
      mounted={
        <BaseShareDialog
          {...props}
          onShare={onShare}
          shareTitle={shareTitle}
          shareLink={shareLink}
        />
      }
    >
      {({ open }) => <>{props.children({ open: () => onShare(open) })}</>}
    </Dialog.Lazy>
  )
}

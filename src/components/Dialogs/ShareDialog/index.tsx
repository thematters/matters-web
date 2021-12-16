import dynamic from 'next/dynamic'

import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { isMobile } from '~/common/utils'

import { ShareDialogContentProps } from './Content'

export type ShareDialogProps = {
  title?: string
  path?: string

  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
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
  const { show, openDialog, closeDialog } = useDialogSwitch(true)

  return (
    <>
      {children({ openDialog: () => onShare(openDialog) })}

      <Dialog size="sm" isOpen={show} onDismiss={closeDialog}>
        <DynamicContent {...props} closeDialog={closeDialog} />
      </Dialog>
    </>
  )
}

function tryDecodeUrl(url: string) {
  try {
    return decodeURIComponent(url)
  } catch (err) {
    return url
  }
}

export const ShareDialog = (props: ShareDialogProps) => {
  const { title, path } = props
  const shareLink = tryDecodeUrl(
    process.browser
      ? path
        ? `${window.location.origin}${path}`
        : window.location.href
      : ''
  )
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
      {({ openDialog }) => (
        <>{props.children({ openDialog: () => onShare(openDialog) })}</>
      )}
    </Dialog.Lazy>
  )
}

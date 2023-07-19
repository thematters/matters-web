import dynamic from 'next/dynamic'

import { analytics, isMobile } from '~/common/utils'
import { Dialog, Spinner, useDialogSwitch } from '~/components'

import { ShareDialogContentProps } from './Content'

export type ShareDialogProps = {
  title?: string
  path?: string
  tags?: string[]

  disableNativeShare?: boolean

  children: ({ openDialog }: { openDialog: () => void }) => React.ReactNode
} & Pick<
  ShareDialogContentProps,
  'description' | 'btns' | 'smUpBtns' | 'headerTitle'
>

type BaseShareDialogProps = {
  onShare: (fallbackShare: () => void) => void
  shareTitle: string
  shareLink: string
  shareTags?: string[]
} & Pick<
  ShareDialogProps,
  'children' | 'headerTitle' | 'description' | 'btns' | 'smUpBtns'
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

      <Dialog isOpen={show} onDismiss={closeDialog}>
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
  const { title, path, tags } = props
  const shareLink = tryDecodeUrl(
    typeof window !== 'undefined'
      ? path
        ? `${window.location.origin}${path}`
        : window.location.href
      : ''
  )
  const shareTitle =
    title || (typeof window !== 'undefined' ? window.document.title || '' : '')

  const onShare = async (fallbackShare: () => void) => {
    const navigator = window.navigator as any

    analytics.trackEvent('share_dialog', { step: 'open_share' })

    if (navigator.share && isMobile() && !props.disableNativeShare) {
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
          shareTags={Array.from(new Set(tags)).filter(Boolean)}
        />
      }
    >
      {({ openDialog }) => (
        <>{props.children({ openDialog: () => onShare(openDialog) })}</>
      )}
    </Dialog.Lazy>
  )
}

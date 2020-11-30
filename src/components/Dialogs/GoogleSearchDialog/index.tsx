import { useEffect, useState } from 'react'

import { Dialog } from '~/components'

interface GoogleSearchDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const BaseGoogleSearchDialog = ({ children }: GoogleSearchDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => setShowDialog(true)
  const close = () => setShowDialog(false)

  useEffect(() => {
    const cx = process.env.NEXT_PUBLIC_PROGRAMMABLE_SEARCH_ENGINE_ID
    const gcse = document.createElement('script')
    gcse.type = 'text/javascript'
    gcse.async = true
    gcse.src =
      (document.location.protocol === 'https:' ? 'https:' : 'http:') +
      '//cse.google.com/cse.js?cx=' +
      cx
    const s = document.getElementsByTagName('script')[0]
    s?.parentNode?.insertBefore(gcse, s)
  }, [])

  return (
    <>
      {children({ open })}

      <Dialog isOpen={showDialog} onDismiss={close} fixedHeight>
        <Dialog.Content spacing={['base', 'base']}>
          <div
            dangerouslySetInnerHTML={{
              __html: '<div class="gcse-searchbox" />',
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: '<div class="gcse-searchresults" />',
            }}
          />
        </Dialog.Content>
      </Dialog>
    </>
  )
}

export const GoogleSearchDialog = (props: GoogleSearchDialogProps) => (
  <Dialog.Lazy mounted={<BaseGoogleSearchDialog {...props} />}>
    {({ open }) => <>{props.children({ open })}</>}
  </Dialog.Lazy>
)

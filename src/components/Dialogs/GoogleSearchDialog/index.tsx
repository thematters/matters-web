import _get from 'lodash/get'
import { useEffect, useState } from 'react'

import { Dialog } from '~/components'
import { Translate } from '~/components/Context'

import { captureClicks, dom } from '~/common/utils'

import globalStyles from './styles.global.css'

declare global {
  interface Window {
    google: any
    __gcse: any
  }
}

interface GoogleSearchDialogProps {
  children: ({ open }: { open: () => void }) => React.ReactNode
}

const GCSE_SCRIPT_ID = '__GCSE'

const renderCSE = (defer?: boolean) => {
  // Since <Dialog> uses useEffect to render dialog content,
  // we put renderCSE to next cycle.
  if (defer) {
    setTimeout(() => {
      renderCSE()
    })
  }

  const cse = _get(window, 'google.search.cse')

  if (!cse) {
    return
  }

  cse.element.render(
    {
      div: 'searchbox',
      tag: 'searchbox',
      attributes: {
        personalizedAds: false,
        mobileLayout: 'force',
      },
    },
    {
      div: 'searchresults',
      tag: 'searchresults',
      attributes: {
        enableImageSearch: false,
        enableOrderBy: false,
        linkTarget: '_self',
      },
    }
  )
}

const BaseGoogleSearchDialog = ({ children }: GoogleSearchDialogProps) => {
  const [showDialog, setShowDialog] = useState(true)
  const open = () => {
    setShowDialog(true)
    renderCSE(true)
  }
  const close = () => setShowDialog(false)

  useEffect(() => {
    if (dom.$(`#${GCSE_SCRIPT_ID}`)) {
      renderCSE(true)
      return
    }

    // init
    window.__gcse = {
      parsetags: 'explicit',
      initializationCallback: () => {
        if (document.readyState === 'complete') {
          renderCSE()
        } else {
          window.google.setOnLoadCallback(renderCSE)
        }
      },
    }

    // gcse script
    const cx = process.env.NEXT_PUBLIC_PROGRAMMABLE_SEARCH_ENGINE_ID
    const gcse = document.createElement('script')
    gcse.type = 'text/javascript'
    gcse.id = GCSE_SCRIPT_ID
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
        <Dialog.Header
          close={close}
          title={<Translate zh_hant="Google 搜尋" zh_hans="Google 搜索" />}
        />

        <Dialog.Content spacing={['base', 'base']}>
          <div id="searchbox" />
          <div id="searchresults" onClick={captureClicks} />

          <style jsx global>
            {globalStyles}
          </style>
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
